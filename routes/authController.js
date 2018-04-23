const Auth = require('./gateway');
const bcrypt = require('bcrypt');
let {users} = require('../models');

module.exports.set = app => {
    /**
     * Handles showing the login page
     */
    app.get('/login', (req, res) => {
        //Redirect a logged in user home no need for them to log in again
        if(req.user) {
            res.redirect('/');
        } else {
            //Show a non-logged in user the signin page
            res.render('signin', {});
        }
    });

    /**
     * Handles showing the signup page
     */
    app.get('/signup', (req, res) => {
        if(req.user) {
            res.redirect('/dashboard')
        } else {
            res.render('register', {
                errors: []
            });
        }
    });

    /**
     * Handles registering a new user
     *
     * Note: This is NOT secure
     */
    app.post('/signup', (req, res) => {
        //Check through all the form fields make sure none are empty
        for(let prop in req.body) {
            if(req.body[prop].length === 0) {
                res.render('register', {
                    errors: [`The Form field: ${prop} was left blank`]
                })
            }
        }

        //Check and make sure the the passwords are the same
        if(req.body.password === req.body.confirm) {
            users.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 10), //Notice how we hash the password before storing it
                bio: '',
                profile_picture: 'https://i.stack.imgur.com/l60Hf.png'
            }).then(() => {
               res.redirect('/login');
            });
        } else {
            res.render('register', {
                errors: ["Your Passwords must match!"]
            })
        }
    });

    /**
     * Handles logging a user out
     */
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};
