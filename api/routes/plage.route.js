const express = require('express')
const controller = require('../controllers/plageControllers')

const router = express.Router()

router.get('/plage', controller.getAll)
router.post('/plage', controller.create)
router.put('/plage/:id', controller.update)
router.delete('/plage/:id', controller.delete)

module.exports = router
