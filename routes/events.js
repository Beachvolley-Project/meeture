const router = require("express").Router();
const Event = require('../models/Event');
const Location = require('../models/Location');

// ADD I : LISTS THE LOCATIONS TO SELECT
router.get('/events/new', (req, res, next) => {
    Location.find()  
    .then(locationFromDb => {
        res.render('events/new', { locationList: locationFromDb })
    })
    .catch((err) => {
        next(err)
    })
  })

// CREATES NEW EVENT
router.get('/events/new', (req, res, next) => {
    res.render('events/new')
  });

// ADD II : POSTS THE ENTRIES TO EVENTS PAGE

  router.post('/events', (req, res, next) => {
    const {title, date, capacity, participants, location, creator} = req.body
    Event.create({
        title: title,
        date: date,
        capacity: capacity,
        participants: participants,
        location: location,
        creator: creator
    })
    .then(newEvent => {
        res.redirect('/events')
    })
    .catch(err => {
        res.render('events/new')
    })
})

// SHOWS THE EVENTS ON THE EVENTS PAGE
router.get('/events', (req, res, next) => {
    Event.find()
    .then(eventsFromDB => {
        console.log(eventsFromDB)
        res.render('events/index', {eventList: eventsFromDB})
    })    
    .catch(err =>
        next(err))
})