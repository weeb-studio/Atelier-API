const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')
const db = require('../models')
const User = db.user

verifyToken = (req, res, next) => {
   let token = req.headers['x-access-token']

   console.log('Token : ', token)

   if (!token) {
      return res.status(403).send({ message: 'Vous devez vous connecter' })
   }

   try {
      jwt.verify(token, config.secret, {}, (err, decoded) => {
         if (err) {
            return res.status(401).send({ message: 'Vous devez vous connecter!' })
         }
         req.userId = decoded.id
         req.role = decoded.role
         next()
      })
   } catch (error) {
      return res.status(500).json(error)
   }
}

isAdmin = (req, res, next) => {
   User.findById(req.userId)
      .populate('role')
      .exec((err, user) => {
         if (err) {
            res.status(500).send({ message: err })
            return
         }

         if (user === null || user === {}) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" })
         }

         if (user.role === 'admin') {
            next()
            return
         }

         res.status(403).send({ message: 'Require Admin Role!' })
      })
}

isHotesse = (req, res, next) => {
   User.findById(req.userId)
      .populate('role')
      .exec((err, user) => {
         if (err) {
            res.status(500).send({ message: err })
            return
         }

         if (user === null || user === {}) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" })
         }

         if (user.role === 'hotesse') {
            next()
            return
         }

         res.status(403).send({ message: 'Require Hôtesse Role!' })
      })
}

isConseillere = (req, res, next) => {
   User.findById(req.userId)
      .populate('role')
      .exec((err, user) => {
         if (err) {
            res.status(500).send({ message: err })
            return
         }

         if (user === null || user === {}) {
            return res.status(404).json({ message: "L'utilisateur n'existe pas" })
         }

         if (user.role === 'conseillere') {
            next()
            return
         }

         res.status(403).send({ message: 'Require Conseillère Role!' })
      })
}

const authJwt = {
   verifyToken,
   isAdmin,
   isHotesse,
   isConseillere,
}
module.exports = authJwt
