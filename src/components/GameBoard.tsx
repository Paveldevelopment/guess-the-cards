import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timer from './Timer';
import CardDeck, { CardData } from './CardDeck';
import HandOptions, { HandOption } from './HandOptions';
import FunnyMessage from './FunnyMessage';
import Summary from './Summary';

const GameBoard: React.FC = () => {
  const [time, setTime] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [round, setRound] = useState(0);

  // Dummy card data (could be generated or fetched based on game logic)
  const sampleCards: CardData[] = [
    { rank: 'A', suit: '♠' },
    { rank: 'K', suit: '♥' },
    { rank: 'Q', suit: '♦' },
    { rank: 'J', suit: '♣' },
    { rank: '10', suit: '♠' },
  ];

  const handOptions: HandOption[] = [
    { label: 'Straight Flush', value: 'straight_flush' },
    { label: 'Four of a Kind', value: 'four_of_a_kind' },
    { label: 'Full House', value: 'full_house' },
  ];

  // Countdown timer effect
  useEffect(() => {
    if (time <= 0) {
      setGameOver(true);
      return;
    }
    const interval = setInterval(() => {
      setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  // Logic when a hand option is selected
  const handleOptionSelect = (selectedValue: string) => {
    // Here you can integrate PokerSolver logic to check if the selected hand ranking is correct.
    // For demonstration purposes, we'll assume the answer is always correct.
    setAttempts(prev => [...prev, `Round ${round + 1}: ${selectedValue}`]);
    setTotalCorrect(prev => prev + 1);
    setRound(prev => prev + 1);
    // Add bonus time for a correct answer
    setTime(prev => prev + 5);
  };

  // When game is over, show summary
  if (gameOver) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="h4" gutterBottom>
          Game Over!
        </Typography>
        <Summary totalCorrect={totalCorrect} attempts={attempts} />
      </Box>
    );
  }

  // Main game view
  return (
    <Box sx={{ p: 2 }}>
      <Timer time={time} />
      <CardDeck cards={sampleCards} onCardClick={i => console.log(`Card ${i} clicked`)} />
      <HandOptions options={handOptions} onSelect={handleOptionSelect} />
      <FunnyMessage trigger={round} />
    </Box>
  );
};

export default GameBoard;
