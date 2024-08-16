import { ContactForm } from '@components';
import { Grid } from "@mui/material";

const Home = () => {
    return (

        <>
            <Grid
                container
                justifyContent='center'
                alignItems='center'
                direction='column'
                height='100vh'
                sx={{
                   
                    background: 'linear-gradient(70deg, rgba(77,54,100,1) 0%, rgba(186,181,246,1) 100%)',
                    flex: 1
                }}
            >
                <ContactForm />
            </Grid>
        </>
    );
}

export default Home;