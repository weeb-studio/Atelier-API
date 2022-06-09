const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/produitController')
const upload = require('../utils/upload')

const router = express.Router()

router.post('/product', [authJwt.verifyToken, authJwt.isAdmin], upload.single('imageURL'), controller.createProduct)
router.get('/product', authJwt.verifyToken, controller.getAllProduct)
router.get('/product/soins', authJwt.verifyToken, controller.getAllSoinsProduct)
router.get('/product/coiffure', authJwt.verifyToken, controller.getAllCoiffureProduct)
router.put('/product/:id', [authJwt.verifyToken, authJwt.isAdmin], upload.single('imageURL'), controller.updateProduct)
router.delete('/product/:id', authJwt.verifyToken, controller.deleteProduct)

module.exports = router
