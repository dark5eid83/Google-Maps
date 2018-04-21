var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', key: process.env.GOOGLE_API_KEY, location: 'Seattle+Washington' });
});

router.post('/place', (req, res) => {
    //The result of the form being submitted
    res.render('index', { title: 'Express', key: process.env.GOOGLE_API_KEY, location: req.body.location.trim() })
});

module.exports = router;
