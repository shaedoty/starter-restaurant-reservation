const router = require("express").Router();
const controller = require("./tables.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .post(controller.createTable)
  .get(controller.listTables)
  .all(methodNotAllowed);

router
  .route("/:table_id/seat")
  .delete(controller.unseatTable)
  .put(controller.seatTable)
  .all(methodNotAllowed);
  
router
.route("/:table_id")
.get(controller.readTable).all(methodNotAllowed);

module.exports = router;
