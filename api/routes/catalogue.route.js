const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/cataloguecontroller')

const router = express.Router()

router.post('/catalogue', [authJwt.verifyToken, authJwt.isAdmin], controller.addProduct)
router.get('/catalogue', [authJwt.verifyToken], controller.get_catalogue)
router.delete('/catalogue/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.delete_catalogue)

module.exports = router
