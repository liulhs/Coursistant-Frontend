import axios from 'axios';
import PropTypes from 'prop-types';
import React, { useRef, useState, useEffect } from 'react';

import Alert from '@mui/material/Alert';
import { Box, Button, Select, MenuItem, TextField, Typography, InputLabel, FormControl, InputAdornment } from '@mui/material';

import './ChatDialog.css';

export default function ChatDialog({ tableName }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [alertInfo, setAlertInfo] = useState({ open: false, text: '', severity: 'info' });
  const [apiChoice, setApiChoice] = useState("A");
  const messagesEndRef = useRef(null);

  const fetchReplyA = async (userMessage) => {
    try {
      const response = await axios.post('http://lax.nonev.win:5079/askChatEngine', {
        question: userMessage
      });

      if (response.data && response.data.response) {
        const text = response.data.response;
        const linkMatch = text.match(/Link with timestamp: (https:\/\/www\.youtube\.com\/watch\?v=[^&]+&t=\d+)/);

        const newMessage = {
          text: linkMatch ? text.split('Link with timestamp:')[0] : text,
          author: "bot",
          videoUrl: linkMatch ? linkMatch[1] : null,
        };

        setMessages(prevMessages => [...prevMessages, newMessage]);
      } else {
        setMessages(prevMessages => [...prevMessages, { text: "No answer available, please try again.", author: "bot" }]);
      }
    } catch (error) {
      console.error('Error fetching reply:', error);
      setMessages(prevMessages => [...prevMessages, { text: "Failed to fetch reply, please try again.", author: "bot" }]);
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
        setMessages(prevMessages => [...prevMessages, newMessage]);
      } else {
        setMessages(prevMessages => [...prevMessages, { text: "No answer available, please try again.", author: "bot" }]);
      }
    } catch (error) {
      console.error('Error fetching reply:', error);
      setMessages(prevMessages => [...prevMessages, { text: "Failed to fetch reply, please try again.", author: "bot" }]);
    }
  };

  const fetchReplyC = async (userMessage) => {
    try {
      const response = await axios.post('http://localhost:5501/query', {
        question: userMessage
      });

      if (response.data && response.data.response) {
        const newMessage = {
          text: response.data.response,
          author: "bot"
        };
        setMessages(prevMessages => [...prevMessages, newMessage]);
      } else {
        setMessages(prevMessages => [...prevMessages, { text: "No answer available, please try again.", author: "bot" }]);
      }
    } catch (error) {
      console.error('Error fetching reply:', error);
      setMessages(prevMessages => [...prevMessages, { text: "Failed to fetch reply, please try again.", author: "bot" }]);
    }
  };

  const handleSend = async () => {
    if (!inputMessage.trim()) {
      openAlert('Please enter your question here.', 'error');
      return;
    } 
    const newMessage = { text: inputMessage, author: "user" };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    setInputMessage("");
    if (apiChoice === "A") {
      await fetchReplyA(inputMessage);
    } else if (apiChoice === "B") {
      await fetchReplyB(inputMessage);
    } else {
      await fetchReplyC(inputMessage);
    }
  };

  const openAlert = (message, severity) => {
    setAlertInfo({ open: true, text: message, severity });
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

  const courseStatusMessage = tableName ? `Currently Asking for: ${  tableName}` : "Please select a course first.";

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
            <MenuItem value="C">Piazza TA</MenuItem>
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
              {message.videoUrl && (
                <iframe
                  width="560"
                  height="315"
                  src={`https://www.youtube.com/embed/${new URL(message.videoUrl).searchParams.get('v')}?start=${new URL(message.videoUrl).searchParams.get('t')}&autoplay=1`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ marginTop: 8 }}
                 />
              )}
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

ChatDialog.propTypes = {
  tableName: PropTypes.string.isRequired
};
