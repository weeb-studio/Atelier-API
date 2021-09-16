const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./Utilisateur");
db.role = require("./Role");
db.atelier = require("./Atelier");
db.document = require("./Document");
db.formation = require("./Formation");
db.produit = require("./Produit");

db.ROLES = ["user", "hotesse", "conseillere", "admin"];

module.exports = db;