// backend/routes/routes.js
const express = require('express');
const router = express.Router();
const controller = require('./Controller');

// Employee routes
router.post('/add_employee', controller.addEmployee);
router.get('/get_employees', controller.getAllEmployees);
router.put('/edit_employee/:id', controller.editEmployee);
router.get('/get_employee/:id', controller.getEmployeeById);
router.delete('/delete_employee/:id', controller.deleteEmployee);
router.get('/search_employee/:query', controller.searchEmployee);

// Job routes
router.post('/add_job', controller.addJob);
router.get('/get_jobs', controller.getAllJobs);
router.put('/edit_job/:id', controller.editJob); // Add this line for editing jobs
router.delete('/delete_job/:id', controller.deleteJob);
router.get('/get_job/:id', controller.getJobById);

// Allowance routes
router.post('/add_allowance', controller.addAllowance);
router.get('/get_allowances', controller.getAllAllowances);
router.put('/edit_allowance/:id', controller.editAllowance);
router.delete('/delete_allowance/:id', controller.deleteAllowance);

// Basic Salary routes
router.post('/add_basic_salary', controller.addBasicSalary);
router.get('/get_basic_salaries', controller.getAllBasicSalaries);
router.put('/edit_basic_salary/:id', controller.editBasicSalary);
router.delete('/delete_basic_salary/:id', controller.deleteBasicSalary);
//helloooo
// Deduction routes
router.post('/add_deduction', controller.addDeduction);
router.get('/get_deductions', controller.getAllDeductions);
router.put('/edit_deduction/:id', controller.editDeduction);
router.delete('/delete_deduction/:id', controller.deleteDeduction);

// Payslip route
router.get('/payslip/:id', controller.generatePayslip);

//Applicants add and edit
router.post('/applicants', controller.addApplicant);
router.put('/applicants/:id', controller.editApplicant);
router.get('/applicants/:id', controller.getApplicantById);

router.put('/addimg/:id', controller.editProfilePic);
router.put('/addcv/:id', controller.editCV);

//for applicantsapplied
router.post('/applied-applicants', controller.addAppliedApplicants);
router.get('/applied-applicants/:jobTitle', controller.getApplicantsByJobTitle);

module.exports = router;
