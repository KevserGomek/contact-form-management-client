import { Navbar, SnackbarNotification } from '@components';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { fetchMessages,deleteMessage, markAsRead } from "../../api/fetchMessages"
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

const MessagesPage = () => {

  const { user, checked } = useAuth();
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {

    if (!checked) return;

    const getMessages = async () => {
      try {
        const messagesData = await fetchMessages();
        console.log(messagesData)
        setMessages(messagesData.data.messages)
      } catch (error) {
        console.log("hata")

      }
    };
    getMessages(); 

  }, [checked]);

  const handleDelete = async (id) => {

    const confirmed = window.confirm('Are you sure you want to delete this message?')
    if (!confirmed) return;

    try {
      const result = await deleteMessage(id);

      console.log('User deleted successfully:', result);
      setMessages(prevMessages => prevMessages.filter(message => message.id !== id));

      setSnackbarMessage('Message deleted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

    } catch (error) {
      console.error('Error deleting user:', error);
      setSnackbarMessage('Error deleting message!');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleRead = async (id) => {
    try {
      console.log(id)
      await markAsRead(id);
      setMessages(messages.map(message =>
        message.id === id ? { ...message, read: 'true' } : message
      ));
      navigate(`/message/${id}`)
    } catch (error) {
      console.error('Error deleting:', error);
    }
  }

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>

      <Grid
        container
        justifyContent='flex-start'
        alignItems='center'
        direction='column'
        height='100vh'
        sx={{
          backgroundColor: '#FAFAFA',
          flex: 1
        }}
      >

        <Navbar user={user} />

        <TableContainer sx={{ marginTop: '6rem', marginBottom: '2rem', width: '96%' }}>
          <Table stickyHeader sx={{ tableLayout: 'fixed' }} >
            <TableHead >
              <TableRow >
                <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', width: { xs: 'auto', sm: '5%' } }}>ID</TableCell>
                <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', width: { xs: 'auto', sm: '20%' } }}>Name</TableCell>
                <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', width: { xs: 'auto', sm: '20%' } }}>Gender</TableCell>
                <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', width: { xs: 'auto', sm: '20%' } }}>Country</TableCell>
                <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1rem', width: { xs: 'auto', sm: '30%' } }}>Message</TableCell>
                {user.role === 'admin' && (
                  <TableCell sx={{ backgroundColor: '#FAFAFA', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem', width: { xs: 'auto', sm: '5%' } }}></TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {messages.map((message, i) => (
                <TableRow
                  sx={{
                    cursor: 'pointer', '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.1)'
                    }
                  }}
                  onClick={() => handleRead(message.id)} key={i}
                >
                  <TableCell sx={{ height: '3rem', textAlign: 'center', fontWeight: message.read === 'false' ? 'bolder' : 'normal' }}>{message.id}</TableCell>
                  <TableCell sx={{ height: '3rem', textAlign: 'center', fontWeight: message.read === 'false' ? 'bolder' : 'normal' }}>{message.name}</TableCell>
                  <TableCell sx={{ height: '3rem', textAlign: 'center', fontWeight: message.read === 'false' ? 'bolder' : 'normal' }}>{message.gender}</TableCell>
                  <TableCell sx={{ height: '3rem', textAlign: 'center', fontWeight: message.read === 'false' ? 'bolder' : 'normal' }}>{message.country}</TableCell>
                  <TableCell 
                  sx={{
                    height: '3rem', 
                    textAlign: 'center', 
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: message.read === 'false' ? 'bolder' : 'normal'
                  }}>{message.message}</TableCell>

                  {user.role === 'admin' && (
                    <TableCell sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1rem' }} onClick={(e) => e.stopPropagation()} >
                      <Tooltip title="delete the message" arrow>
                        <IconButton onClick={() => handleDelete(message.id)}>
                          <DeleteIcon sx={{ fontSize: '2rem' }} />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

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

export default MessagesPage;