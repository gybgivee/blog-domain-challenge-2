const { prisma } = require("@prisma/client");
const {

    createCommentWithPost, 
    createRepliesWithComment,
    queryAllComments,
    updateCommentById,
    deleteCommentById

} = require("../models/comment");

const getAllComments = async (req, res) => {
    const { postId } = req.params;
    const { status, data } = await queryAllComments(postId);
    return res.status(status).json(data);

}
const createComment = async (req, res) => {

    const { postId } = req.params;
    const { content, userId } = req.body;4

    if (!content || userId === null || undefined) {
        return res.status(400).json({ error: "Missing fields in request body" });
    }

    const { status, data } = await createCommentWithPost(req.body, postId);
    return res.status(status).json(data);
}
const createReplies = async (req, res) => {

    const { postId,commentId } = req.params;
    const { content, userId } = req.body;

    if (!content || userId === null || undefined) {
        return res.status(400).json({ error: "Missing fields in request body" });
    }

    const { status, data } = await createRepliesWithComment(req.body, postId,commentId);
    return res.status(status).json(data);
}
const updateComment = async (req, res) => {

    const { postId,commentId } = req.params;
    const { content, userId } = req.body;

    if (!content || userId === null || undefined) {
        return res.status(400).json({ error: "Missing fields in request body" });
    }

    const { status, data } = await updateCommentById(req.body, postId,commentId);
    return res.status(status).json(data);
}
const deleteComment = async (req, res) => {

    const { postId,commentId } = req.params;
    const { status, data } = await deleteCommentById(commentId);
    return res.status(status).json(data);

}


module.exports = {
    createComment,
    createReplies,
    getAllComments,
    updateComment,
    deleteComment
}