const express = require('express');
const router = express.Router();
const { searches, users } = require('../models');

/**
 * Handles showing the Home page/index route
 */
router.get('/', function(req, res, next) {
  //Default location is set to Seattle Washington
  res.render('index', { key: process.env.GOOGLE_API_KEY, location: 'Seattle+Washington' });
});


/**
 * Handles the form being submitted.
 */
router.post('/place', (req, res) => {
    //The result of the form being submitted re-render the home page with an updated location
    res.render('index', { key: process.env.GOOGLE_API_KEY, location: req.body.location.trim() })
});

module.exports = router;
