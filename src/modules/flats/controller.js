const Flat = require("../../models/Flat");
const Building = require("../../models/Building");
const { flatValidation } = require("./validator");
const { Op } = require("sequelize");

exports.listFlats = async (req, res) => {
  try {
    const { buildingId } = req.params;

    const { flat_number } = req.query;
    
    const whereClause = {
      building_id: buildingId,
      ...(flat_number && {
        flat_number: {
          [Op.like]: `%${flat_number}%`,
        },
      }),
    };
    const flats = await Flat.findAll({
      where: whereClause,
      attributes: ["id", "flat_number"],
      order: [["flat_number", "ASC"]],
    });

    return res.json({
      message: "Flats fetched successfully",
      data: flats,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.addNewFlat = async (req, res) => {
  try {
    const { error } = flatValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { building_id, flat_number } = req.body;

    const building = await Building.findByPk(building_id);
    if (!building) {
      return res.status(400).json({ message: "Building not found" });
    }

    let existingFlat = await Flat.findOne({
      where: { flat_number, building_id },
    });
    if (existingFlat) {
      return res.status(400).json({
        message: `Please enter unique flat number for building: ${building.name}`,
      });
    }

    await Flat.create({
      building_id,
      flat_number,
    });

    return res.json({
      message: "Flat added successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateFlat = async (req, res) => {
  try {
    const { error } = flatValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Flat ID is required!" });
    }

    const { building_id, flat_number } = req.body;

    const flat = await Flat.findByPk(id);
    if (!flat) {
      return res.status(400).json({ message: "Flat not found!" });
    }

    const building = await Building.findByPk(building_id);
    if (!building) {
      return res.status(400).json({ message: "Building not found!" });
    }

    const existingFlat = await Flat.findOne({
      where: {
        flat_number,
        building_id,
        id: { [Op.ne]: id },
      },
    });

    if (existingFlat) {
      return res.status(400).json({
        message: `Flat number already exists for building: ${building.name}`,
      });
    }

    await flat.update({
      building_id,
      flat_number,
    });

    return res.json({
      message: "Flat updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deleteFlat = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Flat ID is required!" });
    }

    const flat = await Flat.findByPk(id);
    if (!flat) {
      return res.status(404).json({ message: "Flat not found!" });
    }

    await flat.destroy();

    return res.json({ message: "Flat deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
