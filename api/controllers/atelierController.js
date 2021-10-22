const db = require("../models");
const Atelier = db.atelier;

exports.Hello_Word = (req, res) => {
  res.send("Hello Atelier");
};

exports.get_all_atelier = (req, res) => {
  let query = "";
  if (req.query.ville) query = req.query.ville;
  Atelier.find({ villeHotesse: { $regex: query, $options: "$i" } })
    .exec()
    .then((resultats) =>
      res.status(200).json({
        count: resultats.length,
        data: resultats,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue",
        error: err,
      });
    });
};

exports.createAtelier = (req, res) => {
  var atelier;
  if (req.body.hotesse) {
    atelier = new Atelier({
      // place: req.body.place,
      // theme: req.body.theme,
      // hotesse: req.body.hotesse,
      // date: req.body.date,
      // time: req.body.time,
      // status: req.body.status,
      // ouvert: req.body.ouvert,
      // conseillere: req.userId,

      place: req.body.place,
      theme: req.body.theme,
      postal: req.body.postal,
      hotesse: req.body.hotesse,
      villeHotesse: req.body.villeHotesse,
      date: req.body.date,
      time: req.body.time,
      status: req.body.status,
      ouvert: req.body.ouvert,
      conseillere: req.userId,
    });
  } else {
    atelier = new Atelier({
      place: req.body.place,
      theme: req.body.theme,
      nomHotesse: req.body.nomHotesse,
      prenomHotesse: req.body.prenomHotesse,
      adresseHotesse: req.body.adresseHotesse,
      postal: req.body.postal,
      villeHotesse: req.body.villeHotesse,
      date: req.body.date,
      time: req.body.time,
      status: req.body.status,
      ouvert: req.body.ouvert,
      conseillere: req.userId,
    });
  }

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

exports.getconseillereAtelier = (req, res) => {
  Atelier.find({ conseillere: req.userId })
    .populate({
      path: "hotesse",
      match: { hotesse: !null },
      select:
        "_id nom prenom email adresse ville postal status numero role createdAt updatedAt",
    })

    // "hotesse", null, { hotesse: !null })
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      return res.status(200).send(user);
    });
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};
