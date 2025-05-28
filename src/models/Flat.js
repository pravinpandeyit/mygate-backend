const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Flat = sequelize.define(
  "Flat",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    building_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "buildings",
        key: "id",
      },
    },
    flat_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "flats",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = Flat;
