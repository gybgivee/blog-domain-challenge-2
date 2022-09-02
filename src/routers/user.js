const express = require("express");
const { 
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require("../controllers/user");

const {
    getPostByUserId,
    createPost,
    updatePost,
    deletePost
} = require("../controllers/post");

const router = express.Router();

router.get("/:userId/posts",getPostByUserId);
router.post("/:userId/posts",createPost);
router.put("/:userId/posts/:postId",updatePost);
router.delete("/:userId/posts/:postId",deletePost);

router.get("",getAllUsers);
router.get("/:id",getUserById);
router.post("",createUser);
router.put("/:id",updateUser);
router.delete("/:id",deleteUser);

module.exports = router;
