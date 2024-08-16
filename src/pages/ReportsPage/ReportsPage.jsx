import { useNavigate } from "react-router-dom";

import { Button, Box, Typography, Grid } from "@mui/material";
import { Navbar } from "../../components"
import notAuth from '../../assets/notAuth.svg'
import { BarChart, PieChart } from '@mui/x-charts';
import { useEffect, useState } from "react";
import { fetchMessages } from "../../api/fetchMessages";
import { useAuth } from '../../context/AuthContext';
const ReportsPage = () => {
  const [messages, setMessages] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [formattedData, setFormattedData] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const { user } = useAuth();

  const [chartWidth, setChartWidth] = useState(window.innerWidth < 600 ? window.innerWidth - 40 : 600);
  const [chartHeight, setChartHeight] = useState(300);

  useEffect(() => {

    const handleResize = () => {
      setChartWidth(window.innerWidth < 600 ? window.innerWidth - 40 : 600);
      setChartHeight(window.innerWidth < 600 ? 200 : 300);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);

  }, []);

  useEffect(() => {

    const getMessages = async () => {
      try {
        const messagesData = await fetchMessages();
        console.log(messagesData)
        setMessages(messagesData.data.messages)

        const genderCounts = messagesData.data.messages.reduce((acc, message) => {
          acc[message.gender] = (acc[message.gender] || 0) + 1;
          return acc;
        }, {});

      } catch (error) {
        console.log("hata")
      }
    };
    getMessages();
    console.log(messages)

  }, [])

  useEffect(() => {
  
    const genderCounts = messages.reduce((acc, message) => {
      acc[message.gender] = (acc[message.gender] || 0) + 1;
      return acc;
    }, {});

    const formatted = Object.entries(genderCounts).map(([gender, count]) => ({
      id: gender,
      label: gender,
      value: count,
    }));

    setFormattedData(formatted);
    console.log(formattedData)
   
  }, [messages]);

  useEffect(() => {
    if (messages.length > 0) {
      const countryCounts = messages.reduce((acc, message) => {
        acc[message.country] = (acc[message.country] || 0) + 1;
        return acc;
      }, {});

      const xAxisData = Object.keys(countryCounts); 
      const seriesData = Object.values(countryCounts); 

      setCountryData({
        xAxisData,
        seriesData,
      });
    }
  }, [messages]);

  const colors = ['#40245c', '#BAB5F6'];

  return (

    <>
      <Grid
        container
        justifyContent='center'
        alignItems='center'
        direction='row'
        minHeight='100vh'
        sx={{
          background: 'rgb(77,54,100)',
          background: 'linear-gradient(70deg, rgba(77,54,100,1) 0%, rgba(186,181,246,1) 100%)',
          flex: 1
        }}
      >
        <Navbar user={user} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: "20px", marginTop: '100px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', maxWidth: '500px' }} >
            <Typography>Pie Chart</Typography>

            <PieChart
              colors={colors}
              series={[
                {
                  data: formattedData,
                  label: {
                    visible: true,
                    formatter: (value) => `${value.label}: ${value.value}`,
                  },
                },
              ]}
              width={chartWidth}
              height={chartHeight}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', maxWidth: '500px' }}>
            <BarChart sx={{ backgroundColor: '' }}
              xAxis={[
                {
                  id: 'barCategories',
                  data: countryData.xAxisData || [],
                  scaleType: 'band',
                },
              ]}
              series={[
                {
                  data: countryData.seriesData || [],
                  color: '#40245c',
                },
              ]}
              width={chartWidth}
              height={chartHeight}
            />
          </Box>
        </Box>
      </Grid>
    </>

  );
}

export default ReportsPage;