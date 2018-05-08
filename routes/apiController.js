const express = require('express');
const router = express.Router();
const Auth = require('./gateway');
const { users, searches } = require('../models');


router.get('/searches', Auth.defend, (req, res) => {

    searches.findAll({
        where: {
            id: req.user.id
        }
    }).then(searches => {
       res.json({searches});
    });
});

module.exports = router;
