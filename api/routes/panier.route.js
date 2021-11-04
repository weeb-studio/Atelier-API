const { authJwt } = require("../middlewares");
const controller = require("../controllers/paniercontroller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    app.post(
        "/panier",
        [authJwt.verifyToken],
        controller.addpanier
    );
    app.get(
        "/panier", 
        [authJwt.verifyToken],
        controller.get_panier
    );
}