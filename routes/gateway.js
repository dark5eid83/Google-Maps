const jwt = require('jsonwebtoken');
const { users } = require('../models');

/**
 * Express Middleware
 *
 */
module.exports = {
    defend: (req, res, next) => req.user ? next() : res.redirect("/api/v1/denied"),

    /**
     * Handles serializing a user to the express session.
     *
     * This method will create a token property onto the request object which is a
     * signed JWT Token representing the user.
     * @param req
     * @param res
     * @param next
     */
    serialize: (req, res, next) => {
        req.token = jwt.sign({
            id: req.user.id,
        }, process.env.EXPRESS_SESSION_SECRET);
        next();
    },

    /**
     * De-serializes a user from the session using a post body
     *
     * This method will deserialize a user from the post body and will use the JWT token to
     * identify a user in the database
     * @param req
     * @param res
     * @param next
     */
    deserializePost: (req, res, next) => {
        jwt.verify(req.body.token, process.env.EXPRESS_SESSION_SECRET, (err, user) => {
            if(err !== null) {
                res.tokenUser = null;
                next();
            } else {
                users.findById(user.id).then(user => {
                    req.tokenUser = user;
                    next();
                });
            }
        });
    },

    /**
     * De-serializes a user from the session using a get request query parameters
     * @param req
     * @param res
     * @param next
     */
    deserializeGet: (req, res, next) => {
        jwt.verify(req.query.token, process.env.EXPRESS_SESSION_SECRET, (err, user) => {
            if(err !== null) {
                res.tokenUser = null;
                next();
            } else {
                users.findById(user.id).then(user => {
                    req.tokenUser = user;
                    next();
                });
            }
        });
    },
};