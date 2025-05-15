const express = require("express");
const { login } = require("../auth/controller");

const Router = express.Router();

Router.post("/login", login);

module.exports = Router;
