const express = require("express");
const { 
    getAllPosts, 
    getPostById, 
} = require("../controllers/post");

const router = express.Router();
router.get("", getAllPosts);
router.get("/:id", getPostById);

//December 17, 1995 03:24:00
module.exports = router;