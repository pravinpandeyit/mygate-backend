const Admin = require("../../models/SuperAdmin");


exports.getSuperAdminProfile = async(req, res) => {
    try {
        res.send("get super profile api...")
    } catch (error) {
         res.status(400).json({ error: error.message });
    }
}