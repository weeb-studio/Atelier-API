const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const ROLES = db.ROLES;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
  const user = new User({
    nom: req.body.nom,
    prenom: req.body.prenom,
    email: req.body.email,
    adresse: req.body.adresse,
    ville: req.body.ville,
    postal: req.body.postal,
    numero: req.body.numero,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.status) {
      user.status = req.body.status;
    }

    if (req.body.role) {
      if (ROLES.includes(req.body.role)) {
        Role.findOne({ nom: req.body.role }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.role = role._id;
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        res.send({ message: "Role non definie" });
      }
    } else {
      Role.findOne({ nom: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.role = role._id;
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.getCurrentUser = (req, res) => {
  User.findById(req.userId)
    .select(
      "_id nom prenom email imageURL adresse ville postal status numero role createdAt updatedAt"
    )
    .populate("role", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      } else {
        res.status(200).send(user);
      }
    });
};

exports.updateUser = (req, res) => {
  let userData = {};

  if (req.body.nom) userData.nom = req.body.nom;
  if (req.body.prenom) userData.prenom = req.body.prenom;
  if (req.body.adresse) userData.adresse = req.body.adresse;
  if (req.body.telephone) userData.numero = req.body.telephone;
  if (req.body.postal) userData.postal = req.body.postal;
  if (req.body.ville) userData.ville = req.body.ville;

  User.update({ _id: req.userId }, { $set: userData })
    .exec()
    .then((resultat) => {
      if (!resultat)
        return res.status(404).json({
          message: "Oups!! aucune information pour l'identifiant fourni",
        });
      res.status(200).json({
        message: "Mise à jour reussie",
        doc: resultat,
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

exports.updateUserImage = (req, res) => {
  let userData = {};

  userData.imageURL = req.file.path;

  User.update({ _id: req.userId }, { $set: userData })
    .exec()
    .then((resultat) => {
      if (!resultat)
        return res.status(404).json({
          message: "Oups!! aucune information pour l'identifiant fourni",
        });
      res.status(200).json({
        message: "Mise à jour reussie",
        doc: resultat,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "Oups!! une erreur est survenue sur le serveur",
        error: err,
      });
    });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("role", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res
          .status(404)
          .send({ message: "Nom d'utilisateur ou mot de passe incorrect." });
      }

      if (!user.status) {
        return res.status(400).send({
          message: "Votre compte n'a pas encore été.",
        });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(400).send({
          accessToken: null,
          message: "Nom d'utilisateur ou mot de passe incorrect.",
        });
      }
      var token = jwt.sign(
        { id: user.id, role: user.role.nom },
        config.secret,
        {
          expiresIn: 86400, // 24 hours
        }
      );

      res.status(200).send({
        id: user._id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        role: user.role,
        accessToken: token,
      });
    });
};
