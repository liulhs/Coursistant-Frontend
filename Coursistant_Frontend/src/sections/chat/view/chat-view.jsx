import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Box } from '@mui/material';
import ChatDialog from './components/ChatDialog'; 
import CourseSelector from './CourseSelector';

export default function ChatView() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState("");

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://lax.nonev.win:5000/list-tables');
        if (response.data && response.data.status === 200) {
          setTables(response.data.Tables);
        }
      } catch (error) {
        console.error('Error fetching tables:', error);
        setTables([]);
      }
    };

    fetchTables();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={2} md={2} sx={{ p: 2, bgcolor: 'grey.100' }}>
          <CourseSelector 
            tables={tables} 
            selectedTable={selectedTable} 
            setSelectedTable={setSelectedTable} 
            prompt="Select the class you want to ask:" 
          />
        </Grid>
        <Grid item xs={12} sm={8} md={8} sx={{ p: 2 }}>
          <ChatDialog tableName={selectedTable} />
        </Grid>
      </Grid>
    </Box>
  );
};

