const express = require("express");
var helmet = require("helmet");

const bodyParser = require("body-parser");
// const cors = require("cors");
const db = require("./api/models");
const dbConfig = require("./api/config/db.config");

const app = express();
const Role = db.role;

app.use(helmet());
app.disable("x-powered-by");

app.use(
  bodyParser.json({
    limit: "50mb",
  })
);

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    parameterLimit: 100000,
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Access-Control-Allow-Origin, X-Requested-With, Content-Type, Accept, Authorization, x-access-token"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use("/uploads", express.static("uploads"));

// var corsOptions = {
//   origin: "http://localhost:8080",
// };

// app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// routes
/*const authRoute = */ require("./api/routes/auth.route")(app);
/*const userRoute = */ require("./api/routes/user.route")(app);
/*const atelierRoute = */ require("./api/routes/atelier.route")(app);
require("./api/routes/produit.route")(app);
require("./api/routes/catalogue.route")(app);
require("./api/routes/contact.route")(app);

// app.use('/auth', authRoute);
// app.use('/user', userRoute);
// app.use('/atelier', atelierRoute);

db.mongoose
  .connect(
    `${dbConfig.URL}` /*`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`*/,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        nom: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        nom: "hotesse",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'hotesse' to roles collection");
      });

      new Role({
        nom: "conseillere",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'conseillere' to roles collection");
      });

      new Role({
        nom: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Bienvenue sur l'API BiGooDee Atélier." });
});

// set port, listen for requests
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
