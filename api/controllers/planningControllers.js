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
      const response = await Planning.find({user: req.params.user_id})
      res.json(response)
   } catch (e) {
      console.log(e)
      res.status(401).json({message: e.message})
   }
}

exports.create = async (req, res) => {
   try {
      const planning = new Planning(req.body)
      const response = await planning.save()
      res.json(response)
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
