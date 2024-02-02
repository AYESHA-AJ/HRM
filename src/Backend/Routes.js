// backend/routes/routes.js
const express = require('express');
const router = express.Router();
const controller = require('./Controller');


router.post('/add_employee', controller.addEmployee);

module.exports = router;
