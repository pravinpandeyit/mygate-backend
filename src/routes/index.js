const express = require("express");
const authRoutes = require("../modules/auth/route");
const SuperAdminRoutes = require("../modules/superAdmins/route");
const SocietyRoutes = require("../modules/societies/route");
const BuildingRoutes = require("../modules/buildings/route");
const FlatRoutes = require("../modules/flats/route");
const UserRoutes = require("../modules/users/route");
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

//society routes
Router.use("/society/", SocietyRoutes);

//building routes
Router.use("/building/", BuildingRoutes);

//flat routes
Router.use("/flat/", FlatRoutes);

//user routes
Router.use("/user/", UserRoutes);

module.exports = Router;
