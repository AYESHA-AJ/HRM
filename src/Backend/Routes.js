// backend/routes/routes.js
const express = require('express');
const router = express.Router();
const controller = require('./Controller');


router.post('/add_employee', controller.addEmployee);
router.get('/get_employees', controller.getAllEmployees);
router.put('/edit_employee/:id', controller.editEmployee);
router.get('/get_employee/:id', controller.getEmployeeById);



module.exports = router;
