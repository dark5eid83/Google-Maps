const request = require('request-promise-native');

module.exports.set = function(app) {
    app.get('/login', (req, res) => {
       res.render('signin', {});
    });
};
