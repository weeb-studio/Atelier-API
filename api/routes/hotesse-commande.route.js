const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/hotesse-commandeControllers')

const router = express.Router()

router.get('/hotesse-commande',[authJwt.verifyToken], controller.getAll)
router.get('/hotesse-commande/status/:status', [authJwt.verifyToken], controller.getByStatus)
router.post('/hotesse-commande', [authJwt.verifyToken], controller.create)
router.put('/hotesse-commande/:id', [authJwt.verifyToken], controller.update)
router.delete('/hotesse-commande/:id', [authJwt.verifyToken], controller.delete)

module.exports = router
