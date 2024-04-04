import React, {useState} from 'react';
import {Box, Button, Divider, IconButton, InputBase, Paper} from '@mui/material';
import {inputBtns} from "../../utils/constants";
import {getProductInfo} from "../../utils/api";

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
        display: "flex",
        flexDirection: "column"
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
        border: "0",
        backgroundColor: "#e5e5e5",
        color: '#606060',
        '&:hover': {
            border: "0",
            backgroundColor: "#efefef",
        },
        textTransform: "none",
        fontSize: "15px",
    }
};

export default function Chatbot() {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<Array<{ text: string; user: boolean }>>([]);
    // const formRef = React.useRef(null);

    const [botMessage, setBotMessage] = useState<string>('');

    console.log(botMessage)

    const chat = (): string => {
        return 'hello';
    };

    const addMessage = (text: string, user: boolean) => {
        setMessages(prevMessages => [...prevMessages, {text, user}]);
        const aiMessage = {text: '...', user: false};
        setMessages(prevMessages => [...prevMessages, aiMessage]);
        const response = chat();
        if (response !== '') {
            const newAiMessage = {text: response, user: false};
            setMessages(prevMessages => [...prevMessages.slice(0, -1), newAiMessage]);
        }
        setInput('');
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (input.trim() === '') return;

        addMessage(input, true);
    };

    const sendInput = (value: string) => {
        // setInput(value);
        addMessage(value, true);
        getProductInfo().then((res) => {
            setBotMessage(res.text)
        })
    }

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
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "10px",
                    margin: "8px 0",
                    justifyContent: "flex-end"
                }}>
                    {inputBtns.map(element => (
                        <Button variant="outlined"
                                key={element.value}
                                sx={styles.inputBtn}
                                onClick={() => sendInput(element.value)}
                        >
                            {element.value}
                        </Button>
                    ))}
                </div>
            </Box>
            <Paper
                onSubmit={handleSubmit}
                component="form"
                sx={{p: '15px 19px', display: 'flex', alignItems: 'center', border: '1px solid #A2A2A3'}}
            >
                <InputBase
                    sx={{ml: 1, flex: 1}}
                    placeholder="Write a message..."
                    value={input}
                    onChange={e => {
                        setInput(e.target.value);
                    }}
                />
                <Divider sx={{height: 28, m: 0.5, margin: '0 20px'}} orientation="vertical"/>
                <IconButton sx={styles.btn} type="submit" aria-label="directions">
                    Send
                </IconButton>
            </Paper>
        </Box>
    );
}
