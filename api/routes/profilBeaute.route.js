const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/profilBeauteController')

const router = express.Router()

router.post('/profil-beauty', [authJwt.verifyToken], controller.addProfil)
router.get('/profilBeauty', [authJwt.verifyToken], controller.getProfil)

module.exports = router
