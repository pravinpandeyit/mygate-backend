const Router = require("express").Router();
const { addNewUser, updateUser } = require("../users/controller");
const authenticateRole = require("../../core/middlewares/auth.middleware");

Router.post(
  "/add",
  authenticateRole(["super_admin", "admin", "user"]),
  addNewUser
);
Router.put(
  "/update",
  authenticateRole(["super_admin", "admin", "user"]),
  updateUser
);

module.exports = Router;
