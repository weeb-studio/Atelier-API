const db = require('../models')
const Produit = db.produit

exports.createProduct = async (req, res) => {
   try {
      let data = req.body
      if (req.file) data = { ...data, product_img: req.file.path }
      const product = new Produit(data)
      const response = await product.save()
      res.json(response)
   } catch (e) {
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: e.message,
      })
   }
}

exports.updateProduct = async (req, res) => {
   try {
      let data = req.body
      if (req.file) data = { ...data, product_img: req.file.path }
      const response = await Produit.findOneAndUpdate({ _id: req.params.id }, data)
      res.json(response)
   } catch (e) {
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: e.message,
      })
   }
}

exports.deleteProduct = async (req, res) => {
   try {
      const response = await Produit.findOneAndDelete({ _id: req.params.id })
      res.json(response)
   } catch (e) {
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: e.message,
      })
   }
}

exports.getAllProduct = async (req, res) => {
   try {
      const response = await Produit.find()
      res.json(response)
   } catch (e) {
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: e.message,
      })
   }
}

exports.getAllSoinsProduct = async (req, res) => {
   try {
      const response = await Produit.find({ type: 'soins' })
      res.json(response)
   } catch (e) {
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: e.message,
      })
   }
}

exports.getAllCoiffureProduct = async (req, res) => {
   try {
      const response = await Produit.find({ type: 'coiffure' })
      res.json(response)
   } catch (e) {
      res.status(400).json({
         message: 'Une erreur est survenue !',
         error: e.message,
      })
   }
}
