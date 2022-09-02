const prisma = require('../utils/prisma')
const { getErrorCode } = require('../utils/errorCode');
const { PrismaClient } = require('@prisma/client');

const createCommentWithPost = async (comments, postId) => {
    const { userId, content } = comments;

    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                user: {
                    connect: {
                        id: Number(userId)
                    }
                },
                post: {
                    connect: {
                        id: Number(postId)
                    }
                }
            }
        });
        return { status: 201, data: { comment } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "comment");
    }

}
const createRepliesWithComment = async (comments, postId, commentId) => {
    const { userId, content } = comments;
    try {
        const comment = await prisma.comment.create({
            data: {
                content,
                user: {
                    connect: {
                        id: Number(userId)
                    }
                },
                post: {
                    connect: {
                        id: Number(postId)
                    }
                },
                parent: {
                    connect: {
                        id: Number(commentId)
                    }
                }
            }

        });
        return { status: 201, data: { comment } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "comment");
    }

}

const queryAllComments = async (postId) => {

    try {
        const comments = await prisma.comment.findMany({
            where: {
                postId: Number(postId)
            },
            include: { replies: true }
        })
        return { status: 200, data: { comments } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "comment");
    }

}
const updateCommentById = async (comments, postId, commentId) => {
    const { userId, content } = comments;
    try {
        const comment = await prisma.comment.update({
            where: { id: Number(commentId) },
            data: {
                content,
                user: {
                    connect: {
                        id: Number(userId)
                    }
                },
                post: {
                    connect: {
                        id: Number(postId),
                    }
                }

            },
            include: { replies: true }
        });
        return { status: 201, data: { comment } }
    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "comment");
    }

}
const deleteCommentById = async ( commentId) => {
    try {
        const comment = await prisma.comment.delete({
            where: {
                id: Number(commentId)
            },
            include: { replies: true }
        });
        return { status: 201, data: { comment } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "comment");
    }

}
module.exports = {
    createCommentWithPost,
    createRepliesWithComment,
    queryAllComments,
    updateCommentById,
    deleteCommentById
}