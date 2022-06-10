const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/atelierController')

const router = express.Router()

router.post('/atelier', [authJwt.verifyToken, authJwt.isConseillere], controller.createAtelier)
router.post('/atelier/subscription/:id', controller.addNewSubscription)
router.get('/atelier/conseillere/:id', [authJwt.verifyToken, authJwt.isConseillere], controller.getConseillerAteliers)
router.get('/atelier/hotesse/:id', [authJwt.verifyToken, authJwt.isHotesse], controller.getHotesseAteliers)
router.put('/atelier', authJwt.verifyToken, controller.updateAtelier)
router.delete('/atelier/:id', authJwt.verifyToken, controller.deleteAtelier)
router.get('/atelier', controller.getAllAtelier)
router.get('/atelier/city/:city', controller.getAllCityAteliers)
router.get('/atelier/status/:status', controller.getAteliersByStatus)

module.exports = router
