const express = require('express');
const connectDB = require('./utils/db');
const Dataset = require('./routes/DataSetrouting'); 
const cors = require('cors');
const app = express();

// Connect to MongoDB
connectDB();
// Middleware
app.use(express.json());
// Use CORS middleware for this specific route
app.use(cors());
// Routes
app.use('/api/dataset', Dataset);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
