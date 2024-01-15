const mongoose = require("mongoose");
const User = require("./User");
const Blog = require("./Blog");
const Comment = require("./Comment");

const tagSchema = new mongoose.Schema({
    catogoryName: String,
    Catogory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }]
}, { timestamps });

module.exports = mongoose.model("Tag", tagSchema);