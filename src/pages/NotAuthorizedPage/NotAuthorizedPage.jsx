import { useNavigate } from "react-router-dom";
import { Button, Box, Typography, Grid } from "@mui/material";
import notAuth from '../../assets/notAuth.svg'

const NotAuthorizedPage = () => {

    const navigate = useNavigate();

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
                <Grid item
                    xs={10} sm={7} md={3}
                >
                    <Box

                        component="img"
                        src={notAuth}
                        alt=""
                        sx={{ width: '100%', height: 'auto', marginBottom: '2rem' }}
                    />

                    <Box
                        display='flex'
                        justifyContent='center'>
                        <Typography variant="h4" color="#40245c">No authorization found.</Typography>
                    </Box>

                    <Box
                        display='flex'
                        justifyContent='center'>
                        <Typography variant="h6" color="#FAFAFA">This page is not publically available.</Typography>
                    </Box>
                    <Box
                        display='flex'
                        justifyContent='center'>
                        <Typography variant="h6" color="#FAFAFA">To access it please login first.</Typography>
                    </Box>

                    <Box
                        display='flex'
                        justifyContent='center'
                        sx={{ marginTop: '1rem', marginBottom: '1rem' }}>
                        <Button variant="contained"
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
                            onClick={() => navigate('/')}>
                            Return Home</Button>
                    </Box>
                </Grid>
            </Grid>
        </>

    );
}

export default NotAuthorizedPage;