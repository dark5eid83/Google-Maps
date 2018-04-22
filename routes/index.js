const express = require('express');
const router = express.Router();
const { searches, users } = require('../models');

/**
 * Handles showing the Home page/index route
 */
router.get('/', (req, res) => {
     //Default location is set to Seattle Washington
     searches.all().then(result => {
         res.render('index', {
             key: process.env.GOOGLE_API_KEY,
             location: req.query.location,
             searches: result,
             user: req.user
         });
     });
});


/**
 * Handles the form being submitted.
 */
router.post('/place', (req, res) => {
     //Update the list of searches made
     searches.create({
         name: req.body.location.trim()
     }).then(() => {
         res.redirect(`/?location=${req.body.location.trim()}`)
     });
});

module.exports = router;
