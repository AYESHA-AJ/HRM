// backend/controllers/controller.js
const Employee = require('./models/Employee_DB');
const Allowance = require('./models/Allowance_DB');
const BasicSalary = require('./models/Basicsalary_DB');
const Deduction = require('./models/Deductions_DB');
const Job = require('./models/JobPortal');
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
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
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

 
// const editEmployee = async (req, res) => {
//   const { id } = req.params;
//   const updatedData = req.body;
 
//   try {
//     const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, { new: true });
//     if (!updatedEmployee) {
//       return res.status(404).json({ error: 'Employee not found' });
//     }
 
//     res.status(200).json(updatedEmployee);
//   } catch (error) {
//     console.error('Error updating employee:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

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

const getApplicants = async (req, res) => {
  try {
    const applicants = await Applicant.find();
    res.status(200).json({ applicants });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch applicants', error: error.message });
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

module.exports = {
  addEmployee,
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
  addDeduction, getAllDeductions, editDeduction, deleteDeduction ,
  generatePayslip,

  addJob,getAllJobs,

  addApplicant, editApplicant,getApplicantById
};
 