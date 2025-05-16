const { loginValidation } = require("./validator");
const AuthService = require("./service");

exports.login = async (req, res) => {
  try {
    const { error } = loginValidation.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password, role } = req.body;

    const data = await AuthService.login(email, password, role);

    res.json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
