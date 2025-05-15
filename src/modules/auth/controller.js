const { loginValidation } = require("./validator");
const SuperAdmin = require("../../models/SuperAdmin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, role } = req.body;

    const ROLE_MODELS = {
      super_admin: SuperAdmin,
    };

    const Model = ROLE_MODELS[role];
    if (!Model) throw new Error("Invalid role");

    const user = await Model.findOne({ where: { email } });
    if (!user) throw new Error("User not found");
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user.id, role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      message: "Login successful",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
