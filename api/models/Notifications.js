const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
   title: {
      type: String,
      required: true
   },
   message: {
      type: String,
      required: true
   },
   cmd_bon: { // For commands bons.
      type: mongoose.Types.ObjectId,
      ref: 'commande',
      required: false
   },
   cmd: { // For hotesse commands
      type: mongoose.Types.ObjectId,
      ref: 'hotesse_commande',
      required: false
   },
   sender: {
      type: mongoose.Types.ObjectId,
      ref: 'utilisateur',
      required: false
   },
   receiver: {
      type: String,
      required: false
   },
   type: {
      type: String,
      enum: ['CMD', 'CMDB', 'MSG', 'NC'],
      required: true
   },
   is_read: {
      type: Boolean,
      default: false
   }
}, {timestamps: true})

module.exports = mongoose.model('notification', NotificationSchema)
