//Express middleware to validate a logged in user
module.exports.defend = (req, res, next) => req.user ? next() : res.redirect("/");
