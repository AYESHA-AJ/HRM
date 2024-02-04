// backend/controllers/controller.js
const Employee = require('./models/Employee_DB');

const addEmployee = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      contact,
      address1,
      address2,
      gender,
      password,
      designation,
      department,
      education,
      address,
      date,
      joiningDate,
      leaving,
    } = req.body;

    // Assuming uploadImage and uploadCv are file buffers sent from the frontend
    // const { uploadImage, uploadCv } = req.files;

    // Creating a new instance of Employee model
    const newEmployee = new Employee({
      firstName,
      lastName,
      email,
      contact,
      address1,
      address2,
      gender,
      password,
      designation,
      department,
      education,
      address,
      date,
      joiningDate,
      leaving,
      // uploadImage: uploadImage.data, // Assuming uploadImage is a buffer
      // uploadCv: uploadCv.data, // Assuming uploadCv is a buffer
    });

    // Saving the new employee to the database
    await newEmployee.save();

    // Sending the created employee data as a response
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

const deleteEmployees = async (req, res) => {

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


module.exports = {
  addEmployee,
  getAllEmployees,
  deleteEmployees,
  editEmployee,
  getEmployeeById,

};
