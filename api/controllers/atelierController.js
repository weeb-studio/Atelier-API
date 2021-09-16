const db = require("../models");
const Atelier = db.atelier;

exports.Hello_Word = (req, res) => {
  res.send("Hello Atelier");
};

exports.createAtelier = (req, res) => {
  const atelier = new Atelier({
    place: req.body.place,
    theme: req.body.theme,
    hotesse: req.body.hotesse,
    status: req.body.status,
    ouvert: req.body.ouvert,
    conseillere: req.userId,
  });

  atelier
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

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};