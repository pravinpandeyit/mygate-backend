const Router = require("express").Router();
const {
  listFlats,
  addNewFlat,
  updateFlat,
  deleteFlat,
  assignFlatToUser,
} = require("./controller");
const authenticateRole = require("../../core/middlewares/auth.middleware");

Router.get(
  "/list/:buildingId",
  authenticateRole(["super_admin", "admin", "user"]),
  listFlats
);
Router.post("/add", authenticateRole(["super_admin", "admin"]), addNewFlat);
Router.put(
  "/update/:id",
  authenticateRole(["super_admin", "admin"]),
  updateFlat
);
Router.delete(
  "/delete/:id",
  authenticateRole(["super_admin", "admin"]),
  deleteFlat
);

Router.post(
  "/assign-flat-to-user",
  authenticateRole(["super_admin", "admin", "user"]),
  assignFlatToUser
);

module.exports = Router;
