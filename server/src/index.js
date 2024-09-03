const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(cors())
require('dotenv').config();

app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const populateData = async () => {
  const samplePeople = [
    { name: 'Alice', gender: 'Female', age: 30 },
    { name: 'Bob', gender: 'Male', age: 25 },
    { name: 'Charlie', gender: 'Male', age: 35 },
    { name: 'David', gender: 'Boy', age: 17 },
    { name: 'Ellie', gender: 'Girl', age: 14 },
  ];

  try {
    await Person.insertMany(samplePeople);
    console.log('Sample data populated');
  } catch (error) {
    console.error('Error populating data:', error);
  }
};
// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Define a schema and model
const personSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: Number,
});

const Person = mongoose.model('Person', personSchema);

// Middleware for JWT verification
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) return res.sendStatus(403);
    req.userId = decoded.id;
    next();
  });
};

/**
 * @swagger
 * /api/people:
 *   get:
 *     summary: Retrieve a list of people
 *     responses:
 *       200:
 *         description: A list of people
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Person'
 *   post:
 *     summary: Add a new person
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Person'
 *     responses:
 *       201:
 *         description: Person created
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Person:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         gender:
 *           type: string
 *         age:
 *           type: integer
 */

app.get('/', async(req, res) => {
    res.send("Working ok!")
})

// GET request to fetch people details
app.get('/api/people', async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data' });
  }
});

app.put('/people', async (req, res) => {
  const { gender, count } = req.body;

  try {
    const result = await Person.findOneAndUpdate(
      { gender: gender }, 
      { $set: { count: count } },
      { new: true } 
    );

    if (result) {
      res.status(200).json({ message: 'Count updated successfully', person: result });
    } else {
      res.status(404).json({ message: 'Gender not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// POST request to update person details
app.post('/api/people', async (req, res) => {
  try {
    const person = new Person(req.body);
    await person.save();
    res.status(201).json(person);
  } catch (error) {
    res.status(400).json({ message: 'Error saving data' });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});