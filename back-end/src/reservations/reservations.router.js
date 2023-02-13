/**
 * Defines the router for reservation resources.
 *
 * @type {Router}
 */

const controller = require("./reservations.controller");
const router = require("express").Router();
const { route } = require("../tables/tables.router");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .post(controller.createRes)
  .get(controller.listRes)
  .all(methodNotAllowed);

  router
  .route("/:reservation_id/status")
  .put(controller.updateResStatus)
  .all(methodNotAllowed);

router
  .route("/:reservation_id")
  .put(controller.updateRes)
  .get(controller.readRes)
  .all(methodNotAllowed);



module.exports = router;



