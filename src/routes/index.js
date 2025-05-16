const express = require("express");
const authRoutes = require("../modules/auth/route");
const SuperAdminRoutes = require("../modules/superAdmins/route");
const authenticateUser = require("../core/middlewares/auth.middleware");

const Router = express.Router();

Router.use("/auth/", authRoutes);
Router.use("/super-admin/", authenticateUser, SuperAdminRoutes);

module.exports = Router;
