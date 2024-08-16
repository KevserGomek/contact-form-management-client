import { Navbar } from '@components';
import * as React from 'react';
import {
  Grid,
  Typography,
  Card,
  Box,
} from "@mui/material";
import { getMessageById } from '../../api/fetchMessages'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MessageDetailPage = () => {

  const { user } = useAuth();
  const [selectedMessage, setSelectedMessage] = useState([])
  const { id } = useParams();

  useEffect(() => {

    const getMessage = async () => {
      try {
        const result = await getMessageById(id);
        setSelectedMessage(result.data.message)
      } catch (error) {
        console.log(error)
      }
    };
    getMessage();

  }, []);

  return (

    <>
      <Navbar user={user} />

      <Grid
        container
        alignItems='center'
        direction='column'
        height='100vh'
        sx={{
          background: 'rgb(77,54,100)',
          background: 'linear-gradient(70deg, rgba(77,54,100,1) 0%, rgba(186,181,246,1) 100%)',
          flex: 1,
          paddingTop: {
            xs: '50px',
            sm: '150px',
            md: '140px'
          },
          paddingBottom: '15px'
        }}
      >
        <Grid item xs={12} sm={6} md={12}>
          <Card
            sx={{
              width: {
                md: '1450px',
                xs: '95vw'
              },
              margin: '2px',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: '#FAFAFA',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '8px'
            }}
          >
            <Box width="95%" marginTop="2.5rem">
              <Typography variant='h5' color="#40245c">
                {selectedMessage.name}
              </Typography>
            </Box>

            <Box
              sx={{
                minHeight: "80%",
                width: '95%',
                marginTop: "1.5rem",
                border: '1px solid grey',
                borderRadius: "8px",

              }}>
              <Typography variant='p' fontSize="1.1rem" display="flex" alignItems="flex-end" margin="1.5rem" sx={{ fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' }}>{selectedMessage.message}</Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>

  );
}

export default MessageDetailPage;