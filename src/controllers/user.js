const { prisma } = require("@prisma/client");
const {
    queryAllUsers,
    queryUserById,
    createUserWithProfile,
    updateUserById,
    deleteUserById
} = require("../models/user")

const { USER, PROFILE } = require("../utils/collections");

const getAllUsers = async (req, res) => {

    const { status, data } = await queryAllUsers();
    return res.status(status).json(data);

}
const getUserById = async (req, res) => {
    const { id } = req.params;
    const { status, data } = await queryUserById(id);
    return res.status(status).json(data);

}
const createUser = async (req, res) => {

    const { username, email, password, firstName, lastName, age, pictureUrl } = req.body;

    if (!username || !email || !password || !firstName || !lastName || !pictureUrl || age === null || undefined) {
        return res.status(400).json({ error: "Missing fields in request body" });
    }

    const { status, data } = await createUserWithProfile(req.body);
    return res.status(status).json(data);
}
const updateUser = async (req, res) => {

    const { id } = req.params;
    const { username, email, password, firstName, lastName, age, pictureUrl } = req.body;

    if (!username || !email || !password || !firstName || !lastName || !pictureUrl || age === null || undefined) {
        return res.status(400).json({ error: "Missing fields in request body" });
    }

    const { status, data } = await updateUserById(id, req.body);
    return res.status(status).json(data);
}
const deleteUser = async (req, res) => {

    const { id } = req.params;
    const { status, data } = await deleteUserById(id);
    return res.status(status).json(data);

}


module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}