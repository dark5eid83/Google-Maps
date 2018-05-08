const express = require('express');
const router = express.Router();
const Auth = require('./gateway');
const { users, searches } = require('../models');

router.get('/denied', (req, res) => {
   res.status(403).json({
       message: 'Access denied to requested resource.'
   })
});

router.get('/searches', Auth.deserializeGet, (req, res) => {
    console.log("Finding users searches -> ", req.tokenUser.id);
    searches.findAll({
        where: {
            id: req.tokenUser.id
        }
    }).then(searches => {
       res.json({searches});
    });
});

module.exports = router;
