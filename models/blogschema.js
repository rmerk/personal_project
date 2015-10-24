/**
 * Created by m3rkz0r on 10/23/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String,
    description: String,
    date: Date,
    content: String
});

var BlogPosts = mongoose.model('BlogPosts', blogSchema);
module.exports = BlogPosts;