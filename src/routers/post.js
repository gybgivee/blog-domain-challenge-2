const express = require("express");
const { 
    getAllPosts, 
    getPostById, 
} = require("../controllers/post");
const {
    createComment, 
    createReplies,
    getAllComments,
    updateComment,
    deleteComment
} = require("../controllers/comment");

const router = express.Router();
router.get("", getAllPosts);
router.get("/:id", getPostById);
router.post("/:postId/comments",createComment);
router.get("/:postId/comments",getAllComments);
router.post("/:postId/comments/:commentId",createReplies);
router.put("/:postId/comments/:commentId",updateComment);
router.delete("/:postId/comments/:commentId",deleteComment);
//December 17, 1995 03:24:00
module.exports = router;