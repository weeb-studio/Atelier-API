const mongoose = require('mongoose')
const productModel = require('../models/Produit')

const commandSchema = new mongoose.Schema({
    hotesse: {
        type: mongoose.Types.ObjectId,
        ref: 'utilisateur',
        required: true
    },
    shipping_date: {
        type: String,
        required: false
    },
    product_list: [productModel.ProductSchema],
    status: {
        type: String,
        enum: ['PENDING', 'CANCEL', 'SHIPPING'],
        required: true,
        default: 'PENDING'
    }
}, {timestamps: true})

module.exports = mongoose.model('hotesse_commande', commandSchema)
