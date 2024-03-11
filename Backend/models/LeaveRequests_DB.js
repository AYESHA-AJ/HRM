const mongoose = require('mongoose');

const leaveRequestSchema = new mongoose.Schema({
  // Employee ID field removed for now
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  leaveType: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'approved', 'rejected', 'cancelled'], // Additional options
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);

module.exports = LeaveRequest;
