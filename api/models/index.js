const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const db = {}

db.mongoose = mongoose

db.user = require('./Utilisateur')
db.role = require('./Role')
db.atelier = require('./Atelier')
db.document = require('./Document')
db.formation = require('./Formation')
db.produit = require('./Produit').ProductModel
db.catalogue = require('./Catalogue')
db.contact = require('./Contact')
db.cadeau = require('./Cadeau')
db.point = require('./Point')
db.panier = require('./Panier')
db.profilBeaute = require('./ProfilBeaute')
db.commande = require('./Commande')
db.notification = require('./Notifications')
db.plage = require('./Plages')
db.hotesse_commande = require('./HotesseCommande')
db.planning = require('./Planning')

db.ROLES = ['user', 'hotesse', 'conseillere', 'admin']

module.exports = db
