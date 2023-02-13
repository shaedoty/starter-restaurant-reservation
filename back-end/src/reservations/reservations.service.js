const knex = require("../db/connection");



function listRes(date, mobile_number) {
  if (date) {
    return knex("reservations")
      .select("*")
      .where({ reservation_date: date })
      .whereNot({ status: "finished" })
      .orderBy("reservation_time");
  } else if (mobile_number) {
    return knex("reservations")
      .whereRaw(
        "translate(mobile_number, '() -', '') like ?",
        `%${mobile_number.replace(/\D/g, "")}%`
      )
      .orderBy("reservation_date");
  } else {
    return knex("reservations").select("*").whereNot({ status: "finished" });
  }
}

function updateRes(reservationId, updatedReservation) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .update(updatedReservation, "*")
    .then((updatedRecord) => updatedRecord[0]);
}

function readRes(reservationId) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .first();
}

function updateResStatus(reservationId, newStatus) {
  return knex("reservations")
    .select("*")
    .where({ reservation_id: reservationId })
    .update({ status: newStatus })
    .returning("*")
    .then((updatedRecord) => updatedRecord[0]);
}

function createRes(newReservation) {
  return knex("reservations")
    .insert(newReservation)
    .returning("*")
    .then((createdRecord) => createdRecord[0]);
}

// Exports //

module.exports = {
  updateResStatus,
  updateRes,
  readRes,
  listRes,
  createRes,
};
