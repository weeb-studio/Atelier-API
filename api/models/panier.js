const mongoose = require("mongoose");

const panierSchema = new mongoose.Schema({
    role: {
        type: mongoose.Types.ObjectId,
        ref: "role",
      },
    produit: {
        type: mongoose.Types.ObjectId,
        ref: "produit",
        required: true,
      },
    quantite: {
        type : Number,
        required : true
    },

},
{ timestamps: true }
);

module.exports = mongoose.model("panier",panierSchema);
