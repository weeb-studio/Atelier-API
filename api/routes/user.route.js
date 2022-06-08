const express = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/userControllers')

const router = express.Router()

router.get('/user/all', controller.allAccess)
router.get('/user/board', [authJwt.verifyToken], controller.userBoard)
router.get('/user/moderated', [authJwt.verifyToken, authJwt.isConseillere], controller.moderatorBoard)
router.get('/user/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard)
router.get('/user/:uid', [authJwt.verifyToken, authJwt.isAdmin], controller.getUserById)
router.get('/user/invalid', [authJwt.verifyToken, authJwt.isAdmin], controller.unvalidateConseiller)
router.put('/user/:uid', [authJwt.verifyToken, authJwt.isAdmin], controller.validate)
router.get('/user/type/:type', [authJwt.verifyToken, authJwt.isAdmin], controller.getTypeOfUsers)

router.get('/user-conseillers', [authJwt.verifyToken, authJwt.isAdmin], controller.getConseillers)
router.get('/user-hotesses', [authJwt.verifyToken, authJwt.isAdmin], controller.getHotesses)
router.get('/user-clientes', [authJwt.verifyToken, authJwt.isAdmin], controller.getClientes)
router.get('/user-attempt', [authJwt.verifyToken, authJwt.isAdmin], controller.getAttemptAccounts)

module.exports = router
