const Admin = require("../../../models/Admin");
const { adminValidation } = require("../validator");
const bcrypt = require("bcrypt");

exports.adminList = async (req, res) => {
  try {
    const { title, role } = req.query;

    const filterOptions = {
      attributes: [
        "id",
        "name",
        "email",
        "phone",
        "role",
        "society_id",
        "status",
      ],
      order: [["id", "DESC"]],
    };

    if (title) {
      filterOptions.where = { name: title };
    }

    if (role) {
      filterOptions.where = { role };
    }

    const admins = await Admin.findAll(filterOptions);
    return res.json({ message: "Admin List", data: admins });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addNewAdmin = async (req, res) => {
  try {
    const { error } = adminValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, phone, role } = req.body;
    let admin = await Admin.findOne({ where: { email } });
    if (admin) {
      return res
        .status(400)
        .json({ message: "Please enter the unique email address!" });
    }

    const salt = await bcrypt.genSalt(10);
    const password = "123456"; //assigning the password first time from backend
    const hashPassword = await bcrypt.hash(password, 10);

    admin = await Admin.create({
      name: name,
      email: email,
      password: hashPassword,
      phone: phone,
      role: role,
    });

    return res.json({ message: "Admin added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateAdmin = async (req, res) => {
  try {
    const { error } = adminValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    const { name, email, phone, role } = req.body;

    let admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found!" });
    }

    admin.name = name;
    admin.email = email;
    admin.phone = phone;
    admin.role = role;
    admin.save();

    return res.json({ message: "admin updated successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "ID is required!" });
    }

    const { status } = req.query;
    if (!status) {
      return res.status(400).json({ message: "Status is required!" });
    }

    let admin = await Admin.findByPk(id);
    if (!admin) {
      return res.status(400).json({ message: "Admin not found!" });
    }
    admin.status = status == "active" ? 1 : 0;
    admin.save();
    msg =
      status == "active"
        ? "Admin is activated successfully"
        : "Admin deactivated successfully";

    return res.json({ message: msg });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
