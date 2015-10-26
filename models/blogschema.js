/**
 * Created by m3rkz0r on 10/23/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({

    //Trim removes whitespace before stored in mongo.
    title: {
        type: String,
        default: '',
        trim: true,
        required: 'Title cannot be blank'
    },

    description: String,

    //This is a date field that represents the time at which the article was created
    created: {
        type: Date,
        default: Date.now
    },

    //Article content
    content: {
        type: String,
        default: '',
        trim: true,
        required: 'Content cannot be blank'
    },

    //Represents the user that created the article, based on passport login.
    creator: {
        type: String
    }
});

var BlogFields = mongoose.model('BlogPosts', blogSchema);
module.exports = BlogFields;