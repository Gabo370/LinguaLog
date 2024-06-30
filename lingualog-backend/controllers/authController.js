const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Make sure this path is correct

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);
    console.log("Plain Password:", password);
    console.log("User model:", User);
    console.log("Email:", email)
    console.log("Username:", username)
    console.log("User.create:", User.create);
    const newUser = await User.create({
      username,
      password,
      email
    });

    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    console.log("Password match:", passwordMatch);
      

    res.status(201).send({ message: 'User created successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).send({ message: 'Error creating user', error: error.message });
  }
};


exports.login = async (req, res) => {
    try {
      console.log("Login request received");
      const { username, password } = req.body;
      const user = await User.findOne({ where: { username } });
      console.log('Making sure it even gets this far')
      console.log(process.env.JWT_SECRET)
      if (!user) {
        console.log('User not found');
        return res.status(401).send('Invalid credentials');
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
      manual = '$2b$10$RCl71hOAWUsvctdkxECK1.pbnjBCUdGSlSOV8m2eZnxHTFE/h.pRa'
      manualtext = 'gabo1234'
      const passwordMatch2 = await bcrypt.compare(manualtext, manual);
      console.log(passwordMatch2)
      console.log("Password from request:", password);
      console.log("Hash from database:", user.password);
      console.log("Password match:", passwordMatch);
  
      if (passwordMatch) {
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ 
          message: "Login successful", 
          token,
          username
          
          // user.username: { id: user.id, username: user.username } // Include user details in response
          
        });
        //res.status(401).send('Invalid credentials');
      }
    } catch (error) {
      console.error('Login Error:', error);
      res.status(500).send({ message: 'Login error', error: error.message });
    }
  };