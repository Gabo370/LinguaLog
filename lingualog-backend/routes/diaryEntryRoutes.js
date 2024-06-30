// routes/diaryEntryRoutes.js

const express = require('express');
const router = express.Router();
const diaryEntryController = require('../controllers/diaryEntryController');

router.use((req, res, next) => {
    console.log(`Incoming request for ${req.originalUrl}`);
    next();
});


// Your routes follow here...

router.post('/', diaryEntryController.createDiaryEntry);
router.get('/', diaryEntryController.getAllDiaryEntries);
router.get('/:id', diaryEntryController.getDiaryEntryById);
router.put('/:id', diaryEntryController.updateDiaryEntry);
router.delete('/:id', diaryEntryController.deleteDiaryEntry);
router.get('/by-user/:username', diaryEntryController.getEntriesByUsername);

module.exports = router;