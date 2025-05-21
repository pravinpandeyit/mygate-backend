const Society = require("./Society");
const SuperAdmin = require("./SuperAdmin");

Society.belongsTo(SuperAdmin, {
  foreignKey: "created_by",
  as: "creator",
});

module.exports = { Society };