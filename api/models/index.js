const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./Utilisateur");
db.role = require("./Role");

db.ROLES = ["user", "hotesse", "conseillere", "admin"];

module.exports = db;