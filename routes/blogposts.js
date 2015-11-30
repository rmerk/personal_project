var express = require('express');
var router = express.Router();
var blogschema = require('../models/blogschema');

//grabs all blogposts and sorts them by newest first.
router.get('/getPosts', function(req,res,next){
   blogschema.find({}, function(err, blogposts){
      if(err) throw err;
      res.json(blogposts);
   }).sort({created: -1});
});

//grabs blogposts and skips the first five newest entries.
router.get('/getArchives', function(req,res,next){
   blogschema.find({}, function(err, blogposts){
      if(err) throw err;
      res.json(blogposts);
   }).sort({created: -1}).skip(5);
});

//Grabs blogpost by id from mongo
router.get('/getPostById/:id', function(req,res,next){
   blogschema.findOne({_id:req.params.id}, function(err, blogpost){
      if(err) throw err;
      res.render('blogpost', {title: blogpost.title, author: blogpost.creator, created: blogpost.created, content: blogpost.content});
   });
});

//Adds a blogpost to mongo
router.post('/addPost', function(req,res,next){
   var blogpost = new blogschema();
   blogpost.title = req.body.title;
   blogpost.description = req.body.description;
   blogpost.content = req.body.content;
   blogpost.creator = req.user.username;

   blogpost.save(function(err,blogpost){
      if(err) return console.error(err);
      res.sendStatus(200);
   });

});

module.exports = router;
