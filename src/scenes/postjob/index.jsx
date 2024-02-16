import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import './index.css';
import axios from 'axios';
import CreatableSelect from 'react-select/creatable';

const CreateJob = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isSubmitSuccess, setSubmitSuccess] = useState(false);
  const {
    register,
      handleSubmit,
      reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    try {
        // Attach the selected skills to the data object
        data.skills = selectedOption;

        // Make a POST request to your backend API
        const response = await axios.post('http://localhost:5000/api/add_job', data);

        // Handle the response as needed
        console.log('Job created successfully:', response.data);

        // Set the submit success state to true
        setSubmitSuccess(true);

        // Reset the form after a successful submission
        reset();

       
    } catch (error) {
        console.error('Error creating job:', error.message);
    }
};

    const options = [{ value: "JavaScipt", lable: "JavaScipt" },
        { value: "C++", label: "C++" },
        { value: "HTML", label: "HTML" },
        { value: "CSS", label: "CSS" },
        { value: "React", label: "React" },
        { value: "Node", label: "Node" },
        {value:"MongoDB",label:"MongoDB"},]
        

        const handleClosePopup = () => {
            // Close the popup by setting the submit success state to false
            setSubmitSuccess(false);
          };
          
    return (
        <div style={{
            paddingLeft: "1rem",
            paddingRight: "1rem",
            width: "100%", // Set the width to 100% to cover the entire row
            boxSizing: "border-box", // Include padding and border in the total width/height
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
        }}>
            {/* form */}
            <div style={{
                paddingTop: "2rem",
                paddingBottom: "2rem",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                background: "#FAFAFA",
                margin: "20px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                width: "100%", // Set the width to 100% to cover the entire row
                boxSizing: "border-box", // Include padding and border in the total width/height
            }}>
                <form onSubmit={handleSubmit(onSubmit)} style={{ backgroundColor: "#F5F5F5" }}>
                    {/* row1 */}
                    <div className='create-job-flex' style={{ flexDirection: "row", width: "100%", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                        <div style={{ width: "50%", marginRight: "2%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Title</label>
                            <input
                                type="text"
                                defaultValue={"Web Developer"}
                                {...register("jobTitle")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%", marginTop: "1rem",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                        <div style={{ width: "50%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Company Name</label>
                            <input
                                type="text"
                                placeholder='Ex: Microsoft'
                                {...register("companyName")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%",
                                    fontSize: "1rem", marginTop: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                    </div>
                    {/* row 2 */}
                    <div className='create-job-flex' style={{ flexDirection: "row", width: "100%", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                        <div style={{ width: "50%", marginRight: "2%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Minimum Salary</label>
                            <input
                                type="text"
                                placeholder='Rs.20k'
                                {...register("minPrice")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px", marginTop: "1rem",
                                    width: "100%",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                        <div style={{ width: "50%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Maximum Salary</label>
                            <input
                                type="text"
                                placeholder='Rs.120k'
                                {...register("maxPrice")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px", marginTop: "1rem",
                                    padding: "12px",
                                    width: "100%",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                    </div>
                    {/* row3 */}
                    <div className='create-job-flex' style={{ flexDirection: "row", width: "100%", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                        <div style={{ width: "50%", marginRight: "2%", padding: "12px 12px" }}>
                            <label style={{ fontSize: "1.2rem", color: "#535353" }}>Salary Type</label>
                            <select {...register("salaryType")} className="create-job-input" style={{
                                border: "none", borderRadius: "8px",
                                padding: "12px",
                                width: "100%",
                                fontSize: "1rem", marginTop: "1rem"
                            }}>
                                <option value="">Choose your salary</option>
                                <option value="Hourly">Hourly</option>
                                <option value="Monthly">Monthly</option>
                                <option value="Yearly">Yearly</option>
                            </select>
              
                        </div>
                        <div style={{ width: "50%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Location</label>
                            <input
                                type="text"
                                placeholder='Ex:Islamabad'
                                {...register("jobLocation")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%", marginTop: "1rem",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                    </div>

                    {/* row 4 */}
                    <div className='create-job-flex' style={{ flexDirection: "row", width: "100%", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                        <div style={{ width: "50%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Posting Date</label>
                            <input
                                type="date"
                                placeholder='Ex: 2023-11-03'
                                {...register("postingDate")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%", marginTop: "1rem",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                        <div style={{ width: "50%", marginRight: "2%", padding: "12px 12px" }}>
                            <label style={{ fontSize: "1.2rem", color: "#535353" }}>Experience Level</label>
                            <select {...register("experienceLevel")} className="create-job-input" style={{
                                border: "none", borderRadius: "8px",
                                padding: "12px",
                                width: "100%",
                                fontSize: "1rem", marginTop: "1rem"
                            }}>
                                <option value="">Select your experience level</option>
                                <option value="NoExperience">No Experience</option>
                                <option value="Internship">Internship</option>
                                <option value="Work remotely">Work remotely</option>
                            </select>
              
                        </div>
            
                    </div>
                    {/* row 5 */}
                    <div style={{ marginTop: "1rem"}}>
                        <label style={{ marginBottom: "4rem", fontSize: "1.2rem", color: "#535353" }}>    Required Skill Sets:</label>
                        <CreatableSelect
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                            isMulti
                            className='create-job-input' styles={{ paddingTop: "3rem", paddingBottom: "1rem", marginTop: "3rem" }} />
                      
                    </div>
                    {/* row 6 */}
                    <div className='create-job-flex' style={{ flexDirection: "row", width: "100%", marginBottom: "0.5rem", marginTop: "0.5rem" }}>
                        <div style={{ width: "50%", padding: "12px 12px" }}>
                            <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Company Logo</label>
                            <input
                                type="url"
                                placeholder='Paste your company logo URL : http://weshare.com/img1'
                                {...register("companyLogo")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%", marginTop: "1rem",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                        </div>
                        <div style={{ width: "50%", marginRight: "2%", padding: "12px 12px" }}>
                            <label style={{ fontSize: "1.2rem", color: "#535353" }}>Employment Type</label>
                            <select {...register("employmentType")} className="create-job-input" style={{
                                border: "none", borderRadius: "8px",
                                padding: "12px",
                                width: "100%",
                                fontSize: "1rem", marginTop: "1rem"
                            }}>
                                <option value="">Select your employment type</option>
                                <option value="Full-time">Full-Time</option>
                                <option value="Part-time">Part-Time</option>
                                <option value="Temporary">Temporary</option>
                            </select>
              
                        </div>
            
                    </div>
                    {/* row 7 */}
                    <div style={{ width: "100%" }}>
                        <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Description</label>
                        <textarea {...register("description")} style={{
                            width: " 100%",
                            paddingTop: "0.375rem",
                            paddingBottom: "0.375rem",
                            paddingLeft: "0.75rem",
                            marginTop: "2rem", /* Adjust as needed */
                            backgroundColor: "#ffffff",
                            height: "150px",
                            border: " none",
                            borderRadius: "2px",
                            fontSize: "1rem",
                            color: "#4F4F4F",
  
                        }}
                            row={6}
                            defaultValue={"Join our dynamic team and contribute to exciting projects.!"}
       
                            placeholder='Job Description' />
                    </div>
                    
           
                   {/* row 9 - Additional Fields */}
                   <div style={{ width: "100%" }}>
                        <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Benefits</label>
                        <textarea  {...register("jobBenefits")} style={{
                            width: " 100%",
                            paddingTop: "0.375rem",
                            paddingBottom: "0.375rem",
                            paddingLeft: "0.75rem",
                            marginTop: "2rem", /* Adjust as needed */
                            backgroundColor: "#ffffff",
                            height: "150px",
                            border: " none",
                            borderRadius: "2px",
                            fontSize: "1rem",
                            color: "#4F4F4F",
  
                        }}
                            row={8}
                            defaultValue={"Ex: Health Insurance, Flexible Schedule!"}
       
                            placeholder='Job Benefits' />
                    </div>
                   
{/* row 10 */}
<div style={{ width: "100%" }}>
                        <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Future Growth</label>
                        <textarea   {...register("employmentFutureGrowth")} style={{
                            width: " 100%",
                            paddingTop: "0.375rem",
                            paddingBottom: "0.375rem",
                            paddingLeft: "0.75rem",
                            marginTop: "2rem", /* Adjust as needed */
                            backgroundColor: "#ffffff",
                            height: "150px",
                            border: " none",
                            borderRadius: "2px",
                            fontSize: "1rem",
                            color: "#4F4F4F",
  
                        }}
                            row={8}
                            defaultValue={"Ex: Health Insurance, Flexible Schedule!"}
       
                            placeholder='Job Benefits' />
                    </div>
                    {/* row 11 */}
<div style={{ width: "100%" }}>
                        <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>OutLine</label>
                        <textarea   {...register("jobOutline")} style={{
                            width: " 100%",
                            paddingTop: "0.375rem",
                            paddingBottom: "0.375rem",
                            paddingLeft: "0.75rem",
                            marginTop: "2rem", /* Adjust as needed */
                            backgroundColor: "#ffffff",
                            height: "150px",
                            border: " none",
                            borderRadius: "2px",
                            fontSize: "1rem",
                            color: "#4F4F4F",
  
                        }}
                            row={8}
                            defaultValue={"Ex: This position entails joining a web design and development team....!"}
       
                            placeholder='Job Benefits' />
                    </div>
                     {/* row 12 */}
                     <div style={{ width: "100%" ,marginTop:"2rem"}}>
                        <label style={{ marginBottom: "0.5rem", fontSize: "1.2rem", color: "#535353" }}>Job Posted By</label>
                        <input
                                type="email"
                                placeholder='your email'
                                {...register("postedBy")}
                                className='create-job-input'
                                style={{
                                    backgroundColor: "#ffffff",
                                    border: "none",
                                    borderRadius: "8px",
                                    padding: "12px",
                                    width: "100%", marginTop: "1rem",
                                    fontSize: "1rem",
                                    color: "#4F4F4F",
                                }}
                            />
                    </div>
                    {/* submit button */}
                    <input type="submit" style={{
                        marginTop: "1.25rem",
                        display: "block",
                        paddingTop: "0.5rem",
                        paddingBottom: "0.5rem",
                        paddingLeft: "2rem",
                        paddingRight: "2rem",
                        marginTop: "3rem",
                        marginBottom: "1.25rem",
         
                        marginRight: "6px",
                        background: "transparent",
                        border: "none",
                        fontWeight: "600",
                        fontSize: "1.2rem",
                        borderRadius: "5px",
                        color: "#FFFFFF",
                        cursor: "pointer",
                        backgroundColor: "#3575E2",
           
                        boxSizing: "border-box", // Include padding and border in the total width/height
                    }} />
                    {/* Success popup */}
                    {isSubmitSuccess && (
                <div>
                    <p>Form submitted successfully!</p>
                    <button onClick={handleClosePopup}>Close</button>
                </div>
            )}
                </form>
            </div>
        </div>
    )
};

export default CreateJob;
