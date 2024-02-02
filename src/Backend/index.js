// backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Routes'); // Corrected path to routes

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your frontend's URL
    credentials: true,  // Include credentials (e.g., cookies) in the requests
  }));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Employee_DB', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
