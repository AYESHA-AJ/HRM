// backend/models/EmployeeDb.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  address1: {
    type: String,
    required: true,
  },
  address2: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  uploadImage: {
    type: Buffer, // Storing as Buffer in MongoDB for image files
    required: true,
  },
  uploadCv: {
    type: Buffer, // Storing as Buffer in MongoDB for PDF files
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    required: true,
  },
  leaving: {
    type: Date, // Optional, can be null
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
