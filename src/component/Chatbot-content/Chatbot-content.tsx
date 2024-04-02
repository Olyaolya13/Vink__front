import { Box, IconButton, Stack } from '@mui/material';
import TelegramIcon from '../../assets/TelegrammIcon.svg?react';
import Bot from '../../assets/BotIcon.svg?react';
import {useEffect, useState} from 'react';
import Chatbot from '../Chatbot/Chatbot';
import Overlay from "../overlay/overlay";

const styles = {
  container: { position: 'absolute', bottom: '70px', right: '0', zIndex: 10 },
  content: { display: 'flex', flexDirection: 'column', alignItems: 'center' }
};

export default function ChatbotContent() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  // console.log(isChatbotOpen)

  const toggleChatbot = () => {
    setIsChatbotOpen(prevState => !prevState);
  };

  const closeChatbot = () => {
    setIsChatbotOpen(false)
  };

  useEffect(() => {
    function closeEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeChatbot()
      }
    }
    document.addEventListener('keydown', closeEsc)
    return () => document.removeEventListener('keydown', closeEsc)
  }, []);

  return (
    <Stack direction="row" spacing={1} sx={styles.container}>
      <Box sx={styles.content}>
        <IconButton color="secondary" onClick={toggleChatbot}>
          <Bot />
        </IconButton>

        <Overlay closeChatbot={closeChatbot}/>
        {isChatbotOpen && <Chatbot />}

        <TelegramIcon />
      </Box>
    </Stack>
  );
}
