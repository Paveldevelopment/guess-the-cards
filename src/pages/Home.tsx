import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import GameBoard from '../components/GameBoard';

const Home: React.FC = () => {
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  return (
    <Box sx={{ p: 4, textAlign: 'center' }}>
      {!gameStarted ? (
        <>
          <Typography variant="h3" gutterBottom>
            Welcome to Guess the Cards!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Test your card knowledge and beat the clock. Are you ready to play?
          </Typography>
          <Button variant="contained" color="primary" onClick={handleStartGame}>
            Start Game
          </Button>
        </>
      ) : (
        <GameBoard />
      )}
    </Box>
  );
};

export default Home;
