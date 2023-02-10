const mongoose = require("mongoose")

//schema for admin
const adminschema = new mongoose.Schema({
    name: String,
    password: String
});

const Admin = mongoose.model("Admin",adminschema)

module.exports = Admin