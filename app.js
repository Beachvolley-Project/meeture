// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const mapbox = require("mapbox-gl");
// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");
hbs.registerHelper("isZero", function (value) {
  return value === 0;
});

/* //telegram-notify
const Telegram = require('telegram-notify');
let notify = new Telegram({token:process.env.TELEGRAMTOKEN, chatId:process.env.CHATID});
(async function (){
  await notify.send('alert');
})() */

const path = require("path");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials"));

// default value for title local
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

// 👇 Start handling routes here
const index = require("./routes/index.routes");
app.use("/", index);

const auth = require("./routes/auth");
app.use("/", auth);

const event = require("./routes/events");
app.use("/", event);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
