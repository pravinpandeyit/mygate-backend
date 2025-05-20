const express = require("express");
const {
  getSuperAdminProfile,
  updateSuperAdminProfile,
} = require("../superAdmins/controllers/profile.controller");

const {
  adminList,
  addNewAdmin,
  updateAdmin,
  changeStatus,
} = require("../superAdmins/controllers/admin.controller");

const Router = express.Router();

//profile routes
Router.get("/get-profile", getSuperAdminProfile);
Router.post("/update-profile", updateSuperAdminProfile);

//manage admin routes
Router.get("/admin-list", adminList);
Router.post("/add-admin", addNewAdmin);
Router.put("/update-admin/:id", updateAdmin);
Router.patch("/admin-status-change/:id", changeStatus);

module.exports = Router;
