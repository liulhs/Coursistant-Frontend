import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, InputAdornment, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import Alert from '@mui/material/Alert';
import './ChatDialog.css';

export default function ChatDialog({ tableName }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [alertInfo, setAlertInfo] = useState({ open: false, text: '', severity: 'info' });
  const [apiChoice, setApiChoice] = useState("A");
  const messagesEndRef = useRef(null);

  const fetchReplyA = async (userMessage) => {
    try {
      const response = await axios.post('http://lax.nonev.win:5000/ask', {
        question: userMessage,
        courseID: tableName
      });

      if (response.data && response.data.hasAnswer) {
        const newMessage = { text: response.data.answer, author: "bot", image: response.data.link[0] };
        setMessages(messages => [...messages, newMessage]);
      } else {
        setMessages(messages => [...messages, { text: "Please wait for the instructor to answer.", author: "bot" }]);
      }
    } catch (error) {
      console.error('Error fetching reply:', error);
      setMessages(messages => [...messages, { text: "Failed to fetch reply, please try again.", author: "bot" }]);
    }
  };

  const fetchReplyB = async (userMessage) => {
    try {
      const response = await axios.post('https://api.e-ta.net/EE542/pdf/query', {
        query: userMessage
      });

      if (response.data && response.data.answer) {
        const newMessage = {
          text: response.data.answer,
          author: "bot",
          image: response.data.image ? `data:image/png;base64,${response.data.image}` : null
        };
        setMessages(messages => [...messages, newMessage]);
      } else {
        setMessages(messages => [...messages, { text: "No answer available, please try again.", author: "bot" }]);
      }
    } catch (error) {
      console.error('Error fetching reply:', error);
      setMessages(messages => [...messages, { text: "Failed to fetch reply, please try again.", author: "bot" }]);
    }
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) {
      openAlert('Please enter your question here.', 'error');
      return;
    } 
    const newMessage = { text: inputMessage, author: "user" };
    setMessages(messages => [...messages, newMessage]);
    setInputMessage("");
    if (apiChoice === "A") {
      await fetchReplyA(inputMessage);
    } else {
      await fetchReplyB(inputMessage);
    }
  };

  const openAlert = (message, severity) => {
    setAlertInfo({ open: true, text: message, severity: severity });
    setTimeout(() => {
      setAlertInfo({ open: false, text: '' });
    }, 5000);
  };

  const closeAlert = () => {
    setAlertInfo({ ...alertInfo, open: false });
  };
  
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  const courseStatusMessage = tableName ? "Currently Asking for: " + tableName : "Please select a course first.";

  return (
    <Box sx={{ maxWidth: 1500, margin: 'auto', p: 0 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <Typography variant="h6">
          Chat with virtual TA here!
        </Typography>
        <Typography variant="subtitle1">
          {courseStatusMessage}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel id="api-choice-label">TA Choice</InputLabel>
          <Select
            labelId="api-choice-label"
            id="api-choice"
            value={apiChoice}
            onChange={(e) => setApiChoice(e.target.value)}
            label="API Choice"
          >
            <MenuItem value="A">Video TA</MenuItem>
            <MenuItem value="B">Slide TA</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box className="message-list" ref={messagesEndRef}>
        {alertInfo.open && (
          <Alert severity="error"> {alertInfo.text} </Alert>
        )}
        {messages.map((message, index) => (
          <Box key={index} sx={{ textAlign: message.author === 'user' ? 'right' : 'left', mb: 1 }}>
            <Typography className="message-author">{message.author.toUpperCase()}</Typography>
            <Box className={`message-bubble ${message.author === 'user' ? 'user-message' : 'bot-message'}`}>
              <Typography>{message.text}</Typography>
              {message.image && <img src={message.image} alt="Related visual content" style={{ maxWidth: '100%', marginTop: 8 }} />}
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ p: 0 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter your question..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' ? handleSend() : null}
          sx={{
            mb: 1,
            '.MuiOutlinedInput-root': {
              borderRadius: '20px',
              borderColor: 'darkgrey',
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: 'dimgrey',
              }
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  onClick={handleSend}
                  disabled={!tableName}
                  sx={{
                    backgroundColor: 'transparent',
                    color: 'grey',
                    '&:hover': {
                      backgroundColor: 'lightgrey',
                    },
                    '&.Mui-disabled': {
                      color: 'lightgray',
                    }
                  }}
                >
                  Send
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
}