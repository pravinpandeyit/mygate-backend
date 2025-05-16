const express = require("express");
const { getSuperAdminProfile } = require("./controller");

const Router = express.Router();

Router.get("/get-profile", getSuperAdminProfile);

module.exports = Router;