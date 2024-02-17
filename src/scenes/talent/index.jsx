import React, { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import CreateJob from "../postjob";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import JobsPosted from "../editjob";
import ResumeReceived from "../ResumeReceived/ResumeReceived";

const Talent = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box m="20px">
      <Header title="Employee Recruitment" subtitle="Talent Acquisition" />

      <Tabs value={tabValue} onChange={handleTabChange} aria-label="Nested Tabs">
        <Tab label="Post a Job" />
        <Tab label="Job Posted"/>
        <Tab label="Resume Received" />
        <Tab label="Short Listed Candidates" />
        <Tab label="Selected Candidates" />
      </Tabs>

      {tabValue === 0 && (
        <div>
          <CreateJob/>
          
        </div>
      )}

      {tabValue === 1 && (
        <div>
          <JobsPosted/>
          
        </div>
      )}

      {tabValue === 2 && (
        <div>
         <ResumeReceived/>
        </div>
      )}

      {tabValue === 3 && (
        <div>
          {/* Content for "Short Listed Candidates" tab */}
          {/* You can render your components, forms, or any other content here */}
          {/* Content for "Selected Candidates" tab */}
          {/* You can render your components, forms, or any other content here */}
          <p>Selected Candidates Content</p>
        </div>


      )}
      {tabValue === 4 && (
        <div>
          
          {/* Content for "Selected Candidates" tab */}
          {/* You can render your components, forms, or any other content here */}
          <p>Selected Candidates Content</p>
        </div>


      )}
    </Box>
  );
};

export default Talent;
