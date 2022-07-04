const router = require("express").Router();
const Event = require('../models/Event');

router.get('/events', (req, res, next) => {
    const {title, date, capacity, participants, location, creator} = req.body
    Event.create({
        title: title,
        date: date,
        capacity: capacity,
        participants: participants,
        location: location,
        creator: creator
    })
})