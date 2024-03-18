// backend/index.js
const express = require('express');
// const mongoose = require('mongoose');
const cors = require('cors');
const CookieParser = require("cookie-parser")
const routes = require('./routes/Routes'); // Corrected path to routes
const authRoutes = require('./routes/authRoutes')
const dotenv = require('dotenv');
const connectDB = require('./database');

dotenv.config();

const app = express();

app.use(CookieParser("/"))


app.use(cors({
    origin: 'http://localhost:3000',  // Replace with your frontend's URL
    credentials: true,  // Include credentials (e.g., cookies) in the requests
  }));

app.use(express.json());


connectDB()

// mongoose.connect(process.env.MONGOurl, { 
//     // useNewUrlParser: true, useUnifiedTopology: true 
// });



app.use('/api', routes);
app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
