const jwt = require('jsonwebtoken');

// Function to generate a JWT
const generateToken = (userId) => {
  const payload = { id: userId };
  const secret = 'your_jwt_secret';
  const options = { expiresIn: '1h' };
  return jwt.sign(payload, secret, options);
};

// Example function for user login
const loginUser = (req, res) => {
  const { username, password } = req.body;
  // Validate user credentials (pseudo-code)
  const user = validateUser(username, password);
  
  if (user) {
    const token = generateToken(user.id);
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

module.exports = { loginUser };