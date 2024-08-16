import { Navbar } from '@components';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchUser } from "../../api/fetchUser"
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    Grid,
    Box,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Avatar
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const UsersPage = () => {

    const { user, checked } = useAuth();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
   
    useEffect(() => {

        if (checked && user) {    
            const getUsers = async () => {
                try {
                    const usersData = await fetchUser();
                    setUsers(usersData.data.users)
                } catch (error) {
                    console.log("hata")
                }
            };
            getUsers();
        }
    }, [checked, user]); 

    const handleEdit = (id) => {
        console.log(id)
        navigate(`/user/update/${id}`)
    }

    return (
        <>

            <Navbar user={user}></Navbar>

            <Grid
                container
                justifyContent='center'
                alignItems='center'
                direction='row'
                minHeight='100vh'
                sx={{
                    backgroundColor: '#FAFAFA',
                    flex: 1
                }}
            >
                <TableContainer sx={{ marginTop: '6rem', width: '94%' }}>
                    <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
                        <TableHead >
                            <TableRow >
                                <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', width: { xs: '15%', sm: '20%' } }}>Profil Photo</TableCell>
                                <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', width: { xs: '5%', sm: '5%' } }}>ID</TableCell>
                                <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', width: { xs: '20%', sm: '20%' } }}>Username</TableCell>
                                <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', width: { xs: '20%', sm: '20%' } }}>Role</TableCell>
                                <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', width: { xs: '20%', sm: '20%' } }}>Password</TableCell>
                                <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', width: { xs: '20%', sm: '20%' } }}>Edit</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {users.map((user, i) => (
                                <TableRow key={i}>
                                    <TableCell sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Avatar alt="userphoto" src={user.base64Photo} sx={{ width: '4rem', height: '4rem' }} />
                                    </TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.id}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.username}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.role}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }}>{user.password}</TableCell>
                                    <TableCell sx={{ textAlign: 'center' }} >
                                        <Tooltip title="edit" arrow>
                                            <IconButton onClick={() => handleEdit(user.id)}>
                                                <EditIcon sx={{ fontSize: '2rem', margin: '0.5rem' }} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ width: '85%', display: 'flex', justifyContent: 'flex-end' }}>
                    <Tooltip title="Add new user" arrow>
                        <IconButton onClick={() => navigate('/user/add-reader')}>
                            <PersonAddAlt1Icon sx={{ fontSize: '2.5rem' }} />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Grid>
        </>

    );
}

export default UsersPage;