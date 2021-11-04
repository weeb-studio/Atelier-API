const db = require("../models");
const Panier = db.panier;

exports.addpanier = (req, res) => {
  console.log(req.userId);
  let panier = new Panier({
    client: req.userId,
    produit: req.body.produitId,
    qte: req.body.quantite,
  });

  panier
    .save()
    .then((resultat) => {
      res.status(201).json(resultat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};
exports.get_panier = (req, res) => {
  Panier.find()
    .populate("produit")
    .exec()
    .then((resultat) => {
      return res.status(200).json(resultat);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Une erreur est survenue",
        err: err,
      });
    });
};
