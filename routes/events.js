const router = require("express").Router();
const Event = require("../models/Event");
const Location = require("../models/Location");
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard");
const telegrambot = require('../telegram-notify')

// SHOWS THE EVENTS ON THE EVENTS PAGE

router.get("/events", (req, res, next) => {
  Event.find()
    .populate("creator")
    .populate("location")
    .then((eventsFromDB) => {
      // console.log("contro: ", eventsFromDB);
      // const preview = eventsFromDB.map((event) =>
      //   event.push({ day: event.date.toString() })
      // );
      const preview = eventsFromDB.map((event) => event.date.toString());
      const day = preview.map((day) => day.slice(0, 15));
      const hour = preview.map((day) => day.slice(16, 21));
      //console.log(hour);
      res.render("events/index", {
        eventList: eventsFromDB,
        day: day,
        hour: hour,
      });
    })
    .catch((err) => next(err));
});

router.post("/events", (req, res, next) => {
  Event.find()
    .populate("creator")
    .populate("location")
    .then((eventsFromDB) => {
     // console.log("contro: ", eventsFromDB);
      res.render("events/index", { eventList: eventsFromDB });
    })
    .catch((err) => next(err));
});

// ADD I : LISTS THE LOCATIONS TO SELECT
router.get("/events/new", (req, res, next) => {
  Location.find()
    .then((locationFromDb) => {
      telegrambot('helloooo');
      res.render("events/new", { locationList: locationFromDb });
    })
    .catch((err) => {
      next(err);
    });
});

// // CREATES NEW EVENT
// router.get("/events/new", (req, res, next) => {
//   res.render("events/new");
// });

// ADD II : POSTS THE ENTRIES TO EVENTS PAGE

router.post("/events/new", (req, res, next) => {
  // console.log(req.session.currentUser);
  const userId = req.session.currentUser._id;
  console.log(userId);
  const { title, date, capacity, location } = req.body;
  Event.create({
    title: title,
    date: date,
    capacity: capacity,
    availableSlots: capacity,
    location: location,
    creator: userId,
  })
    .then((newEvent) => {
      //console.log(newEvent);
      telegrambot('helloooo');
      res.redirect("/events");
    })
    .catch((err) => {
      res.redirect("/events");
    });
});


//GO TO JOIN PAGE

router.get("/events/:id", (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.session.currentUser._id;
  console.log("userObject: ", userId);
  Event.findById(eventId)
    .populate("participants")
    .then((eventFromDb) => {
      eventFromDb.participants.push(userId);
      eventFromDb.availableSlots = eventFromDb.availableSlots - 1;
      eventFromDb.save();
      res.render("events/eventDetails", { event: eventFromDb });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
