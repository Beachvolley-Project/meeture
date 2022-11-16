const router = require("express").Router();
const Location = require("../models/Location");


router.get("/", (req, res, next) => {
  res.render("index", {user : req.session.currentUser} );
});

router.get("/api/locations", (req, res, next) => {
  Location.find()
  .then(locations => {
    res.json(locations)
  })
  .catch((err) => {
    next(err);
  })
})

module.exports = router;
