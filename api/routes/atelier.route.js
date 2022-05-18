const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/atelierController')

const router = express.Router()

router.post('/atelier', [authJwt.verifyToken, authJwt.isConseillere], controller.createAtelier)
router.get('/atelier/conseillere', [authJwt.verifyToken, authJwt.isConseillere], controller.getConseillereAtelier)
router.get('/atelier', controller.getAllAvalableAtelier)
router.put('/atelier/inscription/:id', [authJwt.verifyToken], controller.inscriptionAtelier)
router.put('/atelier/description/:id', [authJwt.verifyToken], controller.desinscriptionAtelier)
router.get('/atelier/hotesse', [authJwt.verifyToken], controller.getAllHotesseAtelier)
router.get('/atelier/ville', controller.getAllVilleAtelier)

module.exports = router
