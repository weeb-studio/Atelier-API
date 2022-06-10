const jwt = require('jsonwebtoken')
const config = require('../config/auth.config.js')

verifyToken = (req, res, next) => {
   let token = req.headers['x-access-token']
   if (!token) {
      return res.status(403).send({ message: 'Vous devez vous connecter' })
   }
   try {
      jwt.verify(token, config.secret, {}, (err, decoded) => {
         if (err) {
            return res.status(401).send({ message: 'Vous devez vous connecter!', error: err })
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
   if (req.role === 'admin') next()
   else res.status(403).send({ message: 'Require Admin Role!' })
}

isHotesse = (req, res, next) => {
   if (req.role === 'hotesse') next()
   else res.status(403).send({ message: 'Require Hotesse Role!' })
}

isConseillere = (req, res, next) => {
   if (req.role === 'conseillere') next()
   else res.status(403).send({ message: 'Require Conseillere Role!' })
}

const authJwt = {
   verifyToken,
   isAdmin,
   isHotesse,
   isConseillere,
}

module.exports = authJwt
