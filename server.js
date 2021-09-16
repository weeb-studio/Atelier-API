const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./api/models");
const dbConfig = require("./api/config/db.config");

const app = express();
const Role = db.role;

var corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        nom: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        nom: "hotesse"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'hotesse' to roles collection");
      });

      new Role({
        nom: "conseillere"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'conseillere' to roles collection");
      });

      new Role({
        nom: "admin"
      }).save(err => {
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

// routes
const authRoute = require('./api/routes/auth.route');
const userRoute = require('./api/routes/user.route');

app.use('/auth', authRoute);
app.use('/user', userRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});