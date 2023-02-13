const resService = require("../reservations/reservations.service");
const tablesService = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// Middleware

async function tableExists(req, res, next) {
  const tableId = req.params.table_id;
  const existingTable = await tablesService.readTable(tableId);
  if (existingTable) {
    res.locals.table = existingTable;
    return next();
  } else {
    return next({
      status: 404,
      message: `Table ${tableId} does not exist.`,
    });
  }
}

async function resExists(req, res, next) {
  const reservationId = req.body.data.reservation_id;
  const existingReservation = await resService.readRes(
    reservationId
  );
  if (existingReservation) {
    res.locals.reservation = existingReservation;
    return next();
  } else {
    return next({
      status: 404,
      message: `Reservation ${reservationId} does not exist.`,
    });
  }
}

function notSeated(req, res, next) {
  const status = res.locals.reservation.status;
  if (status !== "seated") {
    next();
  } else {
    next({
      status: 400,
      message: `This reservation is already seated.`,
    });
  }
}

function occupiedTable(req, res, next) {
  const tableIsSeated = res.locals.table.reservation_id;
  if (tableIsSeated) {
    return next();
  } else {
    return next({
      status: 400,
      message: `This table is not occupied.`,
    });
  }
}

function availableTable(req, res, next) {
  const tableIsSeated = res.locals.table.reservation_id;
  if (!tableIsSeated) {
    return next();
  } else {
    return next({
      status: 400,
      message: `This table is occupied.`,
    });
  }
}


function validCapacity(req, res, next) {
  const { capacity } = req.body.data;
  if (typeof capacity === "number" && capacity > 0) {
    return next();
  } else {
    return next({
      status: 400,
      message: `'capacity' is invalid. Capacity must be at least 1.`,
    });
  }
}


function validName(req, res, next) {
  const { table_name } = req.body.data;
  if (table_name.length > 1) {
    return next();
  } else {
    return next({
      status: 400,
      message: `'table_name' is invalid. Table Name must be at least two characters long.`,
    });
  }
}





function bodyHasData(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `Must include a ${propertyName}`,
    });
  };
}






function hasCapacity(req, res, next) {
  const table = res.locals.table;
  const reservation = res.locals.reservation;
  if (table.capacity >= reservation.people) {
    return next();
  } else {
    return next({
      status: 400,
      message: `This table does not have the capacity for this reservation.`,
    });
  }
}





// Request handlers


async function readTable(req, res) {
  const tableId = req.params.table_id;
  const responseData = await tablesService.readTable(tableId);
  res.status(200).json({ data: responseData });
}

async function listTables(req, res) {
  const responseData = await tablesService.listTables();
  res.status(200).json({ data: responseData });
}

async function seatTable(req, res) {
  const tableId = res.locals.table.table_id;
  const reservationId = res.locals.reservation.reservation_id;
  const responseData = await tablesService.seatTable(tableId, reservationId);
  res.status(200).json({ data: responseData });
}

async function unseatTable(req, res) {
  const tableId = req.params.table_id;
  const reservationId = res.locals.table.reservation_id;
  const responseData = await tablesService.unseatTable(tableId, reservationId);
  res.status(200).json({ data: responseData });
}
async function createTable(req, res) {
  const newTable = req.body.data;
  const responseData = await tablesService.createTable(newTable);
  res.status(201).json({ data: responseData });
}



// Exports //

module.exports = {
  listTables: [asyncErrorBoundary(listTables)],
  readTable: [asyncErrorBoundary(tableExists), asyncErrorBoundary(readTable)],
  unseatTable: [
    asyncErrorBoundary(tableExists),
    occupiedTable,
    asyncErrorBoundary(unseatTable),
  ],
  seatTable: [
    bodyHasData("reservation_id"),
    asyncErrorBoundary(tableExists),
    asyncErrorBoundary(resExists),
    notSeated,
    availableTable,
    hasCapacity,
    asyncErrorBoundary(seatTable),
  ],

  createTable: [
    bodyHasData("table_name"),
    bodyHasData("capacity"),
    validName,
    validCapacity,
    asyncErrorBoundary(createTable),
  ],


};
