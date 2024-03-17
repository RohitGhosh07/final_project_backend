const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to parse JSON
router.use(express.json());

// POST route to create new users from an array of objects
router.post('/', async (req, res) => {
    try {
        const usersData = req.body;

        // Ensure the received data is an array
        if (!Array.isArray(usersData)) {
            return res.status(400).json({ error: 'Invalid data format. Expected an array.' });
        }

        // Array to store newly created users
        const createdUsers = [];

        // Iterate over each object in the array
        for (const userData of usersData) {
            // Create a new user instance using the User model
            const newUser = new User(userData);

            // Save the user to the database
            const savedUser = await newUser.save();

            // Push the saved user to the createdUsers array
            createdUsers.push(savedUser);
        }

        // Respond with the array of created users
        res.status(200).json(createdUsers);
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({ error: error.message });
        }
        
        // Handle any other errors
        console.error('Error creating users:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// GET route to fetch all users
router.get('/dataset', async (req, res) => {
    try {
        // Fetch all users from the database, excluding _id and __v fields
        const allUsers = await User.find().select('-_id -__v');

        // Respond with the fetched users
        res.status(200).json(allUsers);
    } catch (error) {
        // Handle any errors that occur during the process
        console.error('Error fetching users:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
