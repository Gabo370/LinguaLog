// services/grammarlyService.js
const axios = require('axios');

const checkGrammar = async (text) => {
  try {
    const response = await axios.post('https://api.grammarly.com/check', { text });
    return response.data;
  } catch (error) {
    console.error('Error calling Grammarly API:', error);
    throw error;
  }
};

module.exports = { checkGrammar };