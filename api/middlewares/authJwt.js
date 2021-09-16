const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
const Role = db.role;

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    console.log(decoded)
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    Role.findById(user.role).exec(
      (err, roles) => {
          console.log(roles);
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (roles.nom === "admin") {
            next();
            return;
        }

        res.status(403).send({ message: "Require Admin Role!" });
        return;
      }
    );
  });
};

isHotesse = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.findById(user.role).exec(
        (err, roles) => {
            console.log(roles);
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (roles.nom === "hotesse") {
              next();
              return;
          }
  
          res.status(403).send({ message: "Require Hotesse Role!" });
          return;
        }
      );
    });
};

isConseillere = (req, res, next) => {
    User.findById(req.userId).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
  
      Role.findById(user.role).exec(
        (err, roles) => {
            console.log(roles);
          if (err) {
            res.status(500).send({ message: err });
            return;
          }
          if (roles.nom === "conseillere") {
              next();
              return;
          }
  
          res.status(403).send({ message: "Require Conseillere Role!" });
          return;
        }
      );
    });
};

// isModerator = (req, res, next) => {
//   User.findById(req.userId).exec((err, user) => {
//     if (err) {
//       res.status(500).send({ message: err });
//       return;
//     }

//     Role.find(
//       {
//         _id: { $in: user.roles }
//       },
//       (err, roles) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           return;
//         }

//         for (let i = 0; i < roles.length; i++) {
//           if (roles[i].name === "moderator") {
//             next();
//             return;
//           }
//         }

//         res.status(403).send({ message: "Require Moderator Role!" });
//         return;
//       }
//     );
//   });
// };

const authJwt = {
  verifyToken,
  isAdmin,
  isHotesse,
  isConseillere
};
module.exports = authJwt;