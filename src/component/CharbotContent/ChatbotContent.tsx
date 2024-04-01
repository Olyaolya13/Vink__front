import { Box, IconButton, Stack } from '@mui/material';
import TelegramIcon from '../../assets/TelegrammIcon.svg?react';
import Bot from '../../assets/BotIcon.svg?react';
import { useState } from 'react';
import Chatbot from '../Chatbot/Chatbot';

const styles = {
  container: { position: 'absolute', bottom: '70px', right: '0' },
  content: { display: 'flex', flexDirection: 'column', alignItems: 'center' }
};

export default function ChatbotContent() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(prevState => !prevState);
  };
  return (
    <Stack direction="row" spacing={1} sx={styles.container}>
      <Box sx={styles.content}>
        <IconButton color="secondary" onClick={toggleChatbot}>
          <Bot />
          {isChatbotOpen && <Chatbot />}
        </IconButton>
        <TelegramIcon />
      </Box>
    </Stack>
  );
}
