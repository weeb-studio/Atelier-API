const mongoose = require('mongoose')

const PlageSchema = new mongoose.Schema({
   index: {
      type: Number,
      required: true,
   },
   begin: {
      type: String,
      required: true
   },
   end: {
      type: String,
      required: true
   }
})

module.exports = mongoose.model('plage', PlageSchema)
