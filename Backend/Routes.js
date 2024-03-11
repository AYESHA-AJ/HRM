// backend/routes/routes.js
const express = require('express');
const router = express.Router();
const controller = require('./Controller');
const emailController = require('./nodemailController');
 
// email routes
 
// emailRoutes.js
 
 
// Define routes
router.post('/send-email', emailController.sendEmail);
 
 
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
router.get('/get_all_jobs', controller.getEveryJob);
router.get('/get_job/:id', controller.getJobById);
router.put('/activate_deactivate_job/:id', controller.activateDeactivateJob);
 
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
 
// Route for shortlisting an applicant
router.post('/shortlist/:applicantId', controller.shortlistApplicant);
 
// Route for unshortlisting an applicant
router.post('/unshortlist/:applicantId', controller.unshortlistApplicant);
 
// Route for selecting an applicant
router.post('/select/:applicantId', controller.selectApplicant);
 
// Route for unselecting an applicant
router.post('/unselect/:applicantId', controller.unselectApplicant);
 
 
router.get('/get_leaves', controller.getAllLeaves);
router.post('/add_leave', controller.addLeave);
router.put('/edit_leave/:id', controller.editLeave);
router.delete('/delete_leave/:id', controller.deleteLeave);
router.put('/activate_deactivate_leave/:id', controller.activateDeactivateLeave);
router.get('/api/get_leave/:id', controller.getLeaveById);
 
router.post('/requests', controller.addLeaveRequest);
router.get('/requests', controller.getAllLeaveRequests);
router.patch('/requests/:id', controller.cancelLeaveRequest);
router.patch('/approve_requests/:id', controller.approveLeaveRequest);
router.patch('/reject_requests/:id', controller.rejectLeaveRequest);
 
 
module.exports = router;
 