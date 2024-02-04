

import React, { useState ,useEffect} from "react";
// import DatePicker from "@mui/lab/DatePicker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { KeyboardDatePicker } from "@mui/lab";
import EditIcon from "@mui/icons-material/Edit";
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';



import {
  Box,
  Typography,
  useTheme,
  Tab,
  TextField,
  Tabs,
  Button,
} from "@mui/material";
import { DesktopDatePicker, MobileDatePicker } from "@mui/lab";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as yup from "yup";
import { Formik,Field,ErrorMessage, useField } from "formik";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";

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
  dateOfBirth: yup.string().required("required"), // New field
  education: yup.string().required("required"), // New field
  uploadImage: yup.string().required("required"), // New field
  uploadCv: yup.string().required("required"), // New field
  address: yup.string().required("required"), // New field
  joiningDate: yup.string().required("required"), // New field
  leaving: yup.string(), // New field (optional)
});
const DateField = ({ label, value, onChange }) => (
  <DatePicker
    value={value}
    onChange={onChange}
    renderInput={(params) => (
      <TextField
        {...params}
        fullWidth
        variant="filled"
        type="text"
        label={label}
        sx={{ gridColumn: "span 4" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <CalendarTodayIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    )}
  />
);
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      
      headerName: "Actions",
      flex: 1,
      
    },
  ];
  const [activeTab, setActiveTab] = useState("viewAllEmployees");

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });

    try {
      // Use axios for better handling of form data
      const response = await fetch('http://localhost:5000/api/add_employee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.status === 201) {
        console.log('Employee added successfully!');
      } else {
        console.error('Error adding employee:', response.status, response.statusText);
        console.error('Response body:', response.data);
      }
    } catch (error) {
      console.error('Network error:', error.message);
    }
  };
  
  return (
    <Box m="20px">
    <Header title="EMPLOYEES" subtitle="Managing the Employees " />
    <Tabs value={activeTab} onChange={handleTabChange}>
      <Tab label="Add Employee" value="addEmployee" />
      <Tab label="Delete Employee" value="deleteEmployee" />
      <Tab label="View All Employees" value="viewAllEmployees" />
    </Tabs>

    {activeTab === "addEmployee" && (
      <Box m="20px">
        <Header title="EDIT DETAILS" subtitle="make changes in your profile" />
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={userSchema}
        >
          {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => (
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
                 // onBlur={handleBlur}
                  //onChange={handleChange}
                  value={values.firstName}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address1}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address2}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.gender}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.designation}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.department}
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
                  label="Date of Birth"
                  onBlur={handleBlur}
                  sx={{ gridColumn: "span 4" }}
                >
                  <DateField
          label="Date of Birth"
          value={values.dateOfBirth}
          onChange={(date) => handleChange({ target: { name: "dateOfBirth", value: date } })}
        />
                </TextField>
               
        
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Education"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.education}
                  name="education"
                  error={!!touched.education && !!errors.education}
                  helperText={touched.education && errors.education}
                  sx={{ gridColumn: "span 4" }}
                />
                {/* <InputLabel htmlFor="uploadImage">Upload Image (PNG or JPEG)</InputLabel>
                  <Input
                    fullWidth
                    type="file"
                    accept="image/jpeg, image/png"
                    id="uploadImage"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
                        handleChange({ target: { name: "uploadImage", value: file } });
                      } else {
                        handleChange({ target: { name: "uploadImage", value: null } });
                        console.error("Unsupported file format for image");
                      }
                    }}
                    sx={{ gridColumn: "span 4" }}
                  />
                  <InputLabel htmlFor="uploadCv">Upload CV (PDF)</InputLabel>
                  <Input
                    fullWidth
                    type="file"
                    accept="application/pdf"
                    id="uploadCv"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file && file.type === "application/pdf") {
                        handleChange({ target: { name: "uploadCv", value: file } });
                      } else {
                        handleChange({ target: { name: "uploadCv", value: null } });
                        console.error("Unsupported file format for CV");
                      }
                    }}
                    sx={{ gridColumn: "span 4" }}
                  /> */}
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  name="address"
                  error={!!touched.address && !!errors.address}
                  helperText={touched.address && errors.address}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Joining Date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.joiningDate}
                    name="joiningDate"
                    error={!!touched.joiningDate && !!errors.joiningDate}
                    helperText={touched.joiningDate && errors.joiningDate}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <CalendarTodayIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ gridColumn: "span 4" }}
                  />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Leaving (Optional)"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.leaving}
                    name="leaving"
                    error={!!touched.leaving && !!errors.leaving}
                    helperText={touched.leaving && errors.leaving}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <CalendarTodayIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ gridColumn: "span 4" }}
                  />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" >
                  Add Employee
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
        
       
      )}

      {activeTab === "deleteEmployee" && (
        <Box m="20px">
          {/* Delete Employee content goes here */}
          <Typography>Delete Employee Content</Typography>
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
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
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
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
      )}
     
    </Box>
  );
};

export default Team;