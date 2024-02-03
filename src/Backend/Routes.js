// backend/routes/routes.js
const express = require('express');
const router = express.Router();
const controller = require('./Controller');


router.post('/add_employee', controller.addEmployee);
router.get('/get_employees', controller.getAllEmployees);

module.exports = router;
