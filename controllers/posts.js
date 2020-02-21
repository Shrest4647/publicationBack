const Post = require("../models/post");

exports.createPost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  const post = new Post({
    publicationType: req.body.publicationType,
    title: req.body.title,
    department: req.body.department,
    publisher: req.body.publisher,
    placeOfPublication: req.body.placeOfPublication,
    coAuthors: req.body.coAuthors,
    content: req.body.content,
    link: req.body.link,
    attachment: url + "/attachment/" + req.body.attachment,
    author: req.userData.userId
  });
  post
    .save()
    .then(createdPost => {
      res.status(201).json({
        message: "Post added successfully",
        post: {
          ...createdPost,
          id: createdPost._id
        }
      });
    })
    .catch(error => {
      res.status(500).json({
        message: "Creating a post failed!"
      });
    });
};

exports.updatePost = (req, res, next) => {
  const url = req.protocol + "://" + req.get("host");
  imagePath = url + "/images/" + req.file.filename;

  const post = new Post({
    _id: req.body.id,
    publicationType: req.body.publicationType,
    title: req.body.title,
    department: req.body.department,
    publisher: req.body.publisher,
    placeOfPublication: req.body.placeOfPublication,
    coAuthors: req.body.coAuthors,
    content: req.body.content,
    link: req.body.link,
    attachment: url + "/attachment/" + req.body.attachment,
    author: req.userData.userId
  
  });

  Post.updateOne({
      _id: req.params.id,
      author: req.userData.userId
    }, post)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({
          message: "Update successful!"
        });
      } else {
        res.status(401).json({
          message: "Not authorized!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate post!"
      });
    });
};


exports.getPosts = (req, res, next) => {
  const postQuery = Post.find();
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
      res.status(500).json({
        message: "Fetching posts failed!"
      });
    });
};

exports.getPost = (req, res, next) => {
  Post.findById(req.params.id)
    .then(post => {
      if (post) {
        post.views += Number(post.views) + 1;
        Post.updateOne({
          _id: post._id
        }, post);
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "Post not found!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Fetching post failed!"
      });
    });
};

exports.deletePost = (req, res, next) => {
  Post.deleteOne({
      _id: req.params.id,
      author: req.userData.userId
    })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({
          message: "Deletion successful!"
        });
      } else {
        res.status(401).json({
          message: "Not authorized!"
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Deleting posts failed!"
      });
    });
};