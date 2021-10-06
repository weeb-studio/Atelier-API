const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send(`${req.role} Content.`);
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.unvalidateConseiller = (req, res) => {
  User.find({
    $and: [{ status: false }],
  })
    .select(
      "_id nom prenom email ville postal status numero role createdAt updatedAt"
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
