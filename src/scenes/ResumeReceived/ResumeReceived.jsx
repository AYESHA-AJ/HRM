import React, { useState, useEffect } from 'react';
import { Box, FormControl, Select, MenuItem, Typography, Card, CardContent, List, ListItem, ListItemText, Grid } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import axios from 'axios';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { blue } from '@mui/material/colors';
import { grey } from '@mui/material/colors';
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";


const ResumeReceived = () => {
  const [selectedJob, setSelectedJob] = useState('');
  const [applicantData, setApplicantData] = useState([]);
  const [jobDetails, setJobDetails] = useState(null);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  ////////////////////////////////////////////////


  
    const [emailData, setEmailData] = useState({
      to: 'ayeshaaj25@gmail.com',
      subject: 'Testing send-email api',
      text: 'so its fine I think!'
    });
    const [message, setMessage] = useState('');
  
    // const handleChange = (e) => {
    //   const { name, value } = e.target;
    //   setEmailData({ ...emailData, [name]: value });
    // };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post('http://localhost:5000/api/send-email', emailData);
        setMessage(response.data);
      } catch (error) {
        setMessage('Error sending email');
        console.error(error);
      }
    };



  /////////////////////////////////////////////////

  useEffect(() => {
    // Fetch applicant data based on selected job
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/applied-applicants/${selectedJob}`);
        // Add unique IDs to each row
        const formattedData = response.data.applicants.map((applicant, index) => ({
          ...applicant,
          id: index + 1, // Generate unique ID based on index
        }));
        setApplicantData(formattedData);
        
        // Fetch job details using the first job ID
        if (formattedData.length > 0) {
          const firstJobId = formattedData[0].jobId;
          fetchJobDetails(firstJobId);
        } else {
          setJobDetails(null);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setApplicantData([]);
        setJobDetails(null);
      }
    };

    if (selectedJob) {
      fetchData();
    }
  }, [selectedJob]);

  const fetchJobDetails = async (jobId) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/get_job/${jobId}`);
      setJobDetails(response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setJobDetails(null);
    }
  };

  const handleJobChange = (event) => {
    const selectedJob = event.target.value;
    setSelectedJob(selectedJob);
  };

  const handleCVClick = (cvLink) => {
    window.open(cvLink, '_blank');
  };

  const handleShortlist = (applicantId) => {
    // Add your logic to handle shortlisting here
    console.log('Shortlisting applicant:', applicantId);
  };

  return (
    <Box m="20px">
      {/* Job Selection Dropdown */}
      <FormControl variant="outlined" style={{ marginBottom: '20px' }}>
        <Select
          value={selectedJob}
          onChange={handleJobChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Select Job' }}
        >
          <MenuItem value="" disabled>Select Job</MenuItem>
          <MenuItem value="Web Designer">Web Designer</MenuItem>
          <MenuItem value="Web Developer">Web Developer</MenuItem>
          <MenuItem value="Testing Engineer">Testing Engineer</MenuItem>
          <MenuItem value="Software Engineer">Software Engineer</MenuItem>
          <MenuItem value="Quality Assurance Engineer">Quality Assurance Engineer</MenuItem>
          {/* Add more job titles as needed */}
        </Select>
      </FormControl>

      {jobDetails && (
  
      <div style={{ padding: '10px', borderRadius: '9px', marginBottom: '20px',width:"400px" , boxShadow: '0 1px 2px'}}>
        <Typography><strong>JOB DESCRIPTION:</strong></Typography>
        <Typography><strong>Company:</strong> {jobDetails.companyName}</Typography>
        <Typography><strong>Salary Type:</strong> {jobDetails.salaryType}</Typography>
        <Typography><strong>Job Location:</strong> {jobDetails.jobLocation}</Typography>
        <Typography><strong>Posting Date:</strong> {jobDetails.postingDate}</Typography>
        <Typography><strong>Experience Level:</strong> {jobDetails.experienceLevel}</Typography>
        <Typography><strong>Skills:</strong> {jobDetails.skills.map(skill => skill.label).join(', ')}</Typography>
      </div>
    

)}


      {/* Data Grid for Resume Received */}
      <Box mt={3} style={{ height: 400, width: '100%' }}>
        <DataGrid
        sx={{ "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
            fontSize: "1rem"
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
            fontSize: "0.9rem",
          },
        
        }}
       
          rows={applicantData}
          columns={[
            { field: 'id', headerName: 'ID', width: 100 },
            { field: 'name', headerName: 'Name', width: 300 },
            // { field: 'jobId', headerName: 'Job ID', width: 200 },
            { field: 'email', headerName: 'Email', width: 300 },
            {
              field: 'cv',
              headerName: 'CV',
              width: 200,
              renderCell: (params) => (
                <a href="#" onClick={() => handleCVClick(params.value)} style={{ color: blue[500], textDecoration: 'underline' }}>
                  Uploaded Cv Link
                </a>
              ),
            },
            {
              field: 'actions',
              headerName: 'Actions',
              width: 150,
              renderCell: (params) => (
                <button onClick={() => handleShortlist(params.row.id)}>
                  <HowToRegIcon style={{ color: blue[500] }} />
                  Select to shortlist
                </button>
              ),
            },
          ]}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
      <button onClick={handleSubmit}>
        buton
      </button>
    </Box>
  );
};

export default ResumeReceived;
