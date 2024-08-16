import { UserForm } from '@components';
import { Grid } from "@mui/material";

const UpdateUserPage = () => {

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
                <UserForm isEditMode={true} />
            </Grid>
        </>

    );
}

export default UpdateUserPage;