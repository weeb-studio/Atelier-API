const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/cadeauController')

const router = express.Router()

router.post('/cadeau', [authJwt.verifyToken, authJwt.isHotesse], controller.ajouterCadeau)
router.get('/cadeau', [authJwt.verifyToken, authJwt.isHotesse], controller.getHotesseCadeau)
router.delete('/cadeau/:id', [authJwt.verifyToken, authJwt.isHotesse], controller.deleteCadeau)

module.exports = router
