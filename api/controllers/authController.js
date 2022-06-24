const config = require('../config/auth.config')
const db = require('../models')
const User = db.user
const Role = db.role
const ROLES = db.ROLES

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const socket = require("../config/socket-client.config");

exports.signup = (req, res) => {
   const user = new User({
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      adresse: req.body.adresse,
      ville: req.body.ville,
      postal: req.body.postal,
      numero: req.body.numero,
      password: bcrypt.hashSync(req.body.password, 8),
   })

   user.save((err, user) => {
      if (err) {
         res.status(500).send({ message: err })
         return
      }

      if (req.body.status) {
         user.status = req.body.status
      }

      if (req.body.role) {
         if (ROLES.includes(req.body.role)) {
            Role.findOne({ nom: req.body.role }, (err, role) => {
               if (err) {
                  res.status(500).send({ message: err })
                  return
               }

               user.role = role._id
               user.save((err) => {
                  if (err) {
                     res.status(500).send({ message: err })
                     return
                  }

                  socket.emit('notify', {
                     title: 'Nouvelle demande de conseillère',
                     message: `Md. ${user.prenom} ${user.nom} viens de faire une demande pour devenir conseillère.`,
                     sender: user._id,
                     receiver: 'admin',
                     type: 'NC'
                  })

                  res.send({ user })
               })
            })
         } else {
            res.status(400).send({ message: 'Role non definie' })
         }
      } else {
         Role.findOne({ nom: 'user' }, (err, role) => {
            if (err) {
               res.status(500).send({ message: err })
               return
            }

            user.role = role._id
            user.save((err) => {
               if (err) {
                  res.status(500).send({ message: err })
                  return
               }

               res.send({ user })
            })
         })
      }
   })
}

exports.getCurrentUser = (req, res) => {
   User.findById(req.userId)
      .populate('role')
      .exec((err, user) => {
         if (err) {
            res.status(500).send({ message: err })
            return
         }

         if (!user) {
            return res.status(404).json({ message: "Pas d'utilisateur trouvé." })
         } else {
            res.status(200).json(user)
         }
      })
}

exports.getUserByEmail = (req, res) => {
   User.findOne({ email: req.params.email }, (error, response) => {
      if (error)
         return res.status(400).json({
            message: 'Erreur lors de la récupération des infos',
            error: error,
         })
      res.json(response)
   })
}

exports.updateUser = (req, res) => {
   let userData = {}

   if (req.body.nom) userData.nom = req.body.nom
   if (req.body.prenom) userData.prenom = req.body.prenom
   if (req.body.adresse) userData.adresse = req.body.adresse
   if (req.body.telephone) userData.numero = req.body.telephone
   if (req.body.postal) userData.postal = req.body.postal
   if (req.body.ville) userData.ville = req.body.ville

   User.updateOne({ _id: req.userId }, { $set: userData })
      .exec()
      .then((resultat) => {
         if (!resultat)
            return res.status(404).json({
               message: "Oups!! aucune information pour l'identifiant fourni",
            })
         res.status(200).json({
            message: 'Mise à jour reussie',
            doc: resultat,
         })
      })
      .catch((err) => {
         console.log(err)
         res.status(500).json({
            message: 'Oups!! une erreur est survenue',
            error: err,
         })
      })
}

exports.updateUserImage = (req, res) => {
   let userData = {}

   userData.imageURL = req.file.path

   User.update({ _id: req.userId }, { $set: userData })
      .exec()
      .then((resultat) => {
         if (!resultat)
            return res.status(404).json({
               message: "Oups!! aucune information pour l'identifiant fourni",
            })
         res.status(200).json({
            message: 'Mise à jour reussie',
            doc: resultat,
         })
      })
      .catch((err) => {
         console.log(err)
         res.status(500).json({
            message: 'Oups!! une erreur est survenue sur le serveur',
            error: err,
         })
      })
}

exports.signin = async (req, res) => {
   try {
      const response = await User.findOne({ email: req.body.email }).populate('role').exec()

      if (!response)
         return res.status(400).send({
            message: "Nom d'utilisateur ou mot de passe incorrect.",
            response: response,
         })

      const passwordIsValid = bcrypt.compareSync(req.body.password, response.password)

      if (!passwordIsValid) {
         return res.status(400).send({
            message: "Nom d'utilisateur ou mot de passe incorrect.",
            passwordIsValid,
         })
      }

      jwt.sign({ id: response._id, role: response.role.nom }, config.secret, {}, (err, token) => {
         if (err) {
            console.log('Error : ', err)
            return res.status(404).json({ message: 'Oup!, Une erreur est survenue.', error: err })
         }
         res.status(200).send({
            id: response._id,
            nom: response.nom,
            prenom: response.prenom,
            email: response.email,
            role: response.role,
            imageURL: response.imageURL,
            status: response.status,
            accessToken: token,
         })
      })
   } catch (e) {
      console.log(e)
      return res.status(400).json({
         message: 'Oups! Une erreur est survenue.',
         error: e,
      })
   }
}
