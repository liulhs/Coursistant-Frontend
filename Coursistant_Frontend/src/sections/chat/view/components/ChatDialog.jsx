// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios';
// import { Box, TextField, Button, Typography, InputAdornment } from '@mui/material';
// // import SendIcon from '@mui/icons-material/Send'; 
// import Alert from '@mui/material/Alert';
// import './ChatDialog.css';

// export default function ChatDialog({ tableName }) {
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [alertInfo, setAlertInfo] = useState({ open: false, text: '', severity: 'info' });
//   const messagesEndRef = useRef(null);

// // const fetchReply = async (userMessage) => {
//   //   try {
//   //     const response = await axios.post('http://lax.nonev.win:5000/ask', {
//   //       question: userMessage,
//   //       courseID: tableName
//   //     });

//   //     if (response.data && response.data.hasAnswer) {
//   //       const newMessage = { text: response.data.answer, author: "bot", image: response.data.link[0] };
//   //       setMessages(messages => [...messages, newMessage]);
//   //     } else {
//   //       setMessages(messages => [...messages, { text: "Please wait for the instructor to answer.", author: "bot" }]);
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching reply:', error);
//   //     setMessages(messages => [...messages, { text: "Failed to fetch reply, please try again.", author: "bot" }]);
//   //   }
//   // };

//   const fetchReply = async (userMessage) => {
//     try {
//       const response = await axios.post('http://lax.nonev.win:5079/askChatEngine', {
//         question: userMessage
//       });

//       if (response.data && response.data.response) {
//         const newMessage = {
//           text: response.data.response,
//           author: "bot",
//         };
//         setMessages(messages => [...messages, newMessage]);
//       } else {
//         setMessages(messages => [...messages, { text: "No answer available, please try again.", author: "bot" }]);
//       }
//     } catch (error) {
//       console.error('Error fetching reply:', error);
//       setMessages(messages => [...messages, { text: "Failed to fetch reply, please try again.", author: "bot" }]);
//     }
//   };

//   const handleSend = async () => {
//     if (!inputMessage.trim()) {
//       openAlert('Please enter your question here.', 'error');
//       return;
//     } 
//     const newMessage = { text: inputMessage, author: "user" };
//     setMessages(messages => [...messages, newMessage]);
//     setInputMessage("");
//     await fetchReply(inputMessage);
//   };

//   const openAlert = (message, severity) => {
//     setAlertInfo({ open: true, text: message, severity: severity });
//     setTimeout(() => {
//       setAlertInfo({ open: false, text: '' });
//     }, 5000);
//   };

//   const closeAlert = () => {
//     setAlertInfo({ ...alertInfo, open: false });
//   };
  
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const courseStatusMessage = tableName ? "Currently Asking for: " + tableName : "Please select a course first.";

//   return (
//     <Box sx={{ maxWidth: 1500, margin: 'auto', p: 0 }}>
//       <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
//         <Typography variant="h6">
//           Chat with virtual TA here!
//         </Typography>
//         <Typography variant="subtitle1">
//           {courseStatusMessage}
//         </Typography>
//       </Box>
//       <Box className="message-list" ref={messagesEndRef}>
//         {alertInfo.open && (
//           <Alert severity="error"> {alertInfo.text} </Alert>
//         )}
//         {messages.map((message, index) => (
//             <Box key={index} sx={{ textAlign: message.author === 'user' ? 'right' : 'left', mb: 1 }}>
//                 <Typography className="message-author">{message.author.toUpperCase()}</Typography>
//                 <Box className={`message-bubble ${message.author === 'user' ? 'user-message' : 'bot-message'}`}>
//                     <Typography>{message.text}</Typography>
//                     {message.image && <img src={message.image} alt="Related visual content" style={{ maxWidth: '100%', marginTop: 8 }} />}
//                 </Box>
//             </Box>
//         ))}
//       </Box>
//       <Box sx={{ p: 0 }}>
//           <TextField
//               fullWidth
//               variant="outlined"
//               placeholder="Enter your question..."
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               onKeyDown={(e) => e.key === 'Enter' ? handleSend() : null}
//               sx={{
//                   mb: 1,
//                   '.MuiOutlinedInput-root': {
//                       borderRadius: '20px',
//                       borderColor: 'darkgrey',
//                       '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//                           borderColor: 'dimgrey',
//                       }
//                   }
//               }}
//               InputProps={{
//                   endAdornment: (
//                       <InputAdornment position="end">
//                           <Button
//                               onClick={handleSend}
//                               disabled={!tableName}
//                               sx={{
//                                   backgroundColor: 'transparent',
//                                   color: 'grey',
//                                   '&:hover': {
//                                       backgroundColor: 'lightgrey',
//                                   },
//                                   '&.Mui-disabled': {
//                                       color: 'lightgray',
//                                   }
//                               }}
//                           >
//                           Send
//                           </Button>
//                       </InputAdornment>
//                   ),
//               }}
//           />
//       </Box>
//     </Box>
//   );
// }
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, InputAdornment } from '@mui/material';
import Alert from '@mui/material/Alert';
import './ChatDialog.css';

export default function ChatDialog({ tableName }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [alertInfo, setAlertInfo] = useState({ open: false, text: '', severity: 'info' });
  const messagesEndRef = useRef(null);

  const fetchReply = async (userMessage) => {
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
        console.log(linkMatch[1])
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
    await fetchReply(inputMessage);
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
              ></iframe>
              )}
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