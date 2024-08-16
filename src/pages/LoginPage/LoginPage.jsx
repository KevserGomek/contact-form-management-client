import * as React from 'react';
import {
    Grid,
    Typography,
    TextField,
    FormControl,
    Button,
    Card,
    CardContent,
    InputLabel,
    ButtonGroup,
    OutlinedInput,
    InputAdornment,
    IconButton
} from "@mui/material";

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {

    const { handleLogin, user, setUser, checked, setChecked } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const clearInputs = () => {
        setUsername('')
        setPassword('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoginError('')

        try {
            const user = await handleLogin(username, password);

            if (user) {
                navigate('/messages')
            }

        } catch (error) {
            setLoginError('Invalid username or password');
            clearInputs();
        }
    };

    return (

        <>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                direction='column'
                height='100vh'
                sx={{
                    background: 'rgb(77,54,100)',
                    background: 'linear-gradient(70deg, rgba(77,54,100,1) 0%, rgba(186,181,246,1) 100%)',
                    flex: 1
                }}
            >
                <Grid item xs={12} sm={6} md={5} sx={{
                    width: {
                        xs: '100%',
                        sm: '100%',
                        md: 500,
                    },
                }}>
                    <Card
                        sx={{
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            backgroundColor: '#FAFAFA',
                            borderRadius: "10px"
                        }}
                    >
                        <CardContent sx={{ marginTop: '1rem', width: '90%' }}>
                            <Typography variant='h4' textAlign="center" marginBottom="2rem" gutterBottom>Login</Typography>

                            {loginError && (
                                <Typography variant='body2' color='error' textAlign="center" marginBottom="1rem">
                                    {loginError}
                                </Typography>
                            )}

                            <form onSubmit={handleSubmit}>
                                <TextField
                                    value={username || ''}
                                    onChange={(e) => setUsername(e.target.value)}
                                    label="Username"
                                    variant="outlined"
                                    sx={{ width: "100%", marginBottom: '1rem' }}
                                />

                                <FormControl sx={{ width: "100%" }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>

                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={password || ''}
                                        onChange={(e) => setPassword(e.target.value)}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>

                                <ButtonGroup
                                    variant="contained"
                                    sx={{
                                        border: "none",
                                        boxShadow: "none",
                                        width: '100%',
                                        marginTop: '1rem',
                                        display: 'flex',
                                        justifyContent: 'center'
                                    }}>
                                    <Button
                                        onClick={handleSubmit}
                                        variant="contained"
                                        type='submit'
                                        sx={{

                                            backgroundColor: '#4d3664',
                                            color: 'white',
                                            padding: '1rem 4rem',
                                            borderRadius: '8px',
                                            '&:hover': {
                                                backgroundColor: '#40245c',
                                            },
                                        }}
                                    >
                                        LOGIN
                                    </Button>
                                </ButtonGroup>
                            </form>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>

    );
}

export default LoginPage;