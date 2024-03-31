import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import LineChart from '../../components/LineChart';
import ProgressCircle from "../../components/ProgressCircle";
import axiosInstance from '../../utilis/ApiRequest';
import PieChart from '../../components/PieChart';
import { tokens } from '../../theme';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State Hooks
  const [subscribers, setSubscribers] = useState(0);
  const [employees, setEmployees] = useState(0);
  const [applicants, setApplicants] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [subscribersIncrease, setSubscribersIncrease] = useState('0.00%');
  const [employeesIncrease, setEmployeesIncrease] = useState('0.00%');
  const [applicantsIncrease, setApplicantsIncrease] = useState('0.00%');
  const [emailCountIncrease, setEmailCountIncrease] = useState('0.00%');

  // Ref Hooks for previous values
  const prevEmailCount = useRef(emailCount);
  const prevSubscribers = useRef(subscribers);
  const prevEmployees = useRef(employees);
  const prevApplicants = useRef(applicants);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailResponse = await axiosInstance.get('/email-count');
        const newEmailCount = emailResponse.data.count;
        if (newEmailCount !== prevEmailCount.current) {
          setEmailCount(newEmailCount);
          setEmailCountIncrease(calculateIncrease(prevEmailCount.current, newEmailCount));
          prevEmailCount.current = newEmailCount;
        }

        const subscribersResponse = await axiosInstance.get('/subscribers');
        const newSubscribers = subscribersResponse.data.length;
        if (newSubscribers !== prevSubscribers.current) {
          setSubscribers(newSubscribers);
          setSubscribersIncrease(calculateIncrease(prevSubscribers.current, newSubscribers));
          prevSubscribers.current = newSubscribers;
        }

        const employeesResponse = await axiosInstance.get('/get_employees');
        const newEmployees = employeesResponse.data.length;
        if (newEmployees !== prevEmployees.current) {
          setEmployees(newEmployees);
          setEmployeesIncrease(calculateIncrease(prevEmployees.current, newEmployees));
          prevEmployees.current = newEmployees;
        }

        const applicantsResponse = await axiosInstance.get('/applicants');
        const newApplicants = applicantsResponse.data.length;
        if (newApplicants !== prevApplicants.current) {
          setApplicants(newApplicants);
          setApplicantsIncrease(calculateIncrease(prevApplicants.current, newApplicants));
          prevApplicants.current = newApplicants;
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const calculateIncrease = (prevValue, newValue) => {
    if (prevValue === 0 && newValue === 0) {
      return '0.00%';
    } else if (prevValue === 0 && newValue > 0) {
      return '0.00%'; // Adjust this based on how you want to treat initial values
    } else {
      const increase = ((newValue - prevValue) / prevValue) * 100;
      return `${increase.toFixed(2)}%`;
    }
  };
  

  return (
    <Box m="10px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "10px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="120px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
             title={emailCount} 
            subtitle="Emails"
            progress={emailCount / 5}
            increase={emailCountIncrease}
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={applicants}
            subtitle="Applicants"
            progress={applicants / 10}
            increase={applicantsIncrease}
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
          title={employees}
          subtitle="Employees"
            progress={employees / 5}
            increase={employeesIncrease}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
           title={subscribers}
           subtitle="Subscribers"
            progress={subscribers / 5}
            increase={subscribersIncrease}
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
               Employee Counts  Across 
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Departments
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          {/* <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box> */}
          <Box height="300px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        
        
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        {/* ROW 4 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="65px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
               Employee Counts  Across 
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Departments
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
          {/* <Box height="300px" m="-20px 0 0 0">
            <BarChart isDashboard={true} />
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
