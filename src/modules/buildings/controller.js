const Building = require("../../models/Building");
const Society = require("../../models/Society");
const { Op } = require("sequelize");
const { addBuildingValidation } = require("./validator");

exports.listBuildingsBySociety = async (req, res) => {
  try {
    const { societyId } = req.params;
    if (!societyId) {
      return res.status(400).json({ message: "Society ID is required!" });
    }

    const society = await Society.findByPk(societyId);
    if (!society) {
      return res.status(400).json({ message: "Society not found!" });
    }

    const { name, status } = req.query;

    const whereClause = {
      society_id: societyId,
      ...(name && {
        name: {
          [Op.like]: `%${name}%`,
        },
      }),
      ...(status && {
        status: Number(status),
      }),
    };

    const buildings = await Building.findAll({
      where: whereClause,
      attributes: ["id", "name"],
      order: [["id", "ASC"]],
    });

    return res.json({ message: "Buildings list", data: buildings });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.addBuilding = async (req, res) => {
  try {
    const { error } = addBuildingValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, society_id } = req.body;

    const existing = await Building.findOne({
      where: { name, society_id },
    });

    if (existing) {
      return res.status(400).json({
        message: "Building with this name already exists in the society!",
      });
    }

    await Building.create({
      name,
      society_id,
    });

    return res.json({ message: "Building added successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateBuilding = async (req, res) => {
  try {
    const buildingId = req.params.id;

    const { error } = addBuildingValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, society_id } = req.body;

    const building = await Building.findByPk(buildingId);
    if (!building) {
      return res.status(404).json({ message: "Building not found!" });
    }

    const duplicate = await Building.findOne({
      where: {
        name,
        society_id,
        id: { [Op.ne]: buildingId },
      },
    });

    if (duplicate) {
      return res.status(400).json({
        message: "Building with this name already exists in the society!",
      });
    }

    await building.update({ name, society_id });

    return res.json({ message: "Building updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteBuilding = async (req, res) => {
  try {
    const buildingId = req.params.id;

    const building = await Building.findByPk(buildingId);
    if (!building) {
      return res.status(404).json({ message: "Building not found!" });
    }

    //delete all its flats and assigned flats first
    await building.destroy();

    return res.json({ message: "Building deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
