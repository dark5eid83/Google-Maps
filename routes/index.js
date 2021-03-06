const express = require('express');
const router = express.Router();
const Auth = require('./gateway');
const { searches, users, alerts } = require('../models');

/**
 * Handles showing the Home page/index route
 */
router.get('/', (req, res) => {
    res.render('index', {user: req.user});
});

/**
 * Handles showing the dashboard page
 */
router.get('/dashboard', Auth.defend, (req, res) => {
    if(!req.query.location) {
        req.query.location = 'China'; //Set default location if its not set
    }

    //Default location is set to Seattle Washington
    searches.all({
        where: {
            user_id: req.user.id
        }
    }).then(result => {
        res.render('dashboard', {
            key: process.env.GOOGLE_API_KEY,
            location: req.query.location,
            searches: result,
            user: req.user
        });
    });
});

/**
 * Shows the user profile page
 *
 * Must be behind the authentication gateway
 */
router.get('/profile', Auth.defend, (req, res) => {
    res.render('profile', {
        user: req.user,
        errors: [],
        success: []
    })
});


/**
 * Handles the form being submitted.
 */
router.post('/place', (req, res) => {
     //Update the list of searches made
     searches.create({
         name: req.body.location.trim(),
         user_id: req.user.id
     }).then(() => {
         res.redirect(`dashboard/?location=${req.body.location.trim()}`)
     });
});

module.exports = router;
