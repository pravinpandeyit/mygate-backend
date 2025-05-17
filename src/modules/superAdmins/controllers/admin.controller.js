const Admin = require("../../../models//Admin");


exports.addNewAdmin = async(req, res) => {
    try {
        res.send("add new admin api..");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};