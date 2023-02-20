const resService = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


//Middleware

function validTime(req, res, next) {
  const { reservation_time } = req.body.data;
  const timeFormat = /\d\d:\d\d/;
  if (timeFormat.test(reservation_time)) {
    return next();
  } else {
    return next({
      status: 400,
      message: `Invalid field: 'reservation_time' must be a valid date.`,
    });
  }
}

function validPeople(req, res, next) {
  const { people } = req.body.data;
  if (typeof people === "number" && people > 0) {
    return next();
  } else {
    return next({
      status: 400,
      message: `Invalid field: 'people' must be at least 1.`,
    });
  }
}

function validDate(req, res, next) {
  const { reservation_date } = req.body.data;
  const dateFormat = /^\d{4}-\d{1,2}-\d{1,2}$/;
  if (dateFormat.test(reservation_date)) {
    return next();
  } else {
    return next({
      status: 400,
      message: `Invalid field: 'reservation_date' must be a valid date.`,
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

function notTuesdayRes(req, res, next) {
  const { reservation_date } = req.body.data;
  const date = new Date(reservation_date);
  if (date.getDay() !== 1) {
    return next();
  } else {
    return next({
      status: 400,
      message: `Sorry! We are closed on Tuesdays.`,
    });
  }
}





function futureRes(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const now = new Date();
  const reservation = new Date(`${reservation_date} ${reservation_time}`);
  if (reservation > now) {
    return next();
  } else {
    return next({
      status: 400,
      message: `Sorry! Reservations must be for a future time or date.`,
    });
  }
}

function OpenHours(req, res, next) {
  const { reservation_time } = req.body.data;
  if (reservation_time >= "10:30" && reservation_time <= "21:30") {
    return next();
  } else {
    return next({
      status: 400,
      message: `Sorry! Reservations are only available from 10:30am to 9:30pm.`,
    });
  }
}

async function resExists(req, res, next) {
  const reservationId = req.params.reservation_id;
  const existingReservation = await resService.readRes(reservationId);
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

function notFinished(req, res, next) {
  const status = res.locals.reservation.status;
  if (status !== "finished") {
    return next();
  } else {
    return next({
      status: 400,
      message: `'finished' is an invalid status. Finished reservations cannot be updated.`,
    });
  }
}

function statusPropertyIsValid(req, res, next) {
  const { status } = req.body.data;
  const validStatuses = ["booked", "seated", "finished", "cancelled"];
  if (validStatuses.includes(status)) {
    return next();
  } else {
    return next({
      status: 400,
      message: `Status unknown: Status must be booked, seated, or finished.`,
    });
  }
}

function booked(req, res, next) {
  const status = res.locals.reservation.status;
  if (status === "booked") {
    return next();
  } else {
    return next({
      status: 400,
      message: `${status} is an invalid status. Only 'booked' reservations can be updated.`,
    });
  }
}

function notFinishedOrSeated(req, res, next) {
  const status = req.body.data.status;
  if (status !== "seated" && status !== "finished") {
    return next();
  } else {
    return next({
      status: 400,
      message: `${status} is an invalid status for a new reservation.`,
    });
  }
}

// Request handlers

async function updateRes(req, res) {
  const reservationId = res.locals.reservation.reservation_id;
  const updatedReservation = req.body.data;
  const responseData = await resService.updateRes(
    reservationId,
    updatedReservation
  );
  res.status(200).json({ data: responseData });
}

async function updateResStatus(req, res) {
  const reservationId = req.params.reservation_id;
  const newStatus = req.body.data.status;
  responseData = await resService.updateResStatus(reservationId, newStatus);
  res.status(200).json({ data: responseData });
}

async function readRes(req, res) {
  const reservationId = req.params.reservation_id;
  const responseData = await resService.readRes(reservationId);
  res.status(200).json({ data: responseData });
}

async function listRes(req, res) {
  const { date, mobile_number } = req.query;
  if (date) {
    const responseData = await resService.listRes(date);
    res.status(200).json({ data: responseData });
  } else if (mobile_number) {
    const responseData = await resService.listRes(null, mobile_number);
    res.status(200).json({ data: responseData });
  } else {
    const responseData = await resService.listRes();
    res.status(200).json({ data: responseData });
  }
}

async function createRes(req, res) {
  const newReservation = req.body.data;
  const responseData = await resService.createRes(newReservation);
  res.status(201).json({ data: responseData });
}

// Exports //

module.exports = {
  updateResStatus: [
    asyncErrorBoundary(resExists),
    bodyHasData("status"),
    statusPropertyIsValid,
    notFinished,
    asyncErrorBoundary(updateResStatus),
  ],
 
  readRes: [asyncErrorBoundary(resExists), asyncErrorBoundary(readRes)],
  
  createRes: [
    bodyHasData("first_name"),
    bodyHasData("last_name"),
    bodyHasData("mobile_number"),
    bodyHasData("reservation_date"),
    bodyHasData("reservation_time"),
    bodyHasData("people"),
    validDate,
    validTime,
    validPeople,
    notTuesdayRes,
    futureRes,
    OpenHours,
    notFinishedOrSeated,
    asyncErrorBoundary(createRes),
  ],

  listRes: [asyncErrorBoundary(listRes)],
  updateRes: [
    asyncErrorBoundary(resExists),
    booked,
    bodyHasData("first_name"),
    bodyHasData("last_name"),
    bodyHasData("mobile_number"),
    bodyHasData("reservation_date"),
    bodyHasData("reservation_time"),
    bodyHasData("people"),
    validDate,
    validTime,
    validPeople,
    notTuesdayRes,
    futureRes,
    OpenHours,
    asyncErrorBoundary(updateRes),
  ],
};
