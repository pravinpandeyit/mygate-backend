const User = require("../../models/User");
const { userValidation, userUpdateValidation } = require("../users/validator");
const bcrypt = require("bcrypt");

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
    const hasPassword = await bcrypt.hash(password, salt);

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
