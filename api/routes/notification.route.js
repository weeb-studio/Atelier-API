const express = require('express')
const controller = require('../controllers/notificationControllers')

const router = express.Router()

router.get('/notification', controller.getAll)
router.post('/notification', controller.create)
router.put('/notification/:id', controller.update)
router.delete('/notification/:id', controller.delete)

module.exports = router
