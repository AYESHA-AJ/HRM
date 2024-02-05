import React, { useState ,useEffect} from "react";
// import DatePicker from "@mui/lab/DatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import ConfirmationModal from '../../components/ConfirmationModal';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from '@mui/icons-material/Cancel';
import InputBase from "@mui/material/InputBase";
import {
  Card,
  CardContent,
  Typography,
  Modal,
  Backdrop,
  Fade,
} from '@mui/material';
 
import {
  Box,
  useTheme,
  Tab,
  TextField,
  Tabs,
  Button,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { Formik,Field,ErrorMessage, useField } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

import Header from "../../components/Header";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
 
const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
  gender: "", // New field
  password: "", // New field
  designation: "", // New field
  department: "",
  education: "",  
  address: "",   // New field
  date:"",
  uploadImage: "", // New field
  uploadCv: "", // New field
  joiningDate: "", // New field
  leaving: "", // New field (optional)
};
const phoneRegExp = /^((\+92)|(0092))-{0,1}\d{3}-{0,1}\d{7}$|^\d{11}$|^\d{4}-\d{7}$/;
const emailRegExp=/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
const userSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
  gender: yup.string().required("required"), // New field
  password: yup.string().required("required"), // New field
  designation: yup.string().required("required"), // New field
  department: yup.string().required("required"), // New field
  date: yup.string().required("required"), // New field
  education: yup.string().required("required"), // New field
  uploadImage: yup.string().required("required"), // New field
  uploadCv: yup.string().required("required"), // New field
  address: yup.string().required("required"), // New field
  joiningDate: yup.string().required("required"), // New field
  leaving: yup.string(), // New field (optional)
});
const validate = (values) => {
  const errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    open: false,
    employeeInfo: {},
  });
   const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedEmployee, setEditedEmployee] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    // Function to handle user card click
    const handleUserClick = (user) => {
      setSelectedUser(user);
      setOpenModal(true);
    };
  
    // Function to close the modal
    const handleCloseModal = () => {
      setSelectedUser(null);
      setOpenModal(false);
    };
  
    const handleSearch = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/search_employee/${searchQuery}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error searching employees:', error);
        // Handle the error as needed
      }
    };
   const handleEdit = async (id) => {
      try {
        const response = await axios.get(`http://localhost:5000/api/get_employee/${id}`);
        const existingEmployee = response.data;
        setEditedEmployee(existingEmployee);
        setEditDialogOpen(true);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
   
    const handleDialogClose = () => {
      setEditDialogOpen(false);
      setEditedEmployee({});
    };
   
    const handleDialogSubmit = async () => {
      try {
        await axios.put(`http://localhost:5000/api/edit_employee/${editedEmployee._id}`, editedEmployee);
        // Refresh employee data after editing
        const response = await axios.get("http://localhost:5000/api/get_employees");
        setEmployeeData(response.data);
        setEditDialogOpen(false);
        setEditedEmployee({});
      } catch (error) {
        console.error("Error updating employee data:", error);
      }
    };
  const handleDelete = (id, fullName, email, department, contact) => {
    setDeleteConfirmation({
      open: true,
      employeeInfo: { id, fullName, email, department, contact },
    });
  };

  const handleConfirmDelete = () => {
    const { id, fullName } = deleteConfirmation.employeeInfo;
    console.log(`Deleting employee with ID: ${id}`);
  
    // Example using axios to send a delete request to the backend
    axios
      .delete(`http://localhost:5000/api/delete_employee/${id}`)
      .then((response) => {
        console.log('Employee deleted successfully');
  
        // Update state to remove the deleted employee
        setEmployeeData((prevEmployeeData) =>
          prevEmployeeData.filter((employee) => employee._id !== id)
        );
  
        setDeleteConfirmation({ open: false, employeeInfo: {} });
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
        setDeleteConfirmation({ open: false, employeeInfo: {} });
      });
  };
  const handleCloseDeleteConfirmation = () => {
    setDeleteConfirmation({ open: false, employeeInfo: {} });
  };
  const columns = [
    { field: "_id", headerName: "ID", flex: 1 }, // Assuming MongoDB uses _id as the identifier
  { field: "firstName", headerName: "First Name", flex: 1 },
  { field: "lastName", headerName: "Last Name", flex: 1 },
  { field: "email", headerName: "Email", flex: 1 },
  { field: "contact", headerName: "Contact", flex: 1 },
  { field: "designation", headerName: "Designation", flex: 1 },
  { field: "department", headerName: "Department", flex: 1 },
 
  {
    renderCell: ({ row }) => (
     
        
        <Box display="flex" alignItems="center">
        <IconButton onClick={() => handleEdit(row._id)}>
          <ModeEditOutlineOutlinedIcon style={{ color: '#784B84',fontSize: 26 }} />
        </IconButton>
        <IconButton
          onClick={() =>
            handleDelete(
              row._id,
              `${row.firstName} ${row.lastName}`,
              row.email,
              row.department,
              row.contact
            )
          }
        >
          <DeleteOutlinedIcon style={{ color: '#D21F3C', fontSize: 20 }} />
        </IconButton>
      </Box>
    ),
  },
   
 
 
  ];
  const [activeTab, setActiveTab] = useState("viewAllEmployees");
 
 
  const [employeeData, setEmployeeData] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/get_employees");
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };
 
    fetchData(); // Call the function when the component mounts
  }, []);
 
  const handleTabChange = async (event, newValue) => {
    setActiveTab(newValue);
 
    if (newValue === "viewAllEmployees") {
      try {
        const response = await axios.get("http://localhost:5000/api/get_employees");
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    }
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");
 

 
//////////////////////////////////////////////////////
 
const [values, setValues] = useState({
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  address1: "",
  address2: "",
  gender: "", // New field
  password: "", // New field
  designation: "", // New field
  department: "", // New field
  education: "", // New field
  address: "", // New field
  uploadImage: "", // New field
  uploadCv: "",
  date: "",
  joiningDate: "", // New field
  leaving: "", // New field (optional)
});
 
const [test, setTest] = useState("")
 
 
const handlechange = (e) => {
  setValues((prev) => {
    return { ...prev, [e.target.name]: e.target.value };
   
  });
}
 
// Function to handle onBlur
 
 
 
// Function to handle form submission or any other action
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(values)
  try {
    await axios.post("http://localhost:5000/api/add_employee", {
      ...values,
     
     
    })
  } catch (error) {
    console.log(error)
   
  }
  // You can perform any other actions like API requests here
};
 
/////////////////////////////
const [fname, setFname] = useState("");
const [lname, setLname] = useState("");
 const [email, setEmail] = useState("");
const [contact, setContact] = useState("");
const [address1, setAddress1] = useState("");
const [address2, setAddress2] = useState("");
const [gender, setGender] = useState("");
const [password, setPassword] = useState("");
const [designation, setDesignation] = useState("");
const [department, setDepartment] = useState("");
const [education, setEducation] = useState("");
const [address, setAddress] = useState("");
const [date, setDate] = useState("");
const [joiningDate, setJoiningDate] = useState("");
const [leaving, setLeaving] = useState("");
 
 
  const handleTest = async () => {
    try {
      await axios.post('http://localhost:5000/api/add_employee', {
        firstName: fname,
      lastName: lname,
       Email: email,
      contact: contact,
      address1: address1,
      address2: address2,
      gender: gender,
       password: password,
      designation: designation,
      department: department,
      education: education,
      address: address,
       date: date,
      // joiningDate: joiningDate,
      // leaving: leaving,
      });
 
      console.log("API request successful");
      console.log("Data sent:", fname);
 
     
 
    } catch (error) {
      console.error("Error during API request:", error);
    }
  };
 
  const MyDatePicker = ({ name = "", onDateChange }) => {
    const [field, meta, helpers] = useField(name);
    const { value } = meta;
    const { setValue } = helpers;
 
    const handleDateChange = (date) => {
      setValue(date);
      onDateChange && onDateChange(date); // Call the onDateChange prop if provided
    };
 
    return (
      <DatePicker
        {...field}
        selected={value}
        onChange={handleDateChange}
      />
    );
  };
 
 
  return (
    <Box m="20px">
    <Header title="EMPLOYEES" subtitle="Managing the Employees " />
    <Tabs value={activeTab} onChange={handleTabChange}>
      <Tab label="Add Employee" value="addEmployee" />
      <Tab label="View Employee Profile" value="employeeProfile" />
      <Tab label="View All Employees" value="viewAllEmployees" />
    </Tabs>
 
    {activeTab === "addEmployee" && (
      <Box m="20px">
        <Header title="" subtitle="ADD A NEW EMPLOYEE" />
        <Formik
          initialValues={values}
          validationSchema={userSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, errors, touched,handleBlur,handleChange}) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4,minmax(0,1fr))"
                sx={{
                  "$ > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="First Name"
                  //  onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.firstName}
                  name="firstName"
                  error={!!touched.firstName && !!errors.firstName}
                  helperText={touched.firstName && errors.firstName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Last Name"
                  // onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.lastName}
                  name="lastName"
                  error={!!touched.lastName && !!errors.lastName}
                  helperText={touched.lastName && errors.lastName}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                    // onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact Number"
                  // onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address 1"
                  //  onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.address1}
                  name="address1"
                  error={!!touched.address1 && !!errors.address1}
                  helperText={touched.address1 && errors.address1}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address 2"
                  //  onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.address2}
                  name="address2"
                  error={!!touched.address2 && !!errors.address2}
                  helperText={touched.address2 && errors.address2}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  select
                  label="Gender"
                  //  onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.gender}
                  name="gender"
                  error={!!touched.gender && !!errors.gender}
                  helperText={touched.gender && errors.gender}
                  sx={{ gridColumn: "span 2" }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </TextField>
                <TextField
                  fullWidth
                  variant="filled"
                  type="password"
                  label="Password"
                  //  onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Designation"
                  //  onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.designation}
                  name="designation"
                  error={!!touched.designation && !!errors.designation}
                  helperText={touched.designation && errors.designation}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  select
                  label="Department"
                  // onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.department}
                  name="department"
                  error={!!touched.department && !!errors.department}
                  helperText={touched.department && errors.department}
                  sx={{ gridColumn: "span 4" }}
                >
                  <MenuItem value="Designing">Designing</MenuItem>
                  <MenuItem value="Development">Development</MenuItem>
                  <MenuItem value="Testing">Testing</MenuItem>
                  {/* Add more departments as needed */}
                </TextField>
 
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Education"
                  //  onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.education}
                  name="education"
                  error={!!touched.education && !!errors.education}
                  helperText={touched.education && errors.education}
                  sx={{ gridColumn: "span 4" }}
                />
               
                
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  //  onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 4" }}
                />
 
                 <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="DateOfBirth"
                  //  onBlur={handleBlur}
                  onChange={handlechange}
                  // value={values.address}
                  name="date"
                  error={!!touched.date && !!errors.date}
                  helperText={touched.date && errors.date}
                  sx={{ gridColumn: "span 4" }}
                 
               >  <MyDatePicker
               name="date"
               
             
             /></TextField>            
                
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button color="secondary" variant="contained" type="submit">
                  Add Employee
                </Button>
                {/* <button onClick={handleTest}>Testing</button> */}
              </Box>
             
            </form>)}
          {/* )} */}
         
        </Formik>
       
      </Box>
       
       
      )}
 
      {activeTab === "employeeProfile" && (
        <Box m="40px 0 0 0">
        {/* Colored bar behind the search bar */}
        <Box
          display="flex"
          alignItems="center"
          backgroundColor={colors.blueAccent[700]}
          borderRadius="5px"
          p={1} // Padding
        >
          {/* Search bar with limited space */}
          <Box
            display="flex"
            alignItems="center"
            sx={{ width: "200px", ml: 1 }}
            backgroundColor={colors.blueAccent[900]}
            borderRadius="5px"
          >
            <InputBase
              placeholder="Search"
              sx={{ flex: 1, ml: 1 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>

      {/* Employee profile content goes here */}
      <Typography variant="h5" mt={2}>
        View Employee Profile
      </Typography>
      {searchResults.map((user) => (
        <Card key={user._id} onClick={() => handleUserClick(user)}>
          <CardContent>
            <Typography variant="h6">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2">
              Email: {user.email} | Contact: {user.contact}
            </Typography>
          </CardContent>
        </Card>
      ))}
 <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
          <Fade in={openModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
                  bgcolor: 'background.paper',
              borderRadius:"20px",
              boxShadow: 24,
              p: 3,
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleCloseModal}
              sx={{ position: 'absolute', top: 0, right: 10 }}
            >
              <CancelIcon />
            </IconButton>
            {selectedUser && (
              <div>
                <Typography variant="h5">
                  {selectedUser.firstName} {selectedUser.lastName}
                </Typography>
                <Typography>Email: {selectedUser.email}</Typography>
                <Typography>Contact: {selectedUser.contact}</Typography>
                {/* Add more details as needed */}
              </div>
            )}
          </Box>
        </Fade>
      </Modal>
        </Box>
        
       
       
      )}
 
      {activeTab === "viewAllEmployees" && (
        <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: "0.9rem",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontSize: "1rem"
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
       <DataGrid
  checkboxSelection
  rows={employeeData}
  columns={columns}
            getRowId={(row) => row._id} // Specify the field to be used as the row id
            
          />
          <ConfirmationModal
  open={deleteConfirmation.open}
  onClose={handleCloseDeleteConfirmation}
  onConfirm={handleConfirmDelete}
  title="Delete Confirmation"
  content={
    <div>
      <Typography variant="h5" style={{ fontWeight: 'bold', marginBottom: '10px' }}>
        Are you sure?
      </Typography>
      <div style={{ marginLeft: '20px' }}>
        <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
          Full name: {deleteConfirmation.employeeInfo.fullName}
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
          Email: {deleteConfirmation.employeeInfo.email}
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
          Contact: {deleteConfirmation.employeeInfo.contact}
        </Typography>
        <Typography variant="body1" style={{ fontWeight: 'bold', color: 'grey' }}>
          Department: {deleteConfirmation.employeeInfo.department}
        </Typography>
      </div>
    </div>
  }
          />
          <Dialog open={editDialogOpen} onClose={handleDialogClose}>
            <DialogTitle>Edit Employee</DialogTitle>
            <DialogContent sx={{ padding: '20px' }}>
  <TextField
    fullWidth
    variant="filled"
    label="First Name"
    value={editedEmployee.firstName}
    onChange={(e) => setEditedEmployee({ ...editedEmployee, firstName: e.target.value })}
    sx={{ marginBottom: '16px' }}
  />
  <TextField
    fullWidth
    variant="filled"
    label="Last Name"
    value={editedEmployee.lastName}
    onChange={(e) => setEditedEmployee({ ...editedEmployee, lastName: e.target.value })}
    sx={{ marginBottom: '16px' }}
  />
  <TextField
    fullWidth
    variant="filled"
    label="Email"
    value={editedEmployee.email}
    onChange={(e) => setEditedEmployee({ ...editedEmployee, email: e.target.value })}
    sx={{ marginBottom: '16px' }}
  />
  <TextField
    fullWidth
    variant="filled"
    label="Contact"
    value={editedEmployee.contact}
    onChange={(e) => setEditedEmployee({ ...editedEmployee, contact: e.target.value })}
    sx={{ marginBottom: '16px' }}
  />
 
 
 
  <TextField
    fullWidth
    variant="filled"
    label="Designation"
    value={editedEmployee.designation}
    onChange={(e) => setEditedEmployee({ ...editedEmployee, designation: e.target.value })}
    sx={{ marginBottom: '16px' }}
  />
  <TextField
      fullWidth
      variant="filled"
      label="Department"
      select
      value={editedEmployee.department}
      onChange={(e) => setEditedEmployee({ ...editedEmployee, department: e.target.value })}
      sx={{ marginBottom: '16px' }}
    >
      <MenuItem value="Designing">Designing</MenuItem>
      <MenuItem value="Development">Development</MenuItem>
      <MenuItem value="Testing">Testing</MenuItem>
      {/* Add more departments as needed */}
    </TextField>
 
 
   
 
</DialogContent>
            <DialogActions>
            <Button
    onClick={handleDialogClose}
    sx={{
      marginRight: '8px',
     
      backgroundColor: '#C0392B',
      fontWeight: 'bold',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#E74C32', // Lighter coral red on hover
      },
    }}
  >
    Cancel
  </Button>
  <Button
    onClick={handleDialogSubmit}
    sx={{
      backgroundColor: '#33852e',
      fontWeight: 'bold',
      color: '#FFFFFF',
      '&:hover': {
        backgroundColor: '#62a540', // Lighter warm yellow on hover
      },
    }}
  >
    Save Changes
  </Button>
            </DialogActions>
          </Dialog>

      </Box>
      )}
     
    </Box>
  );
};
 
export default Team;