const knex = require("../db/connection");

function listTables() {
  return knex("tables").select("*").orderBy("table_name");
}

function createTable(newTable) {
  return knex("tables")
    .insert(newTable)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

async function unseatTable(tableId, reservationId) {
  try {
    const transaction = await knex.transaction();

    return knex("tables")
      .select("*")
      .where({ table_id: tableId })
      .update({ reservation_id: null })
      .then(function () {
        return transaction("reservations")
          .where({ reservation_id: reservationId })
          .update({ status: "finished" });
      })
      .then(transaction.commit)
      .catch(transaction.rollback);
  } catch (error) {
    return error;
  }
}

async function seatTable(tableId, reservationId) {
  try {
    const transaction = await knex.transaction();

    return transaction("tables")
      .where({ table_id: tableId })
      .update({ reservation_id: reservationId })
      .then(function () {
        return transaction("reservations")
          .where({ reservation_id: reservationId })
          .update({ status: "seated" });
      })
      .then(transaction.commit)
      .catch(transaction.rollback);
  } catch (error) {
    return error;
  }
}

function readTable(tableId) {
  return knex("tables").select("*").where({ table_id: tableId }).first();
}

// Exports //

module.exports = {
  listTables,
  createTable,
  unseatTable,
  readTable,
  seatTable,
};
