//Express middleware to validate a logged in user
module.exports.make = (req, res, next) => req.user ? next() : res.redirect("/");
