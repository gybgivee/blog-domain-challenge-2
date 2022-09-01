const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seed() {
    const user = await createUser();
    const posts_1 = await createPost(user.id);
    const comment = await createComment(user.id, posts_1.id);
    const replies = await createReplies(user.id, comment.id,posts_1.id);
    const posts_2 = await createSecondPost(user.id);
    const category = await createCategory([posts_1.id, posts_2.id]);

    process.exit(0);

}
async function createUser() {
    const user = await prisma.user.create({
        data: {
            username: "alica",
            email: "alica@gmail.com",
            password: "123456",
            profile: {
                create: {
                    firstName: "alica",
                    lastName: "Uniawa",
                    age: 25,
                    pictureUrl: "https://unsplash.com/photos/iEEBWgY_6lA"
                }
            }
        }
    });
    console.log({ user });
    return user;
}
//comment cannot exist without post
async function createComment(userId, postId) {
    const comments = await prisma.comment.create({
        data: {
            content: "What's your stack",
            userId,
            postId
        }
    });
    console.log({ comments });
    return comments;
}
async function createReplies(userId, parentId,postId) {
    const replies = await prisma.comment.create({
        data: {
            content: "Js and SQL are my best choices",
            user: {
                connect: {
                    id: userId
                }
            },
            parent: {
                connect: {
                    id: parentId
                }
            },
            post:{
                connect:{
                    id: postId
                }
            }
        }
    });
    console.log({ replies });
    return replies;
}
async function createPost(userId) {
    const post = await prisma.post.create({
        data: {
            title: "Let's talk about coding",
            content: "frontend, backend or fullstack?",
            imageUrl: "https://unsplash.com/photos/OqtafYT5kTw",
            userId,
            comments: {
                create: [
                    { content: "frontend is ok,but backend is better", userId, parentId: null },
                    { content: "No,I like frontend better is tactile", userId, parentId: 1 }
                ]
            }
        }
    });
    console.log({ post });
    return post;
}
async function createSecondPost(userId) {
    const post = await prisma.post.create({
        data: {
            title: "What your favourite operating system",
            content: "macOs vs windows or Linux",
            imageUrl: "https://unsplash.com/photos/OqtafYT5kTw",
            userId,
            comments: {
                create: [
                    { content: "I am apple fan,so I'll go for macOs", userId, parentId: null },
                    { content: "windows, just like the simplicity", userId, parentId: 1 }
                ]
            }
        }
    });
    console.log({ post });
    return post;
}
async function createCategory(postsId){

    const category = await prisma.category.create({
        data:{
           name:"coding",
           posts:
             postsId?.map(post=>({connect:{id: post}}))[0]|| [],
           
        }
    });
    console.log({category});
    return category;
}
seed()
    .catch(async e => {
        console.error(e);
        await prisma.$disconnect();
    })
    .finally(() => process.exit(1));