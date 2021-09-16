const mongoose = require("mongoose");

const atelierSchema = new mongoose.Schema({
  place: {
    type: Number,
    required: true,
    min: 1,
  },

  theme: {
    type: String,
    required: true,
  },

  hotesse: {
    type: mongoose.Types.ObjectId,
    ref: "utilisateur",
  },

  status: {
    type: String,
    required: true,
  },

  ouvert: {
      type: Boolean,
      required: true
  },

  conseillere: {
    type: mongoose.Types.ObjectId,
    ref: "utilisateur",
  },

  
}, {timestamps: true});

module.exports = mongoose.model("atelier", atelierSchema);