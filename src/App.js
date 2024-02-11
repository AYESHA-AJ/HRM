import { useState } from "react";
import { Routes, Route, Navigate ,createBrowserRouter,RouterProvider} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import attendance from "./scenes/attendance";
import { useNavigate } from 'react-router-dom';
import Contacts from "./scenes/contacts";
import Talent from "./scenes/talent";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar";
import Attendence from "./scenes/attendance";
import Login from './Login';
import EmployeePage from "./scenes/EmployeePage";
import SignUp from './signUp';
import Payroll from "./scenes/Payroll";


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loginType, setLoginType] = useState('');
  const [isSignUpClicked, setIsSignUpClicked] = useState(false);
  const navigate = useNavigate();

  const handleLoginClick = (type) => {
    setLoggedIn(true);
    setLoginType(type);
  };
 
  const handleSignUpClick = () => {
   
  console.log('Sign Up clicked!');
  // setIsSignUpClicked(true);
  setLoggedIn(true) // Set the state to true when sign-up button is clicked
  navigate('/signUp');// Set the state to true when sign-up button is clicked
  };


  return (
    <div>
      {!isLoggedIn && <Login onLoginClick={handleLoginClick} handleSignUpClick={handleSignUpClick} />}
      {isLoggedIn && (
        <>
          {loginType === 'admin' && (
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <div className="app">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/contacts" element={<Contacts />} />
                      <Route path="/attendance" element={<Attendence />} />
                      <Route path="/form" element={<Form />} />
                      <Route path="/bar" element={<Bar />} />
                      <Route path="/talent" element={<Talent />} />
                      <Route path="/pie" element={<Pie />} />
                      <Route path="/line" element={<Line />} />
                      <Route path="/faq" element={<FAQ />} />
                      <Route path="/payroll" element={<Payroll />} />
                     
                    </Routes>
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          )}
          {loginType === 'employee' && (
            <EmployeePage />
          )}
          {loginType === 'applicant' && (
            <>
            </>
          )}
        </>
      )}
      <Routes>
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
  
}

export default App;
