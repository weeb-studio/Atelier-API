const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/panierController')

const router = express.Router()

router.post('/panier', [authJwt.verifyToken], controller.addpanier)
router.get('/panier', [authJwt.verifyToken], controller.get_panier)
router.delete('/panier/:id', controller.delete_product)

module.exports = router
