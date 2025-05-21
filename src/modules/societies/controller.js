const { Society } = require("../../models/index");
const SuperAdmin = require("../../models/SuperAdmin");
const { addSocietyValidation } = require("./validator");
const { Op } = require("sequelize");

exports.getAllSocieties = async (req, res) => {
  try {
    const { title } = req.query;

    const societies = await Society.findAll({
      attributes: ["id", "name", "address", "status", "created_by"],
      where: title
        ? {
            name: {
              [Op.like]: `%${title}%`,
            },
          }
        : undefined,
      include: [
        {
          model: SuperAdmin,
          as: "creator",
          attributes: ["id", "name", "email"],
        },
      ],
      order: [["id", "DESC"]],
    });
    return res.json({ message: "Society List", data: societies });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.addNewSociety = async (req, res) => {
  try {
    const { error } = addSocietyValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    let created_by = req.user.id;

    const { name, address } = req.body;

    const societyExists = await Society.findOne({ where: { name } });
    if (societyExists) {
      return res
        .status(400)
        .json({ message: "Society with this name already exists!" });
    }

    await Society.create({
      name,
      address,
      created_by,
    });

    return res.json({ message: "Society created successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.updateSociety = async (req, res) => {
  try {
    const societyId = req.params.id;
    const { name, address, status } = req.body;

    const society = await Society.findByPk(societyId);
    if (!society) {
      return res.status(404).json({ message: "Society not found!" });
    }

    if (name && name !== society.name) {
      const exists = await Society.findOne({
        where: { name, id: { [Op.ne]: societyId } },
      });
      if (exists) {
        return res
          .status(400)
          .json({ message: "Another society with this name already exists!" });
      }
    }

    society.name = name ?? society.name;
    society.address = address ?? society.address;
    society.status = status ?? society.status;

    await society.save();

    return res.json({ message: "Society updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

exports.deleteSociety = async (req, res) => {
  try {
    const societyId = req.params.id;

    const society = await Society.findByPk(societyId);
    if (!society) {
      return res.status(404).json({ message: "Society not found!" });
    }

    //delete all its building and flats
    // unassinged this society from the admin or manager account
    await society.destroy();

    return res.json({ message: "Society deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
