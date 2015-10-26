var express = require('express');
var router = express.Router();
var blogschema = require('../models/blogschema.js');

router.get('/getPosts', function(req,res,next){
   blogschema.find({}, function(err, blogposts){
      if(err) throw err;
      res.json(blogposts);
   });
});

router.get('/getPostById/:id', function(req,res,next){
   blogschema.find({_id:req.params.id}, function(err, blogposts){
      if(err) throw err;
      res.json(blogposts);
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
   console.log('created');

});

module.exports = router;
