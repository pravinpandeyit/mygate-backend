const express = require("express");
const {
  getSuperAdminProfile,
  updateSuperAdminProfile,
} = require("../superAdmins/controllers/profile.controller");

const { addNewAdmin } = require("../superAdmins/controllers/admin.controller");

const Router = express.Router();


//profile routes
Router.get("/get-profile", getSuperAdminProfile);
Router.post("/update-profile", updateSuperAdminProfile);

//manage admin routes
Router.post("/add-admin", addNewAdmin);

module.exports = Router;
