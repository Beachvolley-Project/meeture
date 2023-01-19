const router = require('express').Router();
const Event = require('../models/Event');
const Location = require('../models/Location');
const { isLoggedOut, isLoggedIn } = require('../middleware/route-guard');
const telegrambot = require('../telegram-notify');

router.get('/events', isLoggedIn, (req, res, next) => {
  Event.find()
    .sort({ date: 'ascending' })
    .populate('creator')
    .populate('location')
    .then((eventsFromDB) => {
      const preview = eventsFromDB.map((event) => event.date.toString());
      const day = preview.map((day) => day.slice(0, 15));
      const hour = preview.map((hour) => hour.slice(16, 21));
      let eventos = [];
      for (let i = 0; i < eventsFromDB.length; i++) {
        eventos.push({
          events: eventsFromDB[i],
          day: day[i],
          hour: hour[i],
        });
      }
      res.render('events/index', {
        eventList: eventos,
        user: req.session.currentUser,
      });
    })
    .catch((err) => next(err));
});

router.post('/events', isLoggedIn, (req, res, next) => {
  Event.find()
    .populate('creator')
    .populate('location')
    .then((eventsFromDB) => {
      res.render('events/index', { eventList: eventsFromDB });
    })
    .catch((err) => next(err));
});


router.get('/events/new', (req, res, next) => {
  Location.find()
    .then((locationFromDb) => {
      res.render('events/new', {
        locationList: locationFromDb,
        user: req.session.currentUser,
      });
    })
    .catch((err) => {
      next(err);
    });
});

// ADD II : POSTS THE ENTRIES TO EVENTS PAGE
router.post('/events/new', (req, res, next) => {
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
    .then((e) => {
      telegrambot(
        `A new beachvolley event is created! Event name: ${e.title}, date: ${e.date}, capacity: ${e.capacity} persons.  Check the website out!`,
      );
      res.redirect('/events');
    })
    .catch((err) => {
      res.redirect('/events');
    });
});

//GO TO JOIN PAGE
router.get('/events/:id', (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.session.currentUser._id;
  console.log('userObject: ', userId);
  Event.findById(eventId)
    .populate('participants')
    .populate('location')
    .then((eventFromDb) => {
      console.log('eventFromDb: ', eventFromDb);
      let participants = eventFromDb.participants.map(
        (participant) => participant.id,
      );
      if (!participants.includes(userId) && eventFromDb.availableSlots >= 1) {
        eventFromDb.participants.push(userId);
        eventFromDb.availableSlots = eventFromDb.availableSlots - 1;
        eventFromDb.save();
      }
      res.render('events/eventDetails', {
        event: eventFromDb,
        user: req.session.currentUser,
      });
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/events/:id/edit', (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.session.currentUser._id;

  Event.findById(eventId)
    .populate('participants')
    .then((eventFromDB) => {
      console.log(userId);
      console.log(eventFromDB.creator);

      if (eventFromDB.creator.toString() === userId) {
        Location.find().then((locationsFromDB) => {
          res.render('events/edit', {
            event: eventFromDB,
            locationList: locationsFromDB,
          });
        });
      } else {
        negative(res, req);
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/events/:id/edit', (req, res, next) => {
  const eventId = req.params.id;
  console.log('try: ', req.body);
  const { title, date, capacity, location, participants, availableSlots } =
    req.body;
  Event.findByIdAndUpdate(eventId, {
    title,
    date,
    capacity,
    location,
    participants,
    availableSlots,
  })
    .then(() => {
      res.redirect('/events');
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/events/:id/delete', (req, res, next) => {
  const eventId = req.params.id;
  const userId = req.session.currentUser._id;
  Event.findById(eventId)
    .then((eventFromDB) => {
      if (eventFromDB.creator.toString() !== userId) {
        negative(res, req);
      } else {
        Event.findByIdAndRemove(eventId).then((deletedEvent) => {
          res.redirect('/events');
        });
      }
    })
    .catch((err) => {
      next(err);
    });
});

function negative(res, req) {
  return res.render('events/eventDetails', {
    message: 'You are not the creator of this event!!!',
    user: req.session.currentUser,
  });
}

module.exports = router;
