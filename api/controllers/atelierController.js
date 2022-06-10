const db = require('../models')
const atelierModel = require('../models/Atelier')
const Atelier = db.atelier

exports.createAtelier = async (req, res) => {
   try {
      const data = {
         ...req.body,
         conseillere: req.userId,
      }
      const response = await new Atelier(data).save()
      res.json(response)
   } catch (error) {
      console.log(error)
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: error.message,
      })
   }
}

exports.updateAtelier = async (req, res) => {
   try {
      const response = await Atelier.findOneAndUpdate({ _id: req.params.id }, req.body)
      res.json(response)
   } catch (error) {
      console.log(error)
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: error.message,
      })
   }
}

exports.addNewSubscription = async (req, res) => {
   try {
      const newSubscription = new atelierModel.subscriberModel(req.body)
      const atelier = await Atelier.findOne({ _id: req.params.id })
      const subscriptions = [...atelier.subscriptions, newSubscription]
      const response = await atelier.update({ subscriptions })
      res.json(response)
   } catch (error) {
      console.log(error)
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: error.message,
      })
   }
}

exports.deleteAtelier = async (req, res) => {
   try {
      const response = await Atelier.findOneAndDelete({ _id: req.params.id })
      res.json(response)
   } catch (error) {
      console.log(error)
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: error.message,
      })
   }
}

exports.getAllAtelier = async (req, res) => {
   try {
      const response = await Atelier.find()
      res.json(response)
   } catch (error) {
      console.log(error)
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: error.message,
      })
   }
}

exports.getAteliersByStatus = async (req, res) => {
   try {
      const response = await Atelier.find({ status: req.params.status })
      res.json(response)
   } catch (error) {
      console.log(error)
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: error.message,
      })
   }
}

exports.getAllCityAteliers = async (req, res) => {
   try {
      const response = await Atelier.find({ city: req.params.city })
      res.json(response)
   } catch (error) {
      console.log(error)
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: error.message,
      })
   }
}

exports.getHotesseAteliers = async (req, res) => {
   try {
      const response = await Atelier.find({ hotesse: req.params.id })
      res.json(response)
   } catch (error) {
      console.log(error)
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: error.message,
      })
   }
}

exports.getConseillerAteliers = async (req, res) => {
   try {
      const response = await Atelier.find({ conseillere: req.params.id })
      res.json(response)
   } catch (error) {
      console.log(error)
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: error.message,
      })
   }
}
