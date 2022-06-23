const db = require('../models')
const Planning = db.planning

exports.getAll = async (req, res) => {
   try {
      const response = await Planning.find()
      res.json(response)
   } catch (e) {
      console.log(e)
      res.status(401).json({message: e.message})
   }
}

exports.getAllOfUser = async (req, res) => {
   try {
      const response = await Planning.find({user: req.params.user_id, date: req.query.date})
      res.json(response)
   } catch (e) {
      console.log(e)
      res.status(401).json({message: e.message})
   }
}

const createPlanning = async (item) => await item.save()

exports.create = async (req, res) => {
   try {
      const plages = req.body.plages.map(item => new Planning(item))
      plages.map(createPlanning)
      res.json({status: 'OK'})
   } catch (e) {
      console.log(e)
      res.status(402).json({
         message: e.message,
      })
   }
}

exports.update = async (req, res) => {
   try {
      const response = await Planning.findOneAndUpdate({ _id: req.params.id }, req.body)
      res.json(response)
   } catch (e) {
      console.log(e)
      res.status(402).json({
         message: e.message,
      })
   }
}

exports.delete = async (req, res) => {
   try {
      const response = await Planning.findOneAndDelete({ _id: req.params.id })
      res.json(response)
   } catch (e) {
      console.log(e)
      res.status(402).json({
         message: e.message,
      })
   }
}

const deletePlanning = async (item) => await Planning.findOneAndDelete({ _id: item })

exports.deleteMany = async (req, res) => {
   try {
      req.body.planning.forEach(deletePlanning)
      res.json({status: 'OK'})
   } catch (e) {
      console.log(e)
      res.status(402).json({
         message: e.message,
      })
   }
}
