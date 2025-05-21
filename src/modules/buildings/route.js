const express = require("express");
const {
  listBuildingsBySociety,
  addBuilding,
  updateBuilding,
  deleteBuilding,
} = require("../buildings/controller");
const authenticateRole = require("../../core/middlewares/auth.middleware");

const Router = express.Router();

Router.get(
  "/list/:societyId",
  authenticateRole(["super_admin", "admin", "user"]),
  listBuildingsBySociety
);
Router.post("/add", authenticateRole(["super_admin", "admin"]), addBuilding);
Router.put(
  "/update/:id",
  authenticateRole(["super_admin", "admin"]),
  updateBuilding
);
Router.delete(
  "/delete/:id",
  authenticateRole(["super_admin", "admin"]),
  deleteBuilding
);

module.exports = Router;
