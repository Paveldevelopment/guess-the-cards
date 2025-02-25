import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timer from './Timer';
import CardDeck from './CardDeck';
import HandOptions from './HandOptions';
import Summary from './Summary';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { solveHand, CardData } from '../services/pokerSolverService';
import useTimer from '../hooks/useTimer';
import FunnyMessage from './FunnyMessage';

const allHandOptions = [
  'Straight Flush',
  'Four of a Kind',
  'Full House',
  'Flush',
  'Straight',
  'Three of a Kind',
  'Two Pair',
  'One Pair',
  'High Card',
];

const generateDeck = (): CardData[] => {
  const ranks = [
    'A',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
  ];
  const suits = ['♠', '♥', '♦', '♣'];
  return suits.flatMap((suit) => ranks.map((rank) => ({ rank, suit })));
};

const shuffleArray = <T,>(array: T[]): T[] =>
  array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);

const GameBoard: React.FC = () => {
  const { time, addTime, startTimer, stopTimer } = useTimer(100);
  const [gameOver, setGameOver] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [round, setRound] = useState(0);
  const [currentCards, setCurrentCards] = useState<CardData[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>('');
  const [cardsRevealed, setCardsRevealed] = useState(false);
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean>(false);

  const dealNewRound = () => {
    stopTimer();
    const deck = shuffleArray(generateDeck());
    const dealtCards = deck.slice(0, 5);
    setCardsRevealed(false);

    const answer = solveHand(dealtCards);
    const distractorPool = allHandOptions.filter((opt) => opt !== answer);
    const shuffledDistractors = shuffleArray(distractorPool);
    const distractors = shuffledDistractors.slice(0, 2);
    const options = shuffleArray([answer, ...distractors]);

    setCurrentCards(dealtCards);
    setCorrectAnswer(answer);
    setCurrentOptions(options);

    setTimeout(() => {
      setCardsRevealed(true);
      startTimer();
    }, 1000);
  };

  useEffect(() => {
    dealNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (time <= 0) {
      setGameOver(true);
    }
  }, [time]);

  const handleOptionSelect = (selectedValue: string) => {
    const wasCorrect = selectedValue === correctAnswer;
    setAttempts((prev) => [
      ...prev,
      `Round ${round + 1}: Selected "${selectedValue}" (Correct: "${correctAnswer}")`,
    ]);
    setLastAnswerCorrect(wasCorrect);
    stopTimer();
    if (wasCorrect) {
      setTotalCorrect((prev) => prev + 1);
      addTime(5);
    } else {
      addTime(-5);
    }
    setShowAnswerModal(true);
    setRound((prev) => prev + 1);
    setTimeout(() => {
      setShowAnswerModal(false);
      dealNewRound();
    }, 2000);
  };

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

  return (
    <Box sx={{ p: 2 }}>
      <Timer time={time} />
      <CardDeck
        cards={currentCards.map((card) => ({ ...card, faceUp: cardsRevealed }))}
        onCardClick={(i) => console.log(`Card ${i} clicked`)}
      />
      <HandOptions
        options={currentOptions.map((option) => ({
          label: option,
          value: option,
        }))}
        onSelect={handleOptionSelect}
      />

      <Dialog open={showAnswerModal}>
        <DialogTitle>{lastAnswerCorrect ? 'Correct!' : 'Wrong!'}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {lastAnswerCorrect
              ? 'You earned +5 seconds!'
              : 'You lost 5 seconds!'}
          </Typography>

          <FunnyMessage trigger={round} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GameBoard;
