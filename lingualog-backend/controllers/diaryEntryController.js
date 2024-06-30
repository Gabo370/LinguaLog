// controllers/diaryEntryController.js

const { DiaryEntry } = require('../models');


// Create Diary Entry
exports.createDiaryEntry = async (req, res) => {
    try {
        const { title, content, userId, username } = req.body;
        // const user = await User.findByPk(userId);  // Fetch user by ID
        
        // if (!user) {
        //     return res.status(404).send("User not found");
        //  }
        const diaryEntry = await DiaryEntry.create({ title, content, userId, username });
        console.log('is it even goint thru here',DiaryEntry)
        res.send(diaryEntry);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get All Diary Entries
exports.getAllDiaryEntries = async (req, res) => {
    try {
        const diaryEntries = await DiaryEntry.findAll();
        res.send(diaryEntries);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get Diary Entry by ID
exports.getDiaryEntryById = async (req, res) => {
    try {
        console.log('Hello are you at the ID controller')
       
        const { id } = req.params;
        const diaryEntry = await DiaryEntry.findByPk(id);
        if (diaryEntry) {
            res.send(diaryEntry);
        } else {
            res.status(404).send("Diary Entry not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Update Diary Entry
exports.updateDiaryEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updated = await DiaryEntry.update({ title, content }, {
            where: { id }
        });
        if (updated) {
            const updatedDiaryEntry = await DiaryEntry.findByPk(id);
            res.send(updatedDiaryEntry);
        } else {
            res.status(404).send("Diary Entry not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Delete Diary Entry
exports.deleteDiaryEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await DiaryEntry.destroy({
            where: { id }
        });
        if (deleted) {
            res.send("Diary Entry deleted");
        } else {
            res.status(404).send("Diary Entry not found");
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
};

//Get all usernames
exports.getEntriesByUsername = async (req, res) => {
    try {
        console.log('Hello I am inside getEntriesByUsername controller I am')
        const username = req.params.username;
        const entries = await DiaryEntry.findAll({
            where: {
                username: username  // Filter entries by username
            },
            order: [['createdAt', 'DESC']]  // Optional: Orders the entries by creation date
        });
        if (entries.length > 0) {
            res.json(entries);
        } else {
            res.status(404).send('No entries found for this user');
        }
    } catch (error) {
        console.error('Error fetching entries:', error);
        res.status(500).send({ message: 'Error retrieving diary entries', error: error.message });
    }
};