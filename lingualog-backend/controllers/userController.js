// controllers/userController.js

const { User } = require('../models');

// Create User
exports.createUser = async (req, res) => {
    console.log(req.body);  // Log to see what data is received
    try {
        const { firstName, lastName, email, username, password } = req.body;
        const user = await User.create({ firstName, lastName, email, username, password });
        res.status(201).send(user);
    } catch (error) {
        console.error("Create User Error:", error);
        res.status(500).send(error.message);
    }
};

// Get All Users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        console.error("Get All Users Error:", error);
        res.status(500).send(error.message);
    }
};

// Get User by ID
exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Get User by ID Error:", error);
        res.status(500).send(error.message);
    }
};

// Update User
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { firstName, lastName, email } = req.body;
        const updated = await User.update({ firstName, lastName, email }, {
            where: { id }
        });
        if (updated[0] > 0) {
            const updatedUser = await User.findByPk(id);
            res.send(updatedUser);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Update User Error:", error);
        res.status(500).send(error.message);
    }
};

// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await User.destroy({
            where: { id }
        });
        if (deleted) {
            res.send("User deleted");
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error("Delete User Error:", error);
        res.status(500).send(error.message);
    }
};