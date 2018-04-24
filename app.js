//Very important that we configure our environmental variables here
//so they are loaded with process.env.ENVIRONMENTAL_VAR_NAME
require('dotenv').config();
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const http = require('http');
const _ = require('lodash');
const io = require('socket.io');
const port = process.env.PORT || '3000';
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require("express-session");
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
let {users, alerts} = require('./models');
let WebsocketAPI = require('./src/emit');
let emit = new WebsocketAPI();

const index = require('./routes/index');
const controller = require('./routes/usersController');

const app = express();

// view engine setup
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(session({ secret: process.env.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: false }));

//We initialize our passport sessions here
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());

//Very important to serve all the files in the public directly statically!
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Handles the authentication portion of a user
 * - Finds the user from the database
 * - Validates they exist
 * - Validates the users password matches the hash in the DB
 * - tell passport (done(null, user)) when everything checks out
 */
passport.use(new LocalStrategy(function(username, password, done) {
    users.all({where: {username: 'Foo'} ,include: [{model: alerts}]}).then(user => {

        //We do this because user is an array by default but it should only return 1 element
         user = user[0];

        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!users.validPassword(password, user.password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }).catch(err => {
        done(null, false, { message: 'Incorrect credentials'})
    });
    }
));

//Serializes a user to the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

//Deserializes a user from the session
passport.deserializeUser(function(id, done) {
    users.all({where: {id} ,include: [{model: alerts}]}).then(user => {
        user = user[0];
       done(null, user);
    });
});

/**
 * Routes for the pages and handling users logging in
 */
app.use('/', index);
app.post('/login', passport.authenticate('local', {successRedirect:'/dashboard', failureRedirect: '/login?error=true'}), (req, res) => res.redirect('/dashboard'));
controller.set(app, emit);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

let server = http.createServer(app);
server.listen(port);

server.on('listening', () => {
    let addr = server.address();
    let bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(chalk.blue(`-----------------------------`));
    console.log(chalk.blue(`Server Listening on ${bind}`));
    console.log(chalk.blue(`-----------------------------`));
});

io(server).on('connection', (socket) => {
    console.log(chalk.green('Client connected to websocket. \u2713'));
    emit.addClient(socket);


    socket.on('add-user', () => {
        emit.addClient(socket);
    });

    socket.on('remove-user', () => {
        let index = _.findIndex(emit.getClients(), o => {
            return o.id === socket.id
        });

        console.log(chalk.red('Client Disconnected to websocket. ❌'));

        emit.removeClient(index)
    });
});

