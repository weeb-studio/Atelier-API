const db = require('../models')
const Plage = db.plage

exports.getAll = async (req, res) => {
   try {
      const response = await Plage.find()
      res.json(response)
   } catch (e) {
      console.log(e)
      res.status(401).json({message: e.message})
   }
}

exports.create = async (req, res) => {
   try {
      const plage = new Plage(req.body)
      const response = await plage.save()
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
      const response = await Plage.findOneAndUpdate({ _id: req.params.id }, req.body)
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
      const response = await Plage.findOneAndDelete({ _id: req.params.id })
      res.json(response)
   } catch (e) {
      console.log(e)
      res.status(402).json({
         message: e.message,
      })
   }
}

const deletePlanning = async (item) => await Plage.findOneAndDelete({ _id: item })

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
