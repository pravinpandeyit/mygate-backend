const jwt = require("jsonwebtoken");

const authenticateRole = (allowedRoles = []) => {
  return async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token required!" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied: insufficient permissions." });
      }

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
}
}

module.exports = authenticateRole;
