// backend/models/JobPortal.js
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
  },
  minPrice: {
    type: String,
    required: true,
  },
  maxPrice: {
    type: String,
    required: true,
  },
  salaryType: {
    type: String,
    required: true,
  },
  jobLocation: {
    type: String,
    required: true,
  },
  postingDate: {
    type: String,
    required: true,
  },
  experienceLevel: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
    required: true,
  },
  companyLogo: {
    type: String,
    required: true,
  },
  employmentType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  postedBy: {
    type: String,
    required: true,
  },
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
