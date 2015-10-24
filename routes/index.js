var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */

//router.get('/:name', function (req, res)
//{ var name = req.params.name;
//    res.render(name);
//});

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('profile',{
        user : req.user
    });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ryan Merchlewitz Home Page' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Ryan Merchlewitz Home Page' });
});

router.post('/',
    passport.authenticate('local',{
        successRedirect: '/profile',
        failureRedirect: '/'
    })
);


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;