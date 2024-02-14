import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, IconButton, Grid } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const Setting = () => {
    // State variables to store user data
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // State variables to toggle edit mode
    const [editUsername, setEditUsername] = useState(false);
    const [editEmail, setEditEmail] = useState(false);
    const [editPassword, setEditPassword] = useState(false);

    // Fetch user data when component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/applicants/65cc65fc9ca228813501c49f');
                const userData = response.data.applicant; // Assuming the API returns user data object with a key 'applicant'
                setUsername(userData.name);
                setEmail(userData.email);
                setPassword(userData.password);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchData();
    }, []);

    const handleEdit = (field) => {
        switch (field) {
            case 'username':
                setEditUsername(true);
                break;
            case 'email':
                setEditEmail(true);
                break;
            case 'password':
                setEditPassword(true);
                break;
            default:
                break;
        }
    };

    const handleSave = async (field) => {
        try {
            switch (field) {
                case 'username':
                    // Save username changes
                    if (!username.trim()) {
                        throw new Error('Username cannot be empty');
                    }
                    setEditUsername(false);
                    await axios.put('http://localhost:5000/api/applicants/65cc65fc9ca228813501c49f', { name: username });
                    break;
                case 'email':
                    // Validate email format
                    if (!email || !validateEmail(email)) {
                        throw new Error('Please provide a valid email');
                    }
                    // Save email changes
                    setEditEmail(false);
                    await axios.put('http://localhost:5000/api/applicants/65cc65fc9ca228813501c49f', { email });
                    break;
                case 'password':
                    // Save password changes
                    if (!password.trim()) {
                        throw new Error('Password cannot be empty');
                    }
                    setEditPassword(false);
                    await axios.put('http://localhost:5000/api/applicants/65cc65fc9ca228813501c49f', { password });
                    break;
                default:
                    break;
            }
        } catch (error) {
            alert(error);
            
        }
    };
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    return (
        <Box mt={5} display="flex" justifyContent="center">
            <Box
                width={500}
                p={4}
                borderRadius={10}
                boxShadow="0px 4px 8px rgba(0, 0, 255, 0.5)" // Bluish shadow
            >
                <Typography variant="h4" gutterBottom style={{ fontWeight: 'bold', marginBottom: '40px', textAlign: 'center', color: '#333' }}>Profile Settings</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={4}><Typography variant="body1" style={{ fontWeight: 'bold', marginTop:'9px' }}>Username:</Typography></Grid>
                    <Grid item xs={6}>
                        {editUsername ? (
                            <TextField type="text" value={username} onChange={(e) => setUsername(e.target.value)} variant="outlined" fullWidth style={{ height: '40px' }} />
                        ) : (
                            <Typography variant="body1" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>{username}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                        {editUsername ? (
                            <IconButton onClick={() => handleSave('username')} color="primary"><CheckCircleIcon /></IconButton>
                        ) : (
                            <IconButton onClick={() => handleEdit('username')} style={{ color: 'purple' }}><EditIcon /></IconButton>
                        )}
                    </Grid>
                    <Grid item xs={4}><Typography variant="body1" style={{ fontWeight: 'bold',marginTop:'9px' }}>Email:</Typography></Grid>
                    <Grid item xs={6}>
                        {editEmail ? (
                            <TextField
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                fullWidth
                                style={{ height: '40px' }}
                                inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$", title: "Please enter a valid email address" }}
                            />
                        ) : (
                            <Typography variant="body1" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>{email}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                        {editEmail ? (
                            <IconButton onClick={() => handleSave('email')} color="primary"><CheckCircleIcon /></IconButton>
                        ) : (
                            <IconButton onClick={() => handleEdit('email')} style={{ color: 'purple' }}><EditIcon /></IconButton>
                        )}
                    </Grid>
                    <Grid item xs={4}><Typography variant="body1" style={{ fontWeight: 'bold' ,marginTop:'9px'}}>Password:</Typography></Grid>
                    <Grid item xs={6}>
                        {editPassword ? (
                            <TextField type={editPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} variant="outlined" fullWidth style={{ height: '40px' }} />
                        ) : (
                            <Typography variant="body1" style={{ height: '40px', display: 'flex', alignItems: 'center' }}>{password}</Typography>
                        )}
                    </Grid>
                    <Grid item xs={2} style={{ display: 'flex', alignItems: 'center' }}>
                        {editPassword ? (
                            <IconButton onClick={() => handleSave('password')} color="primary"><CheckCircleIcon /></IconButton>
                        ) : (
                            <IconButton onClick={() => handleEdit('password')} style={{ color: 'purple' }}><EditIcon /></IconButton>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Setting;
