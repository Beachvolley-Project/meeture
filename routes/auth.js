const router = require("express").Router();
const User = require('../models/User')
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.get('/signup', (req, res, next) => {
    res.render('signup')
})

router.post('/signup', (req, res, next) => {
    const {username, email, /* phoneNumber, */ password} = req.body;
    if(password.length < 4) {
        res.render('signup', {message: 'Password has to be minimum 4 characters.'})
        return;
    };
    if (username === '') {
        res.render('signup', {message: 'Username cannot be empty.'})
    };
    if (password.length === ''){
        res.render('signup', {message: 'Password cannot be empty'})
    }
User.findOne({username: username})
.then(userFromDB => {
    if(userFromDB !== null){
        res.render('signup', {message: 'The username is already taken'})
    return;
    } else {
        const salt = bcrypt.genSaltSync()
		const hash = bcrypt.hashSync(password, salt)
        
        User.create({
            username: username, 
            password: hash,
            email: email,            
        })
        .then(createdUser => {
            console.log(createdUser)
            res.redirect('/login')
        })
        .catch(err => {
            next(err)
        })
    }
})
})












module.exports = router;
