const router = require("express").Router();
const Event = require("../models/Event");
const Location = require("../models/Location");
const { isLoggedOut, isLoggedIn } = require("../middleware/route-guard");

// ADD I : LISTS THE LOCATIONS TO SELECT
router.get("/events/new", (req, res, next) => {
  Location.find()
    .then((locationFromDb) => {
      res.render("events/new", { locationList: locationFromDb });
    })
    .catch((err) => {
      next(err);
    });
});

// CREATES NEW EVENT
router.get("/events/new", (req, res, next) => {
  res.render("events/new");
});


// ADD II : POSTS THE ENTRIES TO EVENTS PAGE

router.post("/events", (req, res, next) => {
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
      res.redirect("events");
    })
    .catch((err) => {
      res.render("events/new");
    });
});

// SHOWS THE EVENTS ON THE EVENTS PAGE
router.get("/events", (req, res, next) => {
  Event.find()
    .populate('creator')
    .populate('location')
    .then((eventsFromDB) => {
     // console.log('contro: ', eventsFromDB);
      res.render("events/index", { eventList: eventsFromDB });
    })
    .catch((err) => next(err)); 
});

//GO TO JOIN PAGE

router.get('/events/:id', (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.session.currentUser._id;
  console.log('userObject: ', userId)
  Event.findById(eventId)
  .populate('participants')
  .then(eventFromDb => {
  eventFromDb.participants.push(userId)
  eventFromDb.availableSlots = eventFromDb.availableSlots - 1
  eventFromDb.save()
  res.render('events/eventDetails', {event: eventFromDb});
  })
  .catch(err => {
    next(err)
  })
})



module.exports = router;
