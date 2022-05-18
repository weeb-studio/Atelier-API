const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/contactController')

const router = express.Router()

router.post('/contact', controller.addContact)
router.get('/contact', [authJwt.verifyToken, authJwt.isAdmin], controller.get_contact)
router.delete('/contact/:id', [authJwt.verifyToken, authJwt.isAdmin], controller.delete_contact)

module.exports = router
