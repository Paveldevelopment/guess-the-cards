import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { MessageContainer } from './FunnyMessageStyles';
import { fetchRandomWord } from '../services/randomWordApi';

interface FunnyMessageProps {
  trigger?: number;
}

const FunnyMessage: React.FC<FunnyMessageProps> = ({ trigger }) => {
  const [message, setMessage] = useState<string>('Loading funny message...');

  useEffect(() => {
    const getRandomWord = async () => {
      try {
        const word = await fetchRandomWord();
        setMessage(`You're so ${word}!`);
      } catch (error) {
        console.error('Error fetching random word:', error);
        setMessage("You're hilarious!");
      }
    };

    getRandomWord();
  }, [trigger]);

  return (
    <MessageContainer>
      <Typography variant="h6">{message}</Typography>
    </MessageContainer>
  );
};

export default FunnyMessage;
