const prisma = require('../utils/prisma')
const { getErrorCode } = require('../utils/errorCode')

const queryAllUsers = async () => {

    try {
        const users = await prisma.user.findMany({
            include: { profile: true }
        })
        return { status: 200, data: { users } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "user");
    }

}
const queryUserById = async (id) => {

    try {
        const user = await prisma.user.findUnique({
            where: {
                id: Number(id)
            },
            include: { profile: true }
        });
        return { status: 200, data: { user } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "user");
    }

}
const createUserWithProfile = async (user) => {

    const { username, email, password, firstName, lastName, age, pictureUrl } = user;

    try {
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password,
                profile: {
                    create: {
                        firstName,
                        lastName,
                        age,
                        pictureUrl
                    }
                }
            },
            include: {
                profile: true
            }
        })
        return { status: 201, data: { user } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "user");
    }

}
const updateUserById = async (id, user) => {
    const { username, email, password, firstName, lastName, age, pictureUrl } = user;
    try {
        const user = await prisma.user.update(
            {
                where: { id: Number(id) },
                data: {
                    username,
                    email,
                    password,
                    profile: {
                        update: {
                            firstName,
                            lastName,
                            age,
                            pictureUrl
                        }
                    }
                },
                include: { profile: true }
            })
        return { status: 201, data: { user } }

    } catch (error) {
        console.log({ error });
        return getErrorCode(error, "user");
    }
}
const deleteUserById = async(id)=>{
    try{

        const user = await prisma.user.delete({
            where: { id: Number(id) },
            include: { profile: true }
        });
        return { status: 201, data: { user } }

    }catch (error) {
        console.log({ error });
        return getErrorCode(error, "user");
    }
    
}
module.exports = {
    queryAllUsers,
    queryUserById,
    createUserWithProfile,
    updateUserById,
    deleteUserById
}