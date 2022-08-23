const mongoose = require('mongoose')
const Schema = mongoose.Schema
const AutoIncrement = require('mongoose-sequence')(mongoose);

const Post = new Schema({
    title: String,
    images: {type: "String", required: true},
    id: Number,
})

Post.plugin(AutoIncrement, {inc_field: 'id'});
const PostModel = mongoose.model('Post', Post);

module.exports = PostModel;