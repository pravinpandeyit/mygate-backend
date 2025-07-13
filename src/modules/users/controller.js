const User = require("../../models/User");
const { userValidation, userUpdateValidation } = require("../users/validator");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

exports.getAllUsers = async (req, res) => {
  try {
    const { search } = req.query;
    let whereCondition = {};

    if (search) {
      whereCondition = {
        [Op.or]: [
          { name: { [Op.like]: `%${search}%` } },
          { email: { [Op.like]: `%${search}%` } },
          { phone: { [Op.like]: `${search}` } },
        ],
      };
    }

    const users = await User.findAll({
      attributes: {
        exclude: ["password", "status", "created_at", "updated_at"],
      },
      where: whereCondition,
    });
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found!" });
    }
    return res.status(200).json({ message: "Users List!", users });
  } catch (error) {
    return res.status(500).json({ message: "Error: ", error });
  }
};

exports.addNewUser = async (req, res) => {
  try {
    const { error } = userValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, password, phone } = req.body;
    let userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "Please enter unique email!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hasPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      name: name,
      email: email,
      password: hasPassword,
      phone: phone,
      status: 1,
    });
    return res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error: ", error });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { error } = userUpdateValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const loggedInUser = req.user.id;

    const { name, phone } = req.body;
    let user = await User.findByPk(loggedInUser);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.name = name;
    user.phone = phone;

    await user.save();
    return res.status(200).json({ message: "User updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error: ", error });
  }
};

exports.getUserDetail = async (req, res) => {
  try {
    const loggedInUser = req.user.id;
    let user = await User.findByPk(loggedInUser, {
      attributes: {
        exclude: ["password", "status", "created_at", "updated_at"],
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    return res
      .status(200)
      .json({ message: "User details fetched successfully!", user });
  } catch (error) {
    return res.status(500).json({ message: "Error: ", error });
  }
};

exports.changeUserStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (status !== 0 && status !== 1) {
      return res.status(400).json({ message: "Invalid status value!" });
    }

    let user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.status = status;
    await user.save();

    return res
      .status(200)
      .json({ message: "User status updated successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error: ", error });
  }
};

exports.adminApproveUser = async (req, res) => {
  try {
    const { userId } = req.params;

    let user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    user.is_approved = 1;
    await user.save();

    return res.status(200).json({ message: "User approved successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "Error: ", error });
  }
};
