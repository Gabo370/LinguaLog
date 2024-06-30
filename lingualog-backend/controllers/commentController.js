// controllers/commentController.js

const { Comment } = require('../models');

// Create a comment
exports.createComment = async (req, res) => {
    try {
        const { text, userId, diaryEntryId } = req.body;
        const comment = await Comment.create({ text, userId, diaryEntryId });
        res.send(comment);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get all comments
exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.send(comments);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get a single comment by ID
exports.getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findByPk(id);
        if (comment) {
            res.send(comment);
        } else {
            res.status(404).send("Comment not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update a comment
exports.updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;
        const updated = await Comment.update({ text }, {
            where: { id }
        });
        if (updated) {
            const updatedComment = await Comment.findByPk(id);
            res.send(updatedComment);
        } else {
            res.status(404).send("Comment not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Comment.destroy({
            where: { id }
        });
        if (deleted) {
            res.send("Comment deleted");
        } else {
            res.status(404).send("Comment not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};