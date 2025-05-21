const express = require("express");
const authRoutes = require("../modules/auth/route");
const SuperAdminRoutes = require("../modules/superAdmins/route");
const SocietyRoutes = require("../modules/societies/route");
const BuildingRoutes = require("../modules/buildings/route");
const authenticateRole = require("../core/middlewares/auth.middleware");

const Router = express.Router();

//auth route
Router.use("/auth/", authRoutes);

//super admin routes
Router.use(
  "/super-admin/",
  authenticateRole(["super_admin"]),
  SuperAdminRoutes
);

//society route
Router.use("/society/", SocietyRoutes);

//building route
Router.use("/building/", BuildingRoutes);

module.exports = Router;
