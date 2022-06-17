const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/commandeControllers')

const router = express.Router()

router.post('/payment-intent', [authJwt.verifyToken], controller.createPaymentIntent)
router.post('/stripe-checkout', [authJwt.verifyToken], controller.stripeCheckout)
router.get('/commande',[authJwt.verifyToken], controller.getAll)
router.get('/commande/status/:status', [authJwt.verifyToken], controller.getByStatus)
router.post('/commande', [authJwt.verifyToken], controller.create)
router.put('/commande/:id', [authJwt.verifyToken], controller.update)
router.delete('/commande/:id', [authJwt.verifyToken], controller.delete)

module.exports = router
