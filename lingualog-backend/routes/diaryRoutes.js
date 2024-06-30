// routes/diaryRoutes.js
const express = require('express');
const router = express.Router();
const { checkGrammar } = require('../services/grammarlyService');

router.post('/submit', async (req, res) => {
  try {
    const feedback = await checkGrammar(req.body.text);
    res.json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to check grammar', error: error.message });
  }
});

module.exports = router;