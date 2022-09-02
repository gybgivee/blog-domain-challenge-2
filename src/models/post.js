const prisma = require('../utils/prisma')
const { getErrorCode } = require('../utils/errorCode');
const { PrismaClient } = require('@prisma/client');
const { post } = require('../server');

const queryPostByUserId = async (userId) => {
    try {
        const posts = await prisma.post.findMany({
            where: {
                userId: Number(userId),
            },
            include: {
                comments: true,
                categories: true,
                user: {
                    include: {
                        profile: true
                    }
                }
            }
        });
        return { status: 200, data: { posts } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "post");
    }
}
const queryAllpost = async () => {

    try {
        const posts = await prisma.post.findMany({
            include: {
                comments: true,
                categories: true,
            }
        })
        return { status: 200, data: { posts } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "post");
    }

}
const queryPostById = async (id) => {

    try {
        const post = await prisma.post.findUnique({
            where: {
                id: Number(id)
            },
            include: {
                comments: true,
                categories: true,
            }
        });
        return { status: 200, data: { post } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "post");
    }

}
const createPostWithCategories = async (posts, userId) => {

    const { title, content, imageUrl, publishedAt, categories } = posts;

    try {
        const post = await prisma.post.create({
            data: {
                title,
                content,
                imageUrl,
                publishedAt: new Date(publishedAt),
                categories: {
                    create: [
                        categories?.map((category) => ({ name: category.name }))[0] || [],
                    ]
                },
                user: {
                    connect: {
                        id: Number(userId)
                    }
                }
            },
            include: {
                comments: true,
                categories: true,
            }
        })
        return { status: 201, data: { post } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "post");
    }

}
const updateQuery = async (posts, userId, postId) => {
    const { title, content, imageUrl, publishedAt, categories } = posts;

    const post = await prisma.post.update({
        where: { id: Number(postId) },
        data: {
            title,
            content,
            imageUrl,
            publishedAt: new Date(publishedAt),
            user: {
                connect: {
                    id: Number(userId)
                }
            }
        },
        include: {
            comments: true,
            categories: true,
        }
    });
    return post;
}
const upsertQuery = async (posts, userId, postId) => {
    const { title, content, imageUrl, publishedAt, categories } = posts;
    const mappedCategories = categories?.map((category) => {
        return (
            {
                create: {
                    name: category.name,
                },
                where: {
                    name:  category.name,
                }
            });
    });
    const post = await prisma.post.upsert({
        where: { id: Number(postId) },
        create: {
            title,
            content,
            imageUrl,
            publishedAt: new Date(publishedAt),
            user: {
                connect: {
                    id: Number(userId)
                }
            },
            categories: {
                connectOrCreate: mappedCategories
            }
        },
        update: {
            title,
            content,
            imageUrl,
            publishedAt: new Date(publishedAt),
            user: {
                connect: {
                    id: Number(userId)
                }
            },
            categories: {
                connectOrCreate: mappedCategories
            }
        },
        include: {
            comments: true,
            categories: true,
        }
    });
    return post;
}
const updatePostWithCategories = async (posts, userId, postId) => {
    try {

        if (posts.categories) {
            return await upsertQuery(posts, userId, postId);
        } else {
            return await updateQuery(posts, userId, postId)
        }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "post");
    }

}
const deletePostById = async(userId,postId)=>{
    try{
        const post = await prisma.post.delete({
            where: { 
                id: Number(postId)
            },
            include: {
                comments: true,
                categories: true,
            }
        });
        return { status: 201, data: { post } }

    }catch (error) {
        console.log({ error });
        return getErrorCode(error, "post");
    }
    
}
module.exports = {
    queryPostByUserId,
    queryAllpost,
    queryPostById,
    createPostWithCategories,
    updatePostWithCategories,
    deletePostById
}