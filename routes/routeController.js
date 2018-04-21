const request = require('request-promise-native');

module.exports.set = function(app) {
    //Marvels controller we dont have access to this backend
    app.get('/search?q=spiderman', (req, res) => {
        database.findAll({
            where: {
                name: req.query.name
            }
        }).then(data => {
            res.json({success: data});
            //SELECT * FROM character WHERE name LIKE %req.query.name%
        });
    });

    //This is our route on our website
    app.get('/foo', (req, res) => {

    })


};
