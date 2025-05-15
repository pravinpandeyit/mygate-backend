const express = require("express");
const authRoutes = require("../modules/auth/route");

const Router = express.Router();

Router.use("/auth/", authRoutes);

module.exports = Router;
