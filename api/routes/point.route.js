const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/pointController')

const router = express.Router()

router.get('/point', [authJwt.verifyToken, authJwt.isHotesse], controller.getPoints)
router.put('/point/add', [authJwt.verifyToken, authJwt.isHotesse], controller.addPoint)
router.put('/point/remove', [authJwt.verifyToken, authJwt.isHotesse], controller.removePoint)

module.exports = router
