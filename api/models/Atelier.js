const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
   lastname: {
      type: String,
      required: true,
   },
   firstname: {
      type: String,
      required: true,
   },
   phone: {
      type: String,
      required: false,
   },
   email: {
      type: String,
      required: false,
   },
})

exports.subscriberModel = mongoose.model('subscription', subscriberSchema)

const atelierSchema = new mongoose.Schema(
   {
      theme: {
         type: String,
         required: true,
      },
      max_place: {
         type: Number,
         required: true,
      },
      dispose_place: {
         type: Number,
         required: true,
         default: 0,
      },
      event_place: {
         type: String,
         enum: ['Inline', 'InHouse'],
         required: true,
         default: 'Inline',
      },
      address: {
         type: String,
         required: false,
      },
      city: {
         type: String,
         required: false,
      },
      postal_code: {
         type: Number,
         required: false,
      },
      program_date: {
         type: Date,
         required: true,
      },
      program_time: {
         type: String,
         required: false,
      },
      status: {
         type: String,
         enum: ['WAITING', 'IN_COURSE', 'FINISH', 'CANCEL'],
         default: 'WAITING',
         required: true,
      },
      conseillere: {
         type: mongoose.Types.ObjectId,
         ref: 'utilisateur',
         require: true,
      },
      hotesse: {
         type: String,
         require: true,
      },
      hotesse_points: {
         type: Number,
         required: false,
         default: 0,
      },
      subscriptions: [subscriberSchema],
   },
   { timestamps: true }
)

module.exports = mongoose.model('atelier', atelierSchema)
