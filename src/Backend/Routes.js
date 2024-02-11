// backend/routes/routes.js
const express = require('express');
const router = express.Router();
const controller = require('./Controller');
 
 
router.post('/add_employee', controller.addEmployee);
router.get('/get_employees', controller.getAllEmployees);
router.put('/edit_employee/:id', controller.editEmployee);
router.get('/get_employee/:id', controller.getEmployeeById);
router.delete('/delete_employee/:id', controller.deleteEmployee);
router.get('/search_employee/:query', controller.searchEmployee);
router.post('/add_job', controller.addJob);
router.get('/get_jobs', controller.getAllJobs);

 
 
module.exports = router;