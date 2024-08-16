import { Box, Typography, Grid } from "@mui/material";
import notFound from '../../assets/notFound.svg'

const NotFoundPage = () => {

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
                    sx={{display:'flex', flexDirection:'column', alignItems:'center', justifyItems:'center' }}
                >
                    <Box
                        display='flex'

                        justifyContent='center'>
                        <Typography variant="h1" color="#40245c" fontWeight="bold">404</Typography>

                    </Box>

                    <Box
                        display='flex'
                        justifyContent='center'>
                        <Typography variant="h3" color="#40245c" fontWeight="bold">Opss! Page Not Found! </Typography>

                    </Box>

                    <Box

                        component="img"
                        src={notFound}
                        alt=""
                        sx={{ width: '80%', height: 'auto', marginBottom: '2rem' }}
                    />

                </Grid>
            </Grid>
        </>

    );
}

export default NotFoundPage;