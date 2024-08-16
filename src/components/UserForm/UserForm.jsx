import {
    Grid,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    Box,
    ButtonGroup,
    IconButton
} from "@mui/material";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Tooltip from '@mui/material/Tooltip';
import React, { useState, useEffect } from 'react';
import { convertToBase64 } from "../../utils/base64PhotoUtils";
import { addUser, getUserById, updateUser } from "../../api/fetchUser";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SnackbarNotification } from "../SnackbarNotification"

const UserForm = ({ isEditMode }) => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [fileName, setFileName] = useState('');
    const [fileBase64, setFileBase64] = useState('');
    const [selectedUser, setSelectedUser] = useState({
        username: '',
        password: '',
        role: 'reader',
        base64Photo: ''
    })
    const [errors, setErrors] = useState({
        username: '',
        password: '',
        base64Photo: ''

    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const validateForm = () => {

        let isValid = true;
        let errors = {};

        if (!isEditMode && !username) {
            errors.username = 'Username is required*';
            console.log("nameerror")
            isValid = false;
        }
        if (!password && !isEditMode) {
            errors.password = 'Password is required*';
            console.log("passrror")
            isValid = false;
        }
        if (!fileBase64) {
            errors.base64Photo = 'Photo is required*';
            console.log("filerror")
            isValid = false;
        }

        setErrors(errors);
        return isValid;

    };

    useEffect(() => {

        const renderItems = async () => {
            try {
                const result = await getUserById(id);
                const userData = result.data.user;
                console.log(userData)
                setSelectedUser({
                    username: userData.username,
                    password: userData.password,
                    role: "reader",
                    base64Photo: selectedUser.base64Photo,
                })

                setFileBase64(userData.base64Photo);
                setFileName('Change Profile');

            } catch (error) {
                console.log(error)
            }
        }

        if (isEditMode) {
            renderItems();
        }

    }, [isEditMode, id])
   
    const handleAdd = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = {
                username: username,
                password: password,
                role: "reader",
                base64Photo: fileBase64
            }
            console.log("isvalid")

            try {
                const result = await addUser(data);
                setSnackbarMessage('User added successfully!');
                setSnackbarSeverity('success');
                navigate('/users')
              
            } catch (error) {
                console.log(error)
                setSnackbarMessage('Error adding user!');
                setSnackbarSeverity('error');
            }
            setSnackbarOpen(true)
        }
    }

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            const data = {
                username: selectedUser.username,
                password: selectedUser.password,
                base64Photo: fileBase64
            };

            try {
                await updateUser(id, data);
                setSnackbarMessage('User updated successfully!');
                setSnackbarSeverity('success');
                // navigate('/users');
            } catch (error) {
                setSnackbarMessage('Error updating user!');
                setSnackbarSeverity('error');
                console.error("Error updating user:", error);
            }

            setSnackbarOpen(true);
        }
    };

    const handleChangeText = (e) => {
        const { name, value } = e.target;
        setSelectedUser(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isEdit) {
            handleUpdate(event);
        } else {
            handleAdd(event);
        }
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);

                setFileBase64(base64);
                setFileName(file.name)
            } catch (error) {
                console.log("err")
            }
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (

        <>
            <Grid item xs={12} sm={10} md={8} >

                <Card

                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        borderRadius: '15px',
                        backgroundColor: '#FAFAFA',


                    }}
                >

                    <CardContent sx={{ marginTop: '1rem' }}>
                        <Typography variant='h4' textAlign="center" gutterBottom>{isEditMode ? 'UPDATE' : 'ADD USER'}</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                inputProps={{ maxLength: 10 }}
                                value={isEditMode ? selectedUser.username : username}
                                onChange={(e) => {
                                    if (isEditMode) {
                                        handleChangeText(e);
                                    } else {
                                        setUsername(e.target.value);
                                    }
                                }}

                                name="Name"
                                sx={{ width: "100%", marginBottom: '2rem' }}
                                disabled={isEditMode}
                                error={!isEditMode && !!errors.username}
                                helperText={!isEditMode && errors.username}
                            />

                            <TextField
                                label="Password"
                                variant="outlined"
                                inputProps={{ maxLength: 10 }}
                                value={isEditMode ? selectedUser.password : password}
                                onChange={(e) => {
                                    if (isEditMode) {
                                        handleChangeText(e)
                                    } else {
                                        setPassword(e.target.value)
                                    }
                                }}
                                name="password"
                                sx={{ width: "100%", marginBottom: '2rem' }}
                                error={!!errors.password}
                                helperText={errors.password}
                            />

                            <TextField disabled
                                label="Role"
                                variant="outlined"
                                inputProps={{ maxLength: 50 }}
                                defaultValue="Reader" 
                                sx={{ width: "100%", marginBottom: '2rem' }}

                            />


                            <input
                                accept="image/*"
                                type='file'
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                id="upload-button"

                            />
                            <label htmlFor="upload-button">
                                <Box sx={{ backgroundColor: 'white', borderRadius: '4px', cursor: 'pointer' }}>
                                    <Tooltip title="Upload profile photo" arrow>
                                        <IconButton component="span"
                                            style={{ padding: '10px' }}>
                                            <AttachFileIcon sx={{ fontSize: '2.3rem' }} />
                                        </IconButton>
                                    </Tooltip>

                                    {fileBase64 && <span style={{ fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"', color: '#A9A9AC', cursor: 'pointer' }}>{fileName}</span>}
                                    {!fileBase64 && <span style={{ fontFamily: '"Roboto", "Helvetica", "Arial", "sans-serif"', color: '#A9A9AC', cursor: 'pointer' }}>{isEditMode ? 'change your profile photo' : 'upload profile photo'}</span>}
                                </Box>
                            </label>
                            {errors.base64Photo && (
                                <Typography variant="body2" color="error" sx={{ marginTop: '0.5rem' }}>
                                    {errors.base64Photo}
                                </Typography>
                            )}

                            <ButtonGroup
                                variant="contained"
                                sx={{

                                    width: '100%',
                                    marginTop: '1rem',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    border: 'none',
                                    boxShadow: 'none'
                                }}>
                                <Button
                                    variant="contained"
                                    type="submit"
                                    sx={{

                                        backgroundColor: '#4d3664',
                                        color: 'white',
                                        padding: '1rem 4rem',
                                        borderRadius: '8px',
                                        '&:hover': {
                                            backgroundColor: '#40245c',
                                        },

                                    }}

                                    onClick={(e) => {
                                        if (isEditMode) {
                                            handleUpdate(e)
                                        } else {
                                            handleAdd(e)
                                        }
                                    }}

                                >
                                    Submit
                                </Button>
                            </ButtonGroup>
                        </form>
                    </CardContent>
                </Card>

                <SnackbarNotification
                    open={snackbarOpen}
                    message={snackbarMessage}
                    severity={snackbarSeverity}
                    onClose={handleSnackbarClose}
                />
            </Grid>
        </>

    );
}
export default UserForm;