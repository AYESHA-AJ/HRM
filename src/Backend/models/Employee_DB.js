// backend/models/EmployeeDb.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  }
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
