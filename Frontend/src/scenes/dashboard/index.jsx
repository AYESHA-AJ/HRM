import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import axios from 'axios';
import axiosInstance from '../../utilis/ApiRequest';


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [subscribers, setSubscribers] = useState(0);
  const [employees, setEmployees] = useState(0);
  const [applicants, setApplicants] = useState(0);
  const [emailCount, setEmailCount] = useState(0);
  const [subscribersIncrease, setSubscribersIncrease] = useState(0);
  const [employeesIncrease, setEmployeesIncrease] = useState(0);
  const [applicantsIncrease, setApplicantsIncrease] = useState(0);
  const [emailCountIncrease, setEmailCountIncrease] = useState(0);

  useEffect(() => {
    axiosInstance.get('/email-count')
    .then(response => {
      const count = response.data.count;
      setEmailCountIncrease(calculateIncrease(emailCount, count));
      setEmailCount(count);
    })
    .catch(error => {
      console.error('Error fetching email count:', error);
    });

    axiosInstance.get('/subscribers')
      .then(response => {
        const totalSubscribers = response.data.length;
        setSubscribersIncrease(calculateIncrease(subscribers, totalSubscribers));
        setSubscribers(totalSubscribers);
      })
      .catch(error => {
        console.error('Error fetching subscribers:', error);
      });

    axiosInstance.get('/get_employees')
      .then(response => {
        const totalEmployees = response.data.length;
        setEmployeesIncrease(calculateIncrease(employees, totalEmployees));
        setEmployees(totalEmployees);
      })
      .catch(error => {
        console.error('Error fetching employees:', error);
      });

    axiosInstance.get('/applicants')
      .then(response => {
        const totalApplicants = response.data.length;
        setApplicantsIncrease(calculateIncrease(applicants, totalApplicants));
        setApplicants(totalApplicants);
      })
      .catch(error => {
        console.error('Error fetching applicants:', error);
      });
  }, [subscribers, employees, applicants, emailCount]);

  const calculateIncrease = (prevValue, newValue) => {
    const increase = ((newValue - prevValue) / prevValue) * 100;
    return increase.toFixed(2) + '%';
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
            progress={applicants / 5}
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
            progress={employees / 10}
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
            progress={subscribers / 10}
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
                Revenue Generated
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                $59,342.32
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
        
        

        {/* ROW 3 */}
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
        {/* <Box
          gridColumn="span 6"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Sales Quantity
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box> */}
        
      </Box>
    </Box>
  );
};

export default Dashboard;
