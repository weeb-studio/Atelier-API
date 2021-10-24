const { verifySignUp, authJwt } = require("../middlewares");
const controller = require("../controllers/authController");
const upload = require("../utils/upload");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted,
    ],
    controller.signup
  );

  app.get("/auth/profile", [authJwt.verifyToken], controller.getCurrentUser);
  app.put("/auth/update", [authJwt.verifyToken], controller.updateUser);
  app.put(
    "/auth/updateimage",
    [authJwt.verifyToken],
    upload.single("imageURL"),
    controller.updateUserImage
  );
  app.post("/auth/signin", controller.signin);
};
