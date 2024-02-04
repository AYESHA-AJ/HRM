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

 
const editEmployees = async (req, res) => {
 
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

module.exports = {
  addEmployee,
  getAllEmployees,
  deleteEmployee, // Renamed the function to deleteEmployee
  editEmployees,
};