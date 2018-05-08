//Very important that we configure our environmental variables here
//so they are loaded with process.env.ENVIRONMENTAL_VAR_NAME
require('dotenv').config();
const express = require('express');
const path = require('path');
const chalk = require('chalk');
const http = require('http');
const _ = require('lodash');
const io = require('socket.io');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || '3000';
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require("express-session");
const cors = require('cors');
const Auth = require('./routes/gateway');
const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
let {users, alerts} = require('./models');
let WebsocketAPI = require('./src/emit');
let emit = new WebsocketAPI();

const index = require('./routes/index');
const userController = require('./routes/usersController');
const alertController = require('./routes/alertController');
const apiController = require('./routes/apiController');

const app = express();

// view engine setup
app.set('port', port);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({ secret: process.env.EXPRESS_SESSION_SECRET, resave: true, saveUninitialized: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Handles the authentication portion of a user
 * - Finds the user from the database
 * - Validates they exist
 * - Validates the users password matches the hash in the DB
 * - tell passport (done(null, user)) when everything checks out
 */
passport.use(new LocalStrategy(function(username, password, done) {
    users.all({where: {username} ,include: [{model: alerts}]}).spread(user => {

        if (!user) {
            console.log("No User found");
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!users.validPassword(password, user.password)) {
            console.log("Invalid user password");
            return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
    }).catch(err => {
        console.log("Error", err);
        done(null, false, { message: 'Incorrect credentials'})
    });
    }
));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    console.log("Passport Deserialize -> ", id);
    users.findById(id).then(user => done(null, user));
});

/**
 * Routes for the pages and handling users logging in
 */
app.post('/deserialize', Auth.deserializePost, (req, res) => res.json(req.tokenUser));
app.post('/auth', [passport.authenticate('local', { failureRedirect: '/auth' }), Auth.serialize], (req, res) => {
    console.log(req.user);
    res.status(200).json({token: req.token})
});
app.use('/', index);
app.use('/api/v1', apiController);

userController.set(app);
alertController.set(app);

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

