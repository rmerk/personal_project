var express = require('express');
var router = express.Router();
var blogschema = require('../models/blogschema');

router.get('/getPosts', function(req,res,next){
   blogschema.find({}, function(err, blogposts){
      if(err) throw err;
      res.json(blogposts);
   });
});

router.get('/getPostById/:id', function(req,res,next){
   blogschema.findOne({_id:req.params.id}, function(err, blogpost){
      if(err) throw err;
      res.render('blogpost', {title: blogpost.title, author: blogpost.creator, created: blogpost.created, content: blogpost.content});
   });
});

router.post('/addPost', function(req,res,next){
   var blogpost = new blogschema();
   blogpost.title = req.body.title;
   blogpost.description = req.body.description;
   blogpost.content = req.body.content;
   blogpost.creator = req.user.username;

   blogpost.save(function(){
      res.send(200);
   });

});

module.exports = router;
