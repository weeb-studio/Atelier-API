const mongoose = require('mongoose')
const productModel = require('../models/Produit')

const clienteSchema = new mongoose.Schema({
    lastname: {
        type: String,
        required: true,
        max: 255
    },
    firstname: {
        type: String,
        required: true,
        max: 255
    },
    email: {
        type: String,
        required: false,
        max: 255
    },
    phone: {
        type: String,
        required: false,
        max: 15
    },
    address: {
        type: String,
        required: false,
    },
    postal_code: {
        type: String,
        required: false,
    },
})

const commandSchema = new mongoose.Schema({
    cliente: {
        type: clienteSchema,
        required: true
    },
    shipping_date: {
        type: String,
        required: true
    },
    conseillere: {
      type: mongoose.Types.ObjectId,
      ref: 'utilisateur',
        required: true
    },
    commission: {
        type: Number,
        required: false,
        default: 0,
    },
    hotesse_name: {
        type: String,
        required: true
    },
    shipping_amount: {
        type: Number,
        required: true
    },
    product_list: [productModel.ProductSchema],
    status: {
        type: String,
        enum: ['PENDING', 'CANCEL', 'VALIDATE', 'SHIPPING'],
        required: true,
        default: 'PENDING'
    }
}, {timestamps: true})

module.exports = mongoose.model('commande', commandSchema)
