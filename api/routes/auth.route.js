const express = require('express')
const { verifySignUp, authJwt } = require('../middlewares')
const controller = require('../controllers/authController')
const upload = require('../utils/upload')

const router = express.Router()

router.post(
   '/auth/signup',
   [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
   controller.signup
)
router.get('/auth/email/:email', [authJwt.verifyToken], controller.getUserByEmail)
router.get('/auth/profile', [authJwt.verifyToken], controller.getCurrentUser)
router.put('/auth/update', [authJwt.verifyToken], controller.updateUser)
router.put('/auth/update-profile', authJwt.verifyToken, upload.single('imageURL'), controller.updateUserImage)
router.post('/auth/signing', controller.signin)

module.exports = router
