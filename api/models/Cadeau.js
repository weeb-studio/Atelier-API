const mongoose = require("mongoose");

const cadeauSchema = new mongoose.Schema(
  {
    produit: {
      type: mongoose.Types.ObjectId,
      ref: "produit",
      required: true,
    },

    hotesse: {
      type: mongoose.Types.ObjectId,
      ref: "utilisateur",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("cadeau", cadeauSchema);
