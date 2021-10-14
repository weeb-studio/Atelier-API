const db = require("../models");
const Catalogue = db.catalogue;

exports.Hello_Word = (req, res) => {
  res.send("Hello Catalogue");
};

exports.addProduct = (req, res) => {
  let catalogue = new Catalogue({
    produit: req.body.produit,
    qte: req.body.qte,
  });

  catalogue
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

exports.get_catalogue = (req, res) => {
  Catalogue.find()
    .populate("produit")
    .exec()
    .then((res) => {
      res.status(200).json(res);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Une erreur est survenue",
        err: err,
      });
    });
};

exports.delete_catalogue = (req, res) => {
  const id = req.params.id;

  if (id.length != 24) {
    return res.status(400).send("Identifiant invalide");
  }
  Catalogue.remove({ _id: id })
    .exec()
    .then((resultat) => {
      res.status(200).json({
        message: "Suppression réussie",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};
