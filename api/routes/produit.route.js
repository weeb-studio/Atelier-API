const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/produitController')
const upload = require('../utils/upload')

const router = express.Router()

router.post('/produit', [authJwt.verifyToken, authJwt.isAdmin], upload.single('imageURL'), controller.createProduct)
router.get('/produit', [authJwt.verifyToken, authJwt.isAdmin], controller.get_all_product)
router.delete('/produit/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.delete_product)

module.exports = router
