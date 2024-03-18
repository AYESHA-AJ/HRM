import React from 'react';
import MailIcon from '@mui/icons-material/Mail';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useAuth } from '../../utilis/AuthContext';
import { useState } from 'react';
import axiosInstance from '../../utilis/ApiRequest';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { currentUser } = useAuth();
  const handleSubscribe = async () => {
    try {
      // Extract email from currentUser or use any other source
      // Here, you can replace 'currentUser.email' with the actual way you fetch the current user's email
      

      // Send the email to the backend
      const response = await axiosInstance.post('/subscribe', { email: currentUser.email });
      console.log(response.data); // Log the response from the backend
    } catch (error) {
      console.error('Error subscribing:', error);
    }
  };
  return (
      <div>
          <div>
      <h3 style={{display: "flex", 
marginBottom: "0.5rem", 
gap: "0.5rem",
alignItems:" center", 
fontSize: "1.125rem",
lineHeight: "1.75rem", 
fontWeight: "700" 

          }}><MailIcon />Email me for jobs</h3>
          <p style={{
              color: "#444444",
              marginBottom: "1rem",
              fontSize: "1rem",
              lineHeight: "1.5rem" 
              
          }}>Stay connected with the latest job opportunities! Subscribe to our newsletter and receive curated job listings directly to your inbox.</p>
          
          <div style={{marginTop: "1rem", 
          width: "100%" 
          }}>
              <input type="email" name="email" id="email" placeholder='name@mail.com'
                 style={{
                    display: "block",
                    paddingTop: "0.5rem",
                    paddingBottom: "0.5rem",
                    paddingLeft: "0.75rem",
                    borderWidth: "1px",
                    width: "100%",
                    border: "solid #ededed",
                    outline: "none", // added focus outline
                    color: "#3f3f3f" // text-primary/72 color
                  }} /> 
                <input
            type="submit"
            onClick={handleSubscribe}
            value={"Subscribe"}
    style={{
      display: "block",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      paddingLeft: "0.75rem",
        borderRadius: '0.25rem',
        outline: 'none',
      borderWidth: "1px",
        width: "100%",
      height:"45px",
      background: "#2454b8",
      color: "#ffffff",
      cursor: "pointer",
      fontWeight: "600",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // subtle box shadow
      transition: "background 0.3s", // smooth background transition on hover
    }}
  />

              </div>
              </div>
          {/* 2nd prt */}
          <div style={{marginTop:"3rem"}}>
      <h3 style={{display: "flex", 
marginBottom: "0.5rem", 
gap: "0.5rem",
alignItems:" center", 
fontSize: "1.125rem",
                  lineHeight: "1.75rem", 
fontWeight: "700" 

          }}><RocketLaunchIcon/>Get noticed faster</h3>
          <p style={{
              color: "#444444",
              marginBottom: "1rem",
              fontSize: "1rem",
              lineHeight: "1.5rem" 
              
          }}>Stay connected with the latest job opportunities! Subscribe to our newsletter and receive curated job listings directly to your inbox.</p>
          
          <div style={{marginTop: "1rem", 
          width: "100%" 
          }}>
              
                <input
    type="submit"
    value={"Upload your resume"}
    style={{
      display: "block",
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      paddingLeft: "0.75rem",
        borderRadius: '0.25rem',
        outline: 'none',
      borderWidth: "1px",
        width: "100%",
      height:"45px",
      background: "#2454b8",
      color: "#ffffff",
      cursor: "pointer",
      fontWeight: "600",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // subtle box shadow
      transition: "background 0.3s", // smooth background transition on hover
    }}
  />

              </div>
              </div>
          
    </div>
  )
}

export default Newsletter;
