const Router = require("express").Router();
const {
  getAllUsers,
  addNewUser,
  updateUser,
  getUserDetail,
  changeUserStatus,
  adminApproveUser,
} = require("../users/controller");
const authenticateRole = require("../../core/middlewares/auth.middleware");

Router.get(
  "/list",
  authenticateRole(["super_admin", "admin", "user"]),
  getAllUsers
);
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

Router.get(
  "/detail",
  authenticateRole(["super_admin", "admin", "user"]),
  getUserDetail
);

Router.patch(
  "/change-status/:userId",
  authenticateRole(["super_admin", "admin"]),
  changeUserStatus
);

Router.patch(
  "/approve/:userId",
  authenticateRole(["super_admin", "admin"]),
  adminApproveUser
);

module.exports = Router;
