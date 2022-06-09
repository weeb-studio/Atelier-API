const mongoose = require('mongoose')

const produitSchema = new mongoose.Schema(
   {
      product_img: {
         type: String,
         required: false,
      },
      product_name: {
         type: String,
         required: true,
      },
      product_ref: {
         type: String,
         required: true,
      },
      product_mark: {
         type: String,
         required: true,
      },
      product_price: {
         type: Number,
         required: true,
      },
      product_qte: {
         type: Number,
         required: true,
      },
      product_content: {
         type: String,
         required: true,
      },
      product_category: {
         type: String,
         required: true,
      },
      product_description: {
         type: String,
         required: true,
      },
      product_type: {
         type: String,
         enum: ['soins', 'coiffure'],
         required: true,
      },
   },
   { timestamps: true }
)

module.exports = mongoose.model('produit', produitSchema)
