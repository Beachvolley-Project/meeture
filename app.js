require("dotenv/config");
require("./db");

const express = require("express");
const mapbox = require("mapbox-gl");
const hbs = require("hbs");

hbs.registerHelper("isZero", function (value) {
  return value === 0;
});

const path = require("path");
const app = express();

require("./config")(app);

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));

const capitalized = require("./utils/capitalized");
const projectName = "Meeture";

app.locals.appTitle = `${capitalized(projectName)}`;

const session = require("express-session");
const MongoStore = require("connect-mongo");

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
  })
);

const index = require("./routes/index.routes");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/", auth);

const event = require("./routes/events");
app.use("/", event);

require("./error-handling")(app);

module.exports = app;
