const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: '../.env'}); // Load environment variables from .env file

const JWT_SECRET = process.env.JWT_SECRET; // Use the JWT secret from the .env file
console.log('JWT secret:', JWT_SECRET);
// Simulate a user signup process
async function signup(password) {
  try {
    // Hash the plain text password with a salt factor of 10
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log('Hashed password during signup:', hashedPassword);

    // Simulate storing the hashed password in the database
    return hashedPassword;
  } catch (err) {
    console.error('Error during signup:', err);
  }
}

// Simulate a user login process
async function login(password, hashedPasswordFromDb) {
  try {
    // Compare the plain text password with the hashed password from the database
    const passwordMatch = await bcrypt.compare(password, hashedPasswordFromDb);
    console.log('Password hashedPasswordFromDb:', hashedPasswordFromDb);
    console.log('Password plain:', password);
    console.log('Password match during login:', passwordMatch);

    if (passwordMatch) {
      // Generate a JWT token upon successful password match
      const token = jwt.sign({ userId: 1 }, JWT_SECRET, { expiresIn: '1h' });
      console.log('Generated JWT token:', token);

      // Verify the token
      const decoded = jwt.verify(token, JWT_SECRET);
      console.log('Decoded JWT token:', decoded);

      return token;
    } else {
      console.log('Invalid credentials');
    }
  } catch (err) {
    console.error('Error during login:', err);
  }
}

// Simulate the signup process
const plainTextPassword = 'gabo1234';
signup(plainTextPassword).then(hashedPassword => {
  // Simulate the login process with the stored hashed password
  //login(plainTextPassword, hashedPassword);
  login(plainTextPassword, hashedPassword);
});
manual = '$2b$10$RCl71hOAWUsvctdkxECK1.pbnjBCUdGSlSOV8m2eZnxHTFE/h.pRa'
manualtext = 'gabo1234'