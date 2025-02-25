import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { MessageContainer } from './FunnyMessageStyles';
import { fetchRandomWord } from '../services/randomWordApi';

interface FunnyMessageProps {
  trigger?: number;
}

const funnyMessageCache: Record<number, string> = {};
const funnyMessagePromises: Record<number, Promise<string>> = {};

const FunnyMessage: React.FC<FunnyMessageProps> = ({ trigger = 0 }) => {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    setMessage("");

    
    if (funnyMessageCache[trigger]) {
      setMessage(funnyMessageCache[trigger]);
      return;
    }

    
    if (!funnyMessagePromises[trigger]) {
      funnyMessagePromises[trigger] = fetchRandomWord()
        .then(word => {
          const msg = `You're so ${word}!`;
          funnyMessageCache[trigger] = msg;
          return msg;
        })
        .catch(error => {
          console.error('Error fetching random word:', error);
          const msg = "You're hilarious!";
          funnyMessageCache[trigger] = msg;
          return msg;
        });
    }

    funnyMessagePromises[trigger].then(msg => {
      setMessage(msg);
    });
  }, [trigger]);

  return (
    <MessageContainer
    >
      {message ? (
        <Typography variant="h6">{message}</Typography>
      ) : (
        <CircularProgress />
      )}
    </MessageContainer>
  );
};

export default FunnyMessage;
