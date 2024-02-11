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

 
// Routes for Allowance
router.post('/add_allowance', controller.addAllowance);
router.get('/get_allowances', controller.getAllAllowances);
router.put('/edit_allowance/:id', controller.editAllowance);
router.delete('/delete_allowance/:id', controller.deleteAllowance);

// Routes for Basic Salary
router.post('/add_basic_salary', controller.addBasicSalary);
router.get('/get_basic_salaries', controller.getAllBasicSalaries);
router.put('/edit_basic_salary/:id', controller.editBasicSalary);
router.delete('/delete_basic_salary/:id', controller.deleteBasicSalary);

//Routes for Deductions
router.post('/add_deduction', controller.addDeduction);
router.get('/get_deductions', controller.getAllDeductions);
router.put('/edit_deduction/:id', controller.editDeduction);
router.delete('/delete_deduction/:id', controller.deleteDeduction);

router.get('/payslip/:id', controller.generatePayslip);
 
module.exports = router;