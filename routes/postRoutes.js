const express = require("express")

const postController = require("../controllers/postController")

const router = express.Router()

//localhost:3000/
// GET http://localhost:4000/api/v1/posts
router.route("/")
    .get(postController.getAllPosts)
    .post(postController.createPost)

// GET http://localhost:4000/api/v1/posts/619f0a92e4cf3a2a760e585a
router.route("/:id")
    .get(postController.getOnePost)
    .patch(postController.updatePost)
    .delete(postController.deletePost);

module.exports = router;

    