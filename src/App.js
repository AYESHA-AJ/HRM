import { useState } from "react";
import { Routes, Route, Navigate ,createBrowserRouter,RouterProvider} from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Topbar2 from "./scenes2/global/Topbar2";
import Home from "./scenes3/pages/home";
import Feed from "./scenes3/feed";
import Sidebar2 from "./scenes2/global/Sidebar2";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Dashboard2 from "./scenes2/dashboard2";
import Calendar2 from "./scenes2/calendar";
import Team from "./scenes/team";
import Form2 from "./scenes2/form";
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
import SignUp from './signUp';


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const [isSidebar2, setIsSidebar2] = useState(true);
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
                     
                    </Routes>
                  </main>
                </div>
              </ThemeProvider>
            </ColorModeContext.Provider>
          )}
          {loginType === 'employee' && (
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app">
        <Sidebar2 isSidebar2={isSidebar2} />
                  <main className="content">
                  <Topbar2 setIsSidebar2={setIsSidebar2} />
          <Routes>
            <Route path="/" element={<Dashboard2 />} />
                      <Route path="/calendar" element={<Calendar2 />} />
                      
            <Route path="/form" element={<Form2 />} />
            
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  </ColorModeContext.Provider>
)}


          {loginType === 'applicant' && (
            <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme} />
              <CssBaseline />
              <Home/>
           </ColorModeContext.Provider>
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
