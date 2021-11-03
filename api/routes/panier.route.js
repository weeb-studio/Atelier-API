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
        controller.addpanier
    );
    app.get(
        "/panier", 
        controller.get_panier
    );
}