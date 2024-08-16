import {
    Grid,
    Typography,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Select,
    MenuItem,
    Button,
    Card,
    CardContent,
    CardMedia,
    InputLabel,
    FormHelperText,
    ButtonGroup
} from "@mui/material";

import mailIcon from '../../assets/mail.svg'
import { fetchCountries } from '../../api/fetchCountries'
import React, { useState, useEffect } from 'react';
import { addMessage } from '../../api/fetchMessages'
import { SnackbarNotification } from "../SnackbarNotification"
const ContactForm = () => {

    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [countries, setCountries] = useState([])
    const [selectedCountry, setSelectedCountry] = useState('');
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState({
        name: '',
        gender: '',
        selectedCountry: '',
        message: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    useEffect(() => {

        const getCountries = async () => {
            try {
                const countriesData = await fetchCountries();
                let countries = countriesData.data.countries;
                setCountries(countries);
            } catch (error) {
                console.log(error);
            }
        };
        getCountries();

    }, []);

    const clearInputs = () => {
        setName(''),
            setGender(''),
            setSelectedCountry(''),
            setMessage('')
    }

    const validateForm = () => {

        let isValid = true;
        let errors = {};

        if (!name) {
            errors.name = 'Name is required*';
            console.log("nameerror")
            isValid = false;
        }
        if (!gender) {
            errors.gender = 'Gender is required*';
            console.log("genderror")
            isValid = false;
        }
        if (!selectedCountry) {
            errors.selectedCountry = 'Country selection is required*';
            console.log("countrrror")
            isValid = false;
        }
        if (!message) {
            errors.message = 'Message is required*';
            console.log("msgrror")
            isValid = false;
        }

        setErrors(errors);
        return isValid;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (validateForm()) {

            const data = {

                name: name,
                gender: gender,
                country: selectedCountry,
                message, message
            }

            try {
                const result = await addMessage(data);
                clearInputs();
                setSnackbarMessage('The message has been sent successfully!');
                setSnackbarSeverity('success');
            } catch (error) {
                console.log(error)
                setSnackbarMessage('Error adding user!');
                setSnackbarSeverity('error');
            }
            setSnackbarOpen(true)
        }
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (

        <>
            <Grid item xs={10} sm={6} md={10}>
                <Card
                    sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        borderRadius: '15px',
                        backgroundColor: '#FAFAFA'
                    }}
                >
                    <CardMedia
                        sx={{ width: '4rem', height: '4rem', marginTop: '0.5rem' }}
                        component="img"
                        image={mailIcon}
                        alt=""
                    />

                    <CardContent sx={{ marginTop: '1rem', width: '90%' }}>
                        <Typography variant='h4' textAlign="center" gutterBottom>Contact Us</Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                inputProps={{ maxLength: 50 }}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                sx={{ width: "100%" }}
                                error={!!errors.name}
                                helperText={errors.name}
                            />

                            <FormControl sx={{ width: "100%", marginTop: '1rem' }}>
                                <FormLabel>Gender</FormLabel>

                                <RadioGroup
                                    row
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}

                                >
                                    <FormControlLabel value="female" control={<Radio />} label="Female" sx={{ '& .MuiFormControlLabel-label': { marginLeft: -1 } }} />
                                    <FormControlLabel value="male" control={<Radio />} label="Male" sx={{ '& .MuiFormControlLabel-label': { marginLeft: -1 } }} />
                                </RadioGroup>

                                {errors.gender && <FormHelperText error>{errors.gender}</FormHelperText>}
                            </FormControl>

                            <FormControl sx={{ width: "100%", marginTop: '1rem' }}>
                                <InputLabel id="demo-simple-select-helper-label">Select Your Country</InputLabel>

                                <Select
                                    sx={{ width: '100%' }}
                                    labelId="demo-simple-select-helper-label"
                                    id="demo-simple-select-helper"
                                    value={selectedCountry}
                                    onChange={(e) => setSelectedCountry(e.target.value)}
                                    error={errors.selectedCountry}
                                >
                                    {countries.map((country) => (
                                        <MenuItem key={country} value={country}> {country} </MenuItem>
                                    ))}
                                </Select>

                                {errors.selectedCountry && <FormHelperText error>{errors.selectedCountry}</FormHelperText>}
                            </FormControl>

                            <TextField
                                label="Write your message"
                                multiline
                                variant="outlined"
                                minRows={8}
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                sx={{ width: '100%', marginTop: '1rem' }}
                                error={!!errors.message}
                                helperText={errors.message}
                            />

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
                                    onClick={handleSubmit}
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
export default ContactForm;