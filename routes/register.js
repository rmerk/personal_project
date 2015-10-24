/**
 * Created by m3rkz0r on 10/20/15.
 */
var express = require('express');
var router = express.Router();
var Users = require('../models/user');

router.get('/', function(req,res,next){
    res.render('register')
});

//This is for registering users to the server.
router.post('/', function(req,res,next){
    Users.create(req.body, function(err,post){
        if(err)
            next(err);
        else
            res.redirect('/register');
    })
});

module.exports = router;