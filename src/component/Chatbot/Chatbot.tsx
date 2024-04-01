import React, { useState } from 'react';
import { Box, Divider, IconButton, InputBase, Paper } from '@mui/material';

const styles = {
  container: {
    position: 'absolute',
    bottom: '20px',
    right: '100px',
    width: '771px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
  },
  chatbotMessages: {
    height: '535px',
    overflowY: 'auto',
    padding: '8px'
  },
  btn: {
    padding: '8px 16px',
    border: 'none',
    backgroundColor: '#ffd132',
    borderRadius: '0 4px 4px 0',
    fontSize: '16px',
    cursor: 'pointer'
  },
  message: {
    margin: '8px 0',
    padding: '8px',
    borderRadius: '4px',
    fontSize: '16px',
    lineHeight: '1.5'
  },
  userMessage: {
    backgroundColor: '#ffd132',
    textAlign: 'right'
  },
  aiMessage: {
    backgroundColor: '#f0f0f0',
    textAlign: 'left'
  }
};

export default function Chatbot() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Array<{ text: string; user: boolean }>>([]);

  const chat = (): string => {
    return 'hello';
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (input.trim() === '') return;
    const userMessage = { text: input, user: true };
    setMessages(prevMessages => [...prevMessages, userMessage]);
    const aiMessage = { text: '...', user: false };
    setMessages(prevMessages => [...prevMessages, aiMessage]);
    const response = chat();
    if (response !== '') {
      const newAiMessage = { text: response, user: false };
      setMessages(prevMessages => [...prevMessages.slice(0, -1), newAiMessage]);
    }
    setInput('');
  };

  return (
    <Box sx={styles.container}>
      <Box sx={styles.chatbotMessages}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              ...styles.message,
              ...(message.user ? styles.userMessage : styles.aiMessage)
            }}
          >
            {message.text}
          </Box>
        ))}
      </Box>
      <Paper
        onSubmit={handleSubmit}
        component="form"
        sx={{ p: '15px 19px', display: 'flex', alignItems: 'center', border: '1px solid #A2A2A3' }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Write a message..."
          value={input}
          onChange={e => {
            setInput(e.target.value);
          }}
        />
        <Divider sx={{ height: 28, m: 0.5, margin: '0 20px' }} orientation="vertical" />
        <IconButton sx={styles.btn} type="submit" aria-label="directions">
          Send
        </IconButton>
      </Paper>
    </Box>
  );
}
