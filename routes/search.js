const express = require("express");
const Post = require("../models/post");
const User = require("../models/user");

const router = express.Router();

router.get("", (req, res, next) => {
    const searchText = req.query.search;
    const filter = req.query.filter;
    if (!filter) {
        filter = "title";
    }
    // perform Search in database

    const postQuery = Post.find({ title: {'$regex': `/${searchText}/i`}, publicationType: {'$regex': `/${filter}/i`}});
    let fetchedPosts;
    postQuery
        .then(documents => {
            fetchedPosts = documents;
            return Post.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: fetchedPosts,
                maxPosts: count
            });
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Fetching posts failed!"
            });
        });

});


module.exports = router;