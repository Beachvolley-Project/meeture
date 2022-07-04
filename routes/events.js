const router = require("express").Router();
const Event = require('../models/Event');

router.get('/events/new')

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