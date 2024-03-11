// backend/controllers/controller.js
const Employee = require('./models/Employee_DB');
const Allowance = require('./models/Allowance_DB');
const BasicSalary = require('./models/Basicsalary_DB');
const Deduction = require('./models/Deductions_DB');
const Job = require('./models/JobPortal');
const AppliedApplicant = require('./models/AppliedApplicants');
const Leave = require('./models/Leave_DB');
const LeaveRequest = require('../Backend/models/LeaveRequests_DB');



const Applicant = require('./models/Applicants_DB');

const addEmployee = async (req, res) => {
  try {
   
    const newEmployee = new Employee({
      
     
      ...req.body,
    });
 
    // Saving the new employee to the database
    await newEmployee.save();
 
    // Sending the created employee data as a response
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const addJob = async (req, res) => {
  try {
    const newJob = new Job({
      ...req.body,
    });

    await newJob.save();

    res.status(201).json(newJob);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const activateDeactivateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    // Assuming you have a Job model
    const job = await Job.findById(id);

    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    // Update the 'status' field based on the 'isActive' value
    job.status = isActive ? 'active' : 'inactive';

    // Save the updated job
    await job.save();

    res.status(200).json({ message: 'Job activation/deactivation successful', job });
  } catch (error) {
    console.error('Error activating/deactivating job:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const getAllJobs = async (req, res) => {
  try {
    // Fetch only active jobs from the database
    const jobs = await Job.find({ status: 'active' });
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getAllEmployees = async (req, res) => {
  try {
    // Fetch all employees from the database
    const employees = await Employee.find();
 
    // Sending the list of employees as a response
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

 

const editEmployee = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
 
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedEmployee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
 
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
 
const getEmployeeById = async (req, res) => {
  const { id } = req.params;
 
  try {
    // Fetch the employee from the database using the provided ID
    const employee = await Employee.findById(id);
 
    // Check if the employee with the specified ID exists
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
 
    // Sending the employee data as a response
    res.status(200).json(employee);
  } catch (error) {
    console.error('Error fetching employee by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
 
 
const deleteEmployee = async (req, res) => {
  try {
    const employeeId = req.params.id;
 
    // Check if the employee with the given ID exists
    const existingEmployee = await Employee.findById(employeeId);
    if (!existingEmployee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
 
    // Delete the employee from the database using deleteOne()
    await Employee.deleteOne({ _id: employeeId });
 
    res.status(200).json({ message: 'Employee deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

};
const searchEmployee = async (req, res) => {
  const { query } = req.params;

  try {
    // Use a case-insensitive regex to match the query in multiple fields
    const employees = await Employee.find({
      $or: [
        { firstName: { $regex: new RegExp(query, 'i') } },
        { lastName: { $regex: new RegExp(query, 'i') } },
        // Add more fields as needed for searching
      ],
    });

    res.status(200).json(employees);
  } catch (error) {
    console.error('Error searching employees:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const addAllowance = async (req, res) => {
  try {
    const { name, value } = req.body;
    const newAllowance = new Allowance({ name, value });
    await newAllowance.save();
    res.status(201).json(newAllowance);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAllowances = async (req, res) => {
  try {
    const allowances = await Allowance.find();
    res.status(200).json(allowances);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editAllowance = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedAllowance = await Allowance.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedAllowance) {
      return res.status(404).json({ error: 'Allowance not found' });
    }

    res.status(200).json(updatedAllowance);
  } catch (error) {
    console.error('Error updating allowance:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteAllowance = async (req, res) => {
  try {
    const allowanceId = req.params.id;

    const existingAllowance = await Allowance.findById(allowanceId);
    if (!existingAllowance) {
      return res.status(404).json({ message: 'Allowance not found' });
    }

    await Allowance.deleteOne({ _id: allowanceId });

    res.status(200).json({ message: 'Allowance deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addBasicSalary = async (req, res) => {
  try {
    const { designation, salary } = req.body;
    const newBasicSalary = new BasicSalary({ designation, salary });
    await newBasicSalary.save();
    res.status(201).json(newBasicSalary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllBasicSalaries = async (req, res) => {
  try {
    const basicSalaries = await BasicSalary.find();
    res.status(200).json(basicSalaries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editBasicSalary = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedBasicSalary = await BasicSalary.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedBasicSalary) {
      return res.status(404).json({ error: 'Basic Salary not found' });
    }

    res.status(200).json(updatedBasicSalary);
  } catch (error) {
    console.error('Error updating basic salary:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteBasicSalary = async (req, res) => {
  try {
    const basicSalaryId = req.params.id;

    const existingBasicSalary = await BasicSalary.findById(basicSalaryId);
    if (!existingBasicSalary) {
      return res.status(404).json({ message: 'Basic Salary not found' });
    }

    await BasicSalary.deleteOne({ _id: basicSalaryId });

    res.status(200).json({ message: 'Basic Salary deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addDeduction = async (req, res) => {
  try {
    const deduction = await Deduction.create(req.body);
    res.status(201).json(deduction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all deductions
const getAllDeductions = async (req, res) => {
  try {
    const deductions = await Deduction.find();
    res.status(200).json(deductions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Edit deduction
const editDeduction = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedDeduction = await Deduction.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedDeduction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete deduction
const deleteDeduction = async (req, res) => {
  const { id } = req.params;
  try {
    await Deduction.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const generatePayslip = async (req, res) => {
  const employeeId = req.params.id;

  try {
    // Fetch employee details
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // Fetch basic salary based on employee designation
    const basicSalary = await BasicSalary.findOne({ designation: employee.designation });
    if (!basicSalary) {
      return res.status(404).json({ message: 'Basic salary not found for the employee' });
    }

    // Fetch all allowances
    const allowances = await Allowance.find();

    // Calculate total allowance
    let totalAllowance = 0;
    const individualAllowances = [];
    allowances.forEach((allowance) => {
      totalAllowance += allowance.value;
      individualAllowances.push({
        name: allowance.name,
        value: allowance.value
      });
    });

    // Fetch tax percentage based on employee designation
    const deduction = await Deduction.findOne({ designation: employee.designation });
    if (!deduction) {
      return res.status(404).json({ message: 'Tax percentage not found for the employee' });
    }

    // Calculate tax amount
    const taxAmount = (deduction.tax / 100) * basicSalary.salary;
    const sub_total=basicSalary.salary + totalAllowance;
    // Calculate total salary
    const totalSalary = sub_total - taxAmount;

    // Prepare payslip data
    const payslip = {
      name: `${employee.firstName} ${employee.lastName}`,
      employeeId: employee._id,
      designation: employee.designation,
      email: employee.email,
      basicSalary: basicSalary.salary,
      allowances: individualAllowances,
      taxAmount,
      sub_total,
      totalSalary,
    };

    res.status(200).json(payslip);
  } catch (error) {
    console.error('Error generating payslip:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



const addApplicant = async (req, res) => {
  try {
      const { name, email, password } = req.body;
      const newApplicant = new Applicant({ name, email, password });
      await newApplicant.save();
      res.status(201).json({ message: 'Applicant added successfully', applicant: newApplicant });
  } catch (error) {
      res.status(500).json({ message: 'Failed to add applicant', error: error.message });
  }
};

// Function to edit an existing applicant
const editApplicant = async (req, res) => {
  try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const updatedApplicant = await Applicant.findByIdAndUpdate(id, { name, email, password }, { new: true });
      if (!updatedApplicant) {
          return res.status(404).json({ message: 'Applicant not found' });
      }
      res.status(200).json({ message: 'Applicant updated successfully', applicant: updatedApplicant });
  } catch (error) {
      res.status(500).json({ message: 'Failed to update applicant', error: error.message });
  }
};




const getApplicantById = async (req, res) => {
  try {
    const { id } = req.params;
    const applicant = await Applicant.findById(id);
    if (!applicant) {
      return res.status(404).json({ message: 'Applicant not found' });
    }
    res.status(200).json({ applicant });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applicant', error: error.message });
  }
};

const editProfilePic = async (req, res) => {
  const { id } = req.params;
  const { profilepic } = req.body; // Assuming the file path is in req.body

  try {
    const updatedApplicant = await Applicant.findByIdAndUpdate(id, { profilepic }, { new: true });
    if (!updatedApplicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    res.status(200).json(updatedApplicant);
  } catch (error) {
    console.error('Error updating profile picture:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editCV = async (req, res) => {
  const { id } = req.params;
  const { profilecv } = req.body; // Assuming profilecv path is in req.body if uploaded

  try {
    const updatedApplicant = await Applicant.findByIdAndUpdate(
      id,
      profilecv ? { profilecv } : {}, // Update only if profilecv exists
      { new: true }
    );
    if (!updatedApplicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    res.status(200).json(updatedApplicant);
  } catch (error) {
    console.error('Error updating CV:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addAppliedApplicants = async (req, res) => {
  const { jobTitle, applicants } = req.body;

  try {
      // Check if jobTitle and applicants array are provided
      if (!jobTitle || !Array.isArray(applicants)) {
          return res.status(400).json({ error: 'Invalid input data' });
      }

      // Check if the jobTitle already exists in the database
      let appliedApplicant = await AppliedApplicant.findOne({ jobTitle });

      if (appliedApplicant) {
          // If the jobTitle exists, push the new applicants into the applicants array
          appliedApplicant.applicants.push(...applicants);
      } else {
          // If the jobTitle does not exist, create a new document
          appliedApplicant = new AppliedApplicant({ jobTitle, applicants });
      }

      // Save the changes to the database
      await appliedApplicant.save();

      res.status(201).json({ message: 'Applied applicants data added successfully' });
  } catch (error) {
      console.error('Error adding applied applicants data:', error);
      res.status(500).json({ error: 'Failed to add applied applicants data' });
  }
};

const getApplicantsByJobTitle = async (req, res) => {
  const { jobTitle } = req.params;

  try {
    const applicants = await AppliedApplicant.findOne({ jobTitle });
    if (!applicants) {
      return res.status(404).json({ error: 'Applicants not found for the specified job title' });
    }
    res.status(200).json(applicants);
  } catch (error) {
    console.error('Error fetching applicants:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getEveryJob = async (req, res) => {
  try {
    console.log('Fetching every job...');
    const jobs = await Job.find();
    console.log('Fetched jobs:', jobs);
    res.status(200).json(jobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const shortlistApplicant = async (req, res) => {
  const { jobId } = req.body; // Get the job title from the request body
  const { applicantId } = req.params; // Get the applicant ID from the URL parameter

  try {
    const appliedApplicant = await AppliedApplicant.findOne({ jobTitle: jobId });

    if (!appliedApplicant) {
      return res.status(404).json({ error: 'Applied applicant not found' });
    }

    const applicant = appliedApplicant.applicants.find(app => app._id.toString() === applicantId);

    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    applicant.shortlisted = true;

    await appliedApplicant.save();

    res.status(200).json({ message: 'Applicant shortlisted successfully' });
  } catch (error) {
    console.error('Error shortlisting applicant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const unshortlistApplicant = async (req, res) => {
  const { jobId } = req.body; // Get the job title from the request body
  const { applicantId } = req.params; // Get the applicant ID from the URL parameter

  try {
    const appliedApplicant = await AppliedApplicant.findOne({ jobTitle: jobId });

    if (!appliedApplicant) {
      return res.status(404).json({ error: 'Applied applicant not found' });
    }

    const applicant = appliedApplicant.applicants.find(app => app._id.toString() === applicantId);

    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    applicant.shortlisted = false;

    await appliedApplicant.save();

    res.status(200).json({ message: 'Applicant removed from shortlist successfully' });
  } catch (error) {
    console.error('Error unshortlisting applicant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const selectApplicant = async (req, res) => {
  const { jobId } = req.body; // Get the job title from the request body
  const { applicantId } = req.params; // Get the applicant ID from the URL parameter

  try {
    const appliedApplicant = await AppliedApplicant.findOne({ jobTitle: jobId });

    if (!appliedApplicant) {
      return res.status(404).json({ error: 'Applied applicant not found' });
    }

    const applicant = appliedApplicant.applicants.find(app => app._id.toString() === applicantId);

    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    applicant.selected = true;

    await appliedApplicant.save();

    res.status(200).json({ message: 'Applicant selected successfully' });
  } catch (error) {
    console.error('Error selecting applicant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const unselectApplicant = async (req, res) => {
  const { jobId } = req.body; // Get the job title from the request body
  const { applicantId } = req.params; // Get the applicant ID from the URL parameter

  try {
    const appliedApplicant = await AppliedApplicant.findOne({ jobTitle: jobId });

    if (!appliedApplicant) {
      return res.status(404).json({ error: 'Applied applicant not found' });
    }

    const applicant = appliedApplicant.applicants.find(app => app._id.toString() === applicantId);

    if (!applicant) {
      return res.status(404).json({ error: 'Applicant not found' });
    }

    applicant.selected = false;

    await appliedApplicant.save();

    res.status(200).json({ message: 'Applicant removed from selected successfully' });
  } catch (error) {
    console.error('Error unselecting applicant:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const addLeave = async (req, res) => {
  try {
    const { name, type, unit } = req.body;
    const newLeave = new Leave({
      name,
      type,
      unit,
      status: 'inactive', // You can set a default status if needed
    });
    const savedLeave = await newLeave.save();
    res.status(201).json(savedLeave);
  } catch (error) {
    console.error('Error adding leave:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteJob = async (req, res) => {
  try {
    const jobId = req.params.id;

    // Check if the job with the given ID exists
    const existingJob = await Job.findById(jobId);
    if (!existingJob) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Delete the job from the database using deleteOne()
    await Job.deleteOne({ _id: jobId });

    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteLeave = async (req, res) => {
  try {
    const leaveId = req.params.id;

    const existingLeave = await Leave.findById(leaveId);
    if (!existingLeave) {
      return res.status(404).json({ message: 'Leave not found' });
    }

    await Leave.deleteOne({ _id: leaveId });

    res.status(200).json({ message: 'Leave deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const activateDeactivateLeave = async (req, res) => {
  try {
    const leaveId = req.params.id;
    const { status } = req.body;

    // Find leave by ID and update its status
    const updatedLeave = await Leave.findByIdAndUpdate(
      leaveId,
      { $set: { status } },
      { new: true } // Return the updated leave
    );

    if (!updatedLeave) {
      return res.status(404).json({ error: 'Leave not found' });
    }

    res.json(updatedLeave);
  } catch (error) {
    console.error('Error activating/deactivating leave:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const editJob = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedJob) {
      return res.status(404).json({ error: 'Job not found' });
    }

    res.status(200).json(updatedJob);
  } catch (error) {
    console.error('Error updating job:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const editLeave = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedLeave = await Leave.findByIdAndUpdate(id, updatedData, { new: true });
    if (!updatedLeave) {
      return res.status(404).json({ error: 'Leave not found' });
    }

    res.status(200).json(updatedLeave);
  } catch (error) {
    console.error('Error updating leave:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getJobById = async (req, res) => {
  const { id } = req.params;

  try {
    console.log('Fetching job with ID:', id);

    const job = await Job.findById(id);
    if (!job) {
      console.log('Job not found');
      return res.status(404).json({ error: 'Job not found' });
    }

    console.log('Job found:', job);
    res.status(200).json(job);
  } catch (error) {
    console.error('Error fetching job by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const getLeaveById = async (req, res) => {
 
  
  try {
    const { id } = req.params;
    console.log('Fetching leave with ID:', id);
    const leave = await Leave.findById(id);
    if (!leave) {
      console.log('Leave not found');
      return res.status(404).json({ error: 'Leave not found' });
    }

    console.log('Leave found:', leave);
    res.status(200).json(leave);
  } catch (error) {
    console.error('Error fetching leave by ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getAllLeaveTypes = async (req, res) => {
  try {
    const leaves = await Leave.find({}, 'name'); // Only fetch the 'name' field of leaves
    res.json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const addLeaveRequest = async (req, res) => {
  try {
    // Extract data from request body
    const { startDate, endDate, leaveType, description } = req.body;

    // Validate required fields (example)
    if (!startDate || !endDate || !leaveType) {
      return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    // Create a new leave request instance
    const newLeaveRequest = new LeaveRequest({
      startDate,
      endDate,
      leaveType,
      description,
    });

    // Save the new leave request to the database
    await newLeaveRequest.save();

    // Send a successful response with the created request data
    res.status(201).json(newLeaveRequest);
  } catch (error) {
    console.error('Error adding leave request:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await LeaveRequest.find();
    res.json(leaveRequests);
  } catch (error) {
    console.error('Error fetching leave requests:', error);
    res.status(500).json({ message: 'Internal Server Error' }); // Improve error handling
  }
};

const cancelLeaveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedLeaveRequest = await LeaveRequest.findByIdAndUpdate(id, { status: 'cancelled' }, { new: true });

    if (updatedLeaveRequest) {
      res.json(updatedLeaveRequest);
    } else {
      res.status(404).json({ message: 'Leave request not found' });
    }
  } catch (error) {
    console.error('Error cancelling leave request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const approveLeaveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedLeaveRequest = await LeaveRequest.findByIdAndUpdate(id, { status: 'approved' }, { new: true });

    if (updatedLeaveRequest) {
      res.json(updatedLeaveRequest);
    } else {
      res.status(404).json({ message: 'Leave request not found' });
    }
  } catch (error) {
    console.error('Error cancelling leave request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const rejectLeaveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedLeaveRequest = await LeaveRequest.findByIdAndUpdate(id, { status: 'rejected' }, { new: true });

    if (updatedLeaveRequest) {
      res.json(updatedLeaveRequest);
    } else {
      res.status(404).json({ message: 'Leave request not found' });
    }
  } catch (error) {
    console.error('Error cancelling leave request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  addEmployee,
  activateDeactivateJob,
  getAllEmployees,
  deleteEmployee,
  editEmployee,
  getEmployeeById,
  searchEmployee,
  addAllowance,
  getAllAllowances,
  editAllowance,
  deleteAllowance,
  addBasicSalary,
  getAllBasicSalaries,
  editBasicSalary,
  deleteBasicSalary,
  addDeduction, 
  getAllDeductions, 
  editDeduction, 
  deleteDeduction,
  generatePayslip,
  addJob,
  getAllJobs,
  deleteJob,
  editJob,
  getJobById,// Add the newly created deleteJob function here

  addApplicant, editApplicant,getApplicantById,
  editProfilePic,editCV,
  addAppliedApplicants,
  getApplicantsByJobTitle,
  getEveryJob,
  shortlistApplicant,unshortlistApplicant,selectApplicant,unselectApplicant,
  getAllLeaves, deleteLeave, editLeave, addLeave, activateDeactivateLeave,
  getLeaveById,getAllLeaveTypes,
  addLeaveRequest,getAllLeaveRequests,cancelLeaveRequest,approveLeaveRequest,rejectLeaveRequest
};
 