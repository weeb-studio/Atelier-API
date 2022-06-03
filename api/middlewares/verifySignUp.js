const db = require('../models')
const ROLES = db.ROLES
const User = db.user

checkDuplicateUsernameOrEmail = (req, res, next) => {
   // Numero de telephone
   User.findOne({
      numero: req.body.numero,
   }).exec((err, user) => {
      if (err) {
         res.status(500).send({ message: err })
         return
      }

      if (user) {
         res.status(400).send({ message: 'Votre numéro de téléphone est déjà utilisé !' })
         return
      }

      // Email
      User.findOne({
         email: req.body.email,
      }).exec((err, user) => {
         if (err) {
            res.status(500).send({ message: err })
            return
         }

         if (user) {
            res.status(400).send({ message: 'Votre adresse e-mail est déjà utilisé !' })
            return
         }

         next()
      })
   })
}

checkRolesExisted = (req, res, next) => {
   if (req.body.role) {
      if (!ROLES.includes(req.body.role)) {
         res.status(400).send({
            message: `Erreur ! Le rôle ${req.body.role} n'existe pas !`,
         })
         return
      }
   }

   next()
}

const verifySignUp = {
   checkDuplicateUsernameOrEmail,
   checkRolesExisted,
}

module.exports = verifySignUp
