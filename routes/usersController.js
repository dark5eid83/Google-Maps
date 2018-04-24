const Auth = require('./gateway');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const chalk = require('chalk');
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
    dest: 'public/uploads/'
});

//Passes in the express app and emit API
module.exports.set = (app, emit) => {

    app.get('/test', (req, res) => {
       emit.getClients()[0].emit('alert', {
            data: ['some', 'new', 'data']
       });
       res.json({success: true});
    });

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
                //Show a non-logged in user the sign-in page
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
        let filled = true;

        //Check through all the form fields make sure none are empty
        for(let prop in req.body) {
            if(req.body[prop].length === 0) {
                filled = false;
                res.render('register', {
                    errors: [`The Form field: ${prop} was left blank`]
                })
            }
        }

        if(filled) {
            //Check and make sure the the passwords are the same
            if(req.body.password === req.body.confirm) {
                console.log(chalk.green(`Creating User -> ${req.body.username} \u2713`));
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
        }
    });

    /**
     * Handles updating a users password
     */
    app.post('/update/password', Auth.defend, (req, res) => {

        let filled = true;

        //Checking that all the fields were filled out
        for(let prop in req.body) {
            if(req.body[prop].length === 0) {
                filled = false;
                res.render('profile', {
                    user: req.user,
                    errors: [`The Form field: ${prop} was left blank`],
                    success: []
                });
            }
        }

        if(filled) {
            //We check that the passwords are the same
            if(req.body.password === req.body.confirm) {
                console.log(chalk.green(`Updating Users Password \u2713`));
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
        //updates profile_picture in the database
        users.update({
            profile_picture: `http://localhost:3000/uploads/${req.file.filename}`
        }, {where: {id: req.user.id}}).then(() => {
            //Redirect to profile when we are done
            res.redirect('/profile')
        });
    });

    /**
     * Handles logging a user out
     */
    app.get('/logout', Auth.defend, (req, res) => {
        req.logout();
        res.redirect('/');
    });


    /**
     * Handles deleting an account
     */
    app.get('/delete/user', (req, res) => {
        users.destroy({
            where:{
                id: req.user.id
            }
        }).then(() => {
           res.redirect('/logout');
        });
    });
};
