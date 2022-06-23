const db = require('../models')
const User = db.user

exports.allAccess = async (req, res) => {
   res.status(200).send(await User.find())
}

exports.getConseillers = async (req, res) => {
   try {
      const response = await User.find().populate('role').exec()
      const result = response.filter((item) => item.role && item.role.nom === 'conseillere' && item.status)
      res.json(result)
   } catch (e) {
      console.log(e)
      res.status(401).json({
         message: 'Erreur lors de la récupération des conseillères',
         error: e.message,
      })
   }
}

exports.getAttemptAccounts = async (req, res) => {
   try {
      const response = await User.find().populate('role').exec()
      const result = response.filter((item) => item.role && item.role.nom === 'conseillere' && !item.status)
      res.json(result)
   } catch (e) {
      console.log(e)
      res.status(401).json({
         message: 'Erreur lors de la récupération des conseillères',
         error: e.message,
      })
   }
}

exports.getHotesses = async (req, res) => {
   try {
      const response = await User.find().populate('role').exec()
      const result = response.filter((item) => item.role && item.role.nom === 'hotesse')
      res.json(result)
   } catch (e) {
      console.log(e)
      res.status(401).json({
         message: 'Erreur lors de la récupération des conseillères',
         error: e.message,
      })
   }
}

exports.getClientes = async (req, res) => {
   try {
      const response = await User.find().populate('role').exec()
      const result = response.filter((item) => item.role && item.role.nom === 'user')
      res.json(result)
   } catch (e) {
      console.log(e)
      res.status(401).json({
         message: 'Erreur lors de la récupération des conseillères',
         error: e.message,
      })
   }
}

exports.userBoard = (req, res) => {
   res.status(200).send('User Content.')
}

exports.adminBoard = (req, res) => {
   res.status(200).send(`${req.role} Content.`)
}

exports.moderatorBoard = (req, res) => {
   res.status(200).send('Moderator Content.')
}

exports.changeStatus = async (req, res) => {
   try {
      const id = req.body.id
      const status = req.body.status
      if (!id)
         return res.status(402).json({
            message: "Veuillez indiquer l'identifiant du compte.",
            error: {},
         })
      if (!status)
         return res.status(402).json({
            message: 'Veuillez indiquer le nouveau status du compte.',
            error: {},
         })
      const response = await User.findOneAndUpdate({ _id: id }, { status })
      res.json(response)
   } catch (e) {
      console.log(e)
      res.status(402).json({
         message: 'Une erreur est survenue !',
         error: e.message,
      })
   }
}

exports.updateUser = async (req, res) => {
   try {
      const id = req.body.id
      if (!id)
         return res.status(402).json({
            message: "Veuillez indiquer l'identifiant du compte.",
            error: {},
         })
      const response = await User.findOneAndUpdate({ _id: id }, req.body)
      res.json(response)
   } catch (e) {
      console.log(e)
      res.status(402).json({
         message: 'Une erreur est survenue !',
         error: e.message,
      })
   }
}

exports.unvalidateConseiller = (req, res) => {
   User.find({
      $and: [{ status: false }],
   })
      .select('_id nom prenom email imageURL adresse ville postal status numero role createdAt updatedAt')
      .populate('role', '-__v')
      .exec((err, user) => {
         if (err) {
            res.status(500).send({ message: err })
            return
         }

         if (!user) {
            return res.status(404).send({ message: 'User Not found.' })
         } else {
            res.status(200).send(user)
         }
      })
}

exports.getTypeOfUsers = (req, res) => {
   const type = req.params.type
   User.find({ status: true })
      .populate('role', '-__v')
      .select('_id nom prenom email imageURL adresse ville postal status numero role createdAt updatedAt')

      .exec((err, user) => {
         if (err) {
            res.status(500).send({ message: err })
            return
         }

         if (user.length === 0) {
            return res.status(404).send({ message: 'User Not found.' })
         } else {
            let result = []

            user.forEach((element) => {
               if (element.role.nom === type) {
                  result.push(element)
               }
            })
            res.status(200).send(result)
         }
      })
}

exports.getUserById = (req, res) => {
   const uid = req.params.uid
   User.findById(uid)
      .populate('role', '-__v')
      .select('_id nom prenom email imageURL adresse ville postal status numero role createdAt updatedAt')
      .exec((err, user) => {
         if (err) {
            res.status(500).send({ message: err })
            return
         }

         if (!user) {
            return res.status(404).send({ message: 'User Not found.' })
         } else {
            res.status(200).send(user)
         }
      })
}
