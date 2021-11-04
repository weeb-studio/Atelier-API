const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./Utilisateur");
db.role = require("./Role");
db.atelier = require("./Atelier");
db.document = require("./Document");
db.formation = require("./Formation");
db.produit = require("./Produit");
db.catalogue = require("./Catalogue");
db.contact = require("./Contact");
db.cadeau = require("./Cadeau");
db.point = require("./Point");
db.panier = require("./Panier");

db.ROLES = ["user", "hotesse", "conseillere", "admin"];

module.exports = db;
