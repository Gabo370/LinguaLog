require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const diaryRoutes = require('./routes/diaryRoutes'); //might need to delete this
const diaryEntryRoutes = require('./routes/diaryEntryRoutes');
const commentRoutes = require('./routes/commentRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());

app.use(bodyParser.json());
//app.use('/diary', diaryRoutes);
app.use('/api/diaryEntries', diaryEntryRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Basic route for home page
app.get('/', (req, res) => {
  res.send('Welcome to the LinguaLog Backend!');
});

// Placeholder route for user login
app.post('/login', (req, res) => {
  // Authentication logic here
  res.status(200).send("Login successful");
});

// Placeholder route for user registration
app.post('/register', (req, res) => {
  // Registration logic here
  res.status(201).send("Registration successful");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
// Start the server
// if (require.main === module) {
  // Only listen when file is run directly, not when imported
  app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
  });
// }

module.exports = app;