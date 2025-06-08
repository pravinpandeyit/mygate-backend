const SuperAdmin = require("../../models/SuperAdmin");
const Admin = require("../../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const ROLE_MODELS = {
  super_admin: SuperAdmin,
  admin: Admin,
};

async function login(email, password, role) {
  const Model = ROLE_MODELS[role];
  if (!Model) throw new Error("Invalid role");

  const user = await Model.findOne({ where: { email } });
  if (!user) throw new Error("User not found");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return {
    message: "Login successful",
    token,
    user: { id: user.id, name: user.name, email, role },
  };
}

module.exports = { login };
