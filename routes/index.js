var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */

//router.get('/:name', function (req, res)
//{ var name = req.params.name;
//    res.render(name);
//});

router.get('/admin', isLoggedIn, function(req, res, next) {
    res.render('admin',{
        user : req.user
    });
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ryan Merchlewitz Home Page' });
});

router.get('/home', function(req, res, next) {
    res.render('home', { title: 'Ryan Merchlewitz Home Page' });
});

router.get('/archives', function(req, res, next) {
    res.render('archives', { title: 'Ryan Merchlewitz Archives Page' });
});

router.get('/about', function(req, res, next) {
    res.render('about', { title: 'Ryan Merchlewitz About Page' });
});

router.get('/portfolio', function(req, res, next) {
    res.render('portfolio', { title: 'Ryan Merchlewitz Portfolio Page' });
});


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.post('/login', function(req,res,next){
    console.log(req.body);

    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err); // will generate a 500 error
        }
        if (! user) {
            return res.send({ success : false, message : 'authentication failed' });
        }
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.send({ success : true, message : 'authentication succeeded' });
        });
    })(req, res, next);
});


// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}


module.exports = router;
