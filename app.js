var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var sass = require('node-sass');
var sassMiddleware = require('node-sass-middleware');
var flash = require('connect-flash');
var routes = require('./routes/index');
var register = require('./routes/register');
var blogposts = require('./routes/blogposts');

//requires for login
var passport = require('passport');
var session = require('express-session');
var localStrat = require('passport-local').Strategy;

//require for models
var User = require('./models/user');

var app = express();

//Setting up mongodb
var mongoURI = 'mongodb://ryanm:nelson12@ds049624.mongolab.com:49624/personal_blog';
var MongoDB = mongoose.connect(mongoURI).connection;

MongoDB.once('open', function(){
  console.log("You're connected to mongo man!");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//passport setup
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 60000, secure: false }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err,user){
        if(err) done(err);
        done(null,user);
    });
});

passport.use('local', new localStrat({
        passReqToCallback : true,
        usernameField: 'username'
    },
    function(req, username, password, done){
        User.findOne({ username: username}, function(err, user) {
            if (err) throw err;
            if (!user)
                return done(null, false, req.flash('loginMessage', 'Incorrect username and password.'));

            // test a matching password
            user.comparePassword(password, function(err, isMatch) {
                if (err) throw err;
                if(isMatch)
                    return done(null, user);
                else
                    done(null, false, req.flash('loginMessage', 'Incorrect username and password.'));
            });
        });
    }));

//adding the sass middleware
app.use(
    sassMiddleware({
      src: __dirname + '/sass',
      dest: __dirname + '/public',
      debug: true
    })
);

app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', routes);
app.use('/register', register);
app.use('/blogPosts', blogposts);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
