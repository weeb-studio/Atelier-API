const { authJwt } = require("../middlewares");
const controller = require("../controllers/atelierController");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/atelier",
    [authJwt.verifyToken, authJwt.isConseillere],
    controller.createAtelier
  );

  app.get(
    "/atelier/conseillere",
    [authJwt.verifyToken, authJwt.isConseillere],
    controller.getconseillereAtelier
  );

  app.get("/atelier", [authJwt.verifyToken], controller.get_all_atelier);
};
