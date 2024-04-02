import { IconButton, Stack } from '@mui/material';
import ChatbotBTN from '../../assets/ChatbotBTN.svg?react';
import { useState } from 'react';
import ChatbotContent from '../Chatbot-content/Chatbot-content';

const styles = {
  container: { position: 'absolute', bottom: '90px', right: '50px'}
};

export default function ChatbotBtn() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(prevState => !prevState);
  };

  return (
    <Stack direction="row" spacing={1} sx={styles.container}>
      <IconButton color="secondary" onClick={toggleChatbot}>
        <ChatbotBTN />
      </IconButton>
      {isOpen && <ChatbotContent />}
    </Stack>
  );
}
