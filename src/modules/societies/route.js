const express = require("express");
const {
  getAllSocieties,
  addNewSociety,
  updateSociety,
  deleteSociety,
} = require("../societies/controller");
const authenticateRole = require("../../core/middlewares/auth.middleware");

const Router = express.Router();

Router.get(
  "/list",
  authenticateRole(["super_admin", "admin", "user"]),
  getAllSocieties
);
Router.post("/add", authenticateRole(["super_admin"]), addNewSociety);
Router.put("/update/:id", authenticateRole(["super_admin"]), updateSociety);
Router.delete("/delete/:id", authenticateRole(["super_admin"]), deleteSociety);

module.exports = Router;
