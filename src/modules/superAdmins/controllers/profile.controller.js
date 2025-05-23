const SuperAdmin = require("../../../models/SuperAdmin");
const { updateProfileValidation } = require("../validator");

exports.getSuperAdminProfile = async (req, res) => {
  try {
    let loggedInId = req.user.id;
    let superAdmin = await SuperAdmin.findByPk(loggedInId);
    if (!superAdmin) {
      return res
        .status(400)
        .json({ message: "Super Admin details not found!" });
    }
    return res.json({
      message: "Get Details",
      data: {
        id: superAdmin.id,
        name: superAdmin.name,
        email: superAdmin.email,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSuperAdminProfile = async (req, res) => {
  try {
    const { error } = updateProfileValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email } = req.body;

    let loggedInId = req.user.id;

    let superAdmin = await SuperAdmin.findByPk(loggedInId);

    if (!superAdmin) {
      return res
        .status(400)
        .json({ message: "Super Admin details not found!" });
    }

    superAdmin.name = name;
    superAdmin.email = email;
    superAdmin.save();

    return res.json({ message: "Details updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
