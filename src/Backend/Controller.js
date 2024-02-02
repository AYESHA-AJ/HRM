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
      dateOfBirth,
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
      dateOfBirth,
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

module.exports = {
  addEmployee,
};
