const bcrypt = require('bcrypt');

// The plaintext password used during signup
const plainTextPassword = 'your_plain_text_password';

// The hashed password stored in the database (replace with the actual hash from your database)
const hashedPasswordFromDb = 'your_hashed_password_from_db';

// Compare the plaintext password with the hashed password
bcrypt.compare(plainTextPassword, hashedPasswordFromDb, (err, result) => {
  if (err) {
    console.error('Error during bcrypt comparison:', err);
  } else {
    console.log('Password match:', result);
  }
});