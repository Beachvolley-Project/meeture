const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
//const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");
const saltRounds = 10;

router.get("/signup", (req, res, next) => {
    res.render("signup");
  }
);

router.post("/signup", (req, res, next) => {
    const { username, password } = req.body;
    if (password.length < 4) {
      res.render("signup", {
        message: "Password has to be minimum 4 characters.",
      });
      return;
    }
    if (username === "") {
      res.render("signup", { message: "Username cannot be empty." });
    }
    if (password.length === "") {
      res.render("signup", { message: "Password cannot be empty" });
    }
    User.findOne({ username: username }).then((userFromDB) => {
      if (userFromDB !== null) {
        res.render("signup", { message: "The username is already taken" });
        return;
      } else {
        const salt = bcrypt.genSaltSync();
        const hash = bcrypt.hashSync(password, salt);

        User.create({
          username: username,
          password: hash,
        })
          .then((createdUser) => {
            console.log(createdUser);
            res.redirect("/login");
          })
          .catch((err) => {
            next(err);
          });
      }
    });
  }
);

router.get("/login", (req, res, next) => {
  res.render("login");
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.render("login", {
      errorMessage: "Please enter both, username and password to login.",
    });
    return;
  }
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.render("login", {
          errorMessage: "Username is not registered. Try with other username.",
        });
        return;
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user; // SESSION
        res.redirect(
          "/events"
        );
      } else {
        res.render("login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});


router.post("/logout", (req, res, next) => {
    req.session.destroy((err) => {
      if (err) next(err);
      res.redirect("/");
    });
  }
);

module.exports = router;
