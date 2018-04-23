const Auth = require('./gateway');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
let {users} = require('../models');
let upload = multer({
    fileFilter:(req, file, done) => {
        let filetypes = /jpeg|jpg|png|gif|tif/;
        let mimetype = filetypes.test(file.mimetype);
        let extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return done(null, true);
        }
        done("Error: Man....\nyou just tried to mess up my program by uploading a file that wasnt an image....nice try!\nFile upload only supports the following filetypes - " + filetypes);
    },
    dest: 'uploads/'
});

module.exports.set = app => {
    /**
     * Handles showing the login page
     */
    app.get('/login', (req, res) => {
        //Redirect a logged in user home no need for them to log in again
        if(req.user) {
            res.redirect('/dashboard');
        } else {
            //If there is an error on this request aka user has just attempted to login
            //and got their credentials wrong
            if(req.query.error) {
               res.render('signin', {
                   errors: ['Incorrect Credentials Please Try Again.']
               })
            } else {
                //Show a non-logged in user the signin page
                res.render('signin', {
                    errors: []
                });
            }
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
     * Handles updating a users password
     */
    app.post('/update/password', Auth.defend, (req, res) => {

        //Checking that all the fields were filled out
        for(let prop in req.body) {
            if(req.body[prop].length === 0) {
                res.render('profile', {
                    user: req.user,
                    errors: [`The Form field: ${prop} was left blank`],
                    success: []
                });
            }
        }


        //We check that the passwords are the same
        if(req.body.password === req.body.confirm) {
            users.update({
                password: bcrypt.hashSync(req.body.password, 10)
            }, {where: {id: req.user.id}}).then(() => {
               res.render('profile', {
                   user: req.user,
                   errors:[],
                   success: ['Information saved successfully']
               })
            });
        } else {
            res.render('profile', {
                user: req.user,
                errors: [`The passwords must match!`],
                success: []
            })
        }
    });

    /**
     * Updates a users biography
     */
    app.post('/update/bio', Auth.defend, (req, res) => {
        if(req.body.bio.length > 0) {
            users.update({
                bio: req.body.bio
            }, {where: {id: req.user.id}}).then(() => {
               res.render('profile', {
                   user: req.user,
                   errors: [],
                   success: ['Your Biography was updated successfully!']
               })
            });
        } else {
            res.render('profile', {
                user: req.user,
                errors: ['The biography field cant be blank!'],
                success: []
            })
        }
    });


    /**
     * Handles updating a users profile picture
     */
    app.post('/update/photo', [upload.single('avatar'), Auth.defend], (req, res) => {
        //todo update profile_picture in the database
        res.json({file: req.file})
    });

    /**
     * Handles logging a user out
     */
    app.get('/logout', Auth.defend, (req, res) => {
        req.logout();
        res.redirect('/');
    });
};
