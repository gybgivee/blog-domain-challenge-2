const { prisma } = require("@prisma/client");
const {
    queryPostByUserId,
    queryAllpost,
    queryPostById,
    createPostWithCategories,
    updatePostWithCategories,
    deletePostById
} = require("../models/post");

const getPostByUserId = async (req, res) => {
    const { userId } = req.params;
    const { status, data } = await queryPostByUserId(userId);
    return res.status(status).json(data);
}
const getAllPosts = async (req, res) => {
    const { status, data } = await queryAllpost();
    return res.status(status).json(data);
}
const getPostById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await queryPostById(id);
    return res.status(status).json(data);

}
const createPost = async (req, res) => {
    const { userId } = req.params;
    const { title, content, imageUrl, publishedAt, categories } = req.body;
    
    if (!title || !content || !imageUrl || !publishedAt) {
        return res.status(400).json({ error: "Missing fields in request body" });
    }

    const { status, data } = await createPostWithCategories(req.body, userId);
    return res.status(status).json(data);
}
const updatePost = async (req, res) => {
    const { userId, postId } = req.params;
    const { title, content, imageUrl, publishedAt, categories } = req.body;
    
    if (!title || !content || !imageUrl || !publishedAt) {
        return res.status(400).json({ error: "Missing fields in request body" });
    }
    const { status, data } = await updatePostWithCategories(req.body, userId,postId);
    return res.status(status).json(data);

}
const deletePost = async (req, res) => {

    const { userId, postId } = req.params;
    const { status, data } = await deletePostById(userId,postId);
    return res.status(status).json(data);

}

module.exports = {
    getPostByUserId,
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}