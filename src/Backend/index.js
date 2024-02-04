// backend/server.js or backend/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./Routes');



const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/Employee_Db', { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
