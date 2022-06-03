const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
   {
      nom: {
         type: String,
         required: true,
         max: 255,
      },

      prenom: {
         type: String,
         required: true,
         max: 255,
      },

      role: {
         type: mongoose.Types.ObjectId,
         ref: 'role',
      },

      email: {
         type: String,
         required: true,
         unique: true,
         min: 6,
         max: 255,
      },

      imageURL: {
         type: String,
         default: '',
      },

      adresse: {
         type: String,
         required: false,
      },

      ville: {
         type: String,
         required: false,
         max: 255,
      },

      postal: {
         type: Number,
         required: false,
         max: 999999,
      },

      status: {
         type: Boolean,
         required: true,
         default: false,
      },

      numero: {
         type: String,
         default: '',
         required: false,
         min: 9,
      },

      password: {
         type: String,
         required: true,
      },
   },
   { timestamps: true }
)

module.exports = mongoose.model('utilisateur', userSchema)
