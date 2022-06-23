const mongoose = require('mongoose')

const PlanningSchema = new mongoose.Schema({
   plage: {
      type: mongoose.Types.ObjectId,
      ref: 'plage',
      required: true,
   },
   user: {
      type: mongoose.Types.ObjectId,
      ref: 'utilisateur',
      required: true
   },
   date: {
      type: Date,
      required: true
   }
})

module.exports = mongoose.model('planning', PlanningSchema)
