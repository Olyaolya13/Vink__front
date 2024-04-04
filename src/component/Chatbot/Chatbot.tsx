import { useState } from 'react';
import { Box, Button, Divider, IconButton, InputBase, Paper } from '@mui/material';
import { inputBtns } from '../../utils/constants';
import * as api from '../../utils/api.ts';

const styles = {
  container: {
    position: 'absolute',
    bottom: '-120px',
    right: '100px',
    width: '771px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#f8f8f8',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    zIndex: '100'
  },
  chatbotMessages: {
    height: '535px',
    overflowY: 'auto',
    padding: '8px',
    display: 'flex',
    flexDirection: 'column'
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
  },
  inputBtn: {
    border: '0',
    backgroundColor: '#e5e5e5',
    color: '#606060',
    '&:hover': {
      border: '0',
      backgroundColor: '#efefef'
    },
    textTransform: 'none',
    fontSize: '15px'
  }
};

export default function Chatbot() {
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<{ text: string; user: boolean }[]>([]);

  const handleButtonClick = async (value: string) => {
    let responseText = '';
    switch (value) {
      case 'Информация по заказу':
        try {
          const response = await api.getOrderInfo(responseText);
          responseText = response.text;
        } catch (error) {
          console.error('Error fetching product information:', error);
        }
        break;
      case 'Консультация по товару':
        try {
          const response = await api.getProductConsultation(responseText);
          responseText = response.text;
        } catch (error) {
          console.error('Error sending consultation request:', error);
        }
        break;
      //   case 'Проверить наличие товара':
      //     try {
      //       const response = await api.getCheckProduct();
      //       responseText = response.text;
      //     } catch (error) {
      //       console.error('Error checking product availability:', error);
      //     }
      //     break;
      case 'Задать свой вопрос':
        responseText = 'Введите ваш вопрос...';
        break;
      default:
        break;
    }

    setMessages(prevMessages => [...prevMessages, { text: value, user: true }]);
    if (responseText !== '') {
      setMessages(prevMessages => [...prevMessages, { text: responseText, user: false }]);
    }
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
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            margin: '8px 0',
            justifyContent: 'flex-end'
          }}
        >
          {inputBtns.map(element => (
            <Button
              variant="outlined"
              key={element.value}
              sx={styles.inputBtn}
              onClick={() => handleButtonClick(element.value)}
            >
              {element.value}
            </Button>
          ))}
        </div>
      </Box>
      <Paper
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
