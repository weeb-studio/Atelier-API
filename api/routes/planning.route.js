const express = require('express')
const controller = require('../controllers/planningControllers')

const router = express.Router()

router.get('/planning', controller.getAll)
router.get('/planning/user/:user_id', controller.getAllOfUser)
router.post('/planning', controller.create)
router.put('/planning/:id', controller.update)
router.delete('/planning/:id', controller.delete)
router.post('/planning-many', controller.deleteMany)

module.exports = router
