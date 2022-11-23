const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { isLoggedIn, isLoggedOut } = require("../middleware/route-guard");
const saltRounds = 10;

router.get("/signup", isLoggedOut, (req, res, next) => {
    res.render("auth/signup");
  }
);

router.post("/signup", isLoggedOut, (req, res, next) => {
    const { username, password } = req.body;
    if (password.length < 4) {
      res.render("auth/signup", {
        message: "Password has to be minimum 4 characters.",
      });
      return;
    }
    if (username === "") {
      res.render("auth/signup", { message: "Username cannot be empty." });
    }
    if (password.length === "") {
      res.render("auth/signup", { message: "Password cannot be empty" });
    }
    User.findOne({ username: username }).then((userFromDB) => {
      if (userFromDB !== null) {
        res.render("auth/signup", { message: "The username is already taken" });
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

router.get("/login",isLoggedOut, (req, res, next) => {
  res.render("auth/login");
});

router.post("/login", isLoggedOut, (req, res, next) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.render("auth/login", {
      errorMessage: "Please enter both, username and password to login.",
    });
    return;
  }
  User.findOne({ username })
    .then((user) => {
      if (!user) {
        res.render("auth/login", {
          errorMessage: "Username is not registered. Try with other username.",
        });
        return;
      } else if (bcrypt.compareSync(password, user.password)) {
        console.log('request: ', req)
        req.session.currentUser = user; // SESSION
        res.redirect(
          "/events"
        );
      } else {
        res.render("auth/login", { errorMessage: "Incorrect password." });
      }
    })
    .catch((error) => next(error));
});


router.post("/logout", isLoggedIn, (req, res, next) => {
    req.session.destroy((err) => {
      if (err) next(err);
      res.redirect("/");
    });
  }
);

module.exports = router;
