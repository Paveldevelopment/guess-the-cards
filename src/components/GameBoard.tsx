import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Timer from './Timer';
import CardDeck from './CardDeck';
import HandOptions from './HandOptions';
import FunnyMessage from './FunnyMessage';
import Summary from './Summary';
import { solveHand, CardData } from '../services/pokerSolverService';
import useTimer from '../hooks/useTimer';

const allHandOptions = [
  "Straight Flush",
  "Four of a Kind",
  "Full House",
  "Flush",
  "Straight",
  "Three of a Kind",
  "Two Pair",
  "One Pair",
  "High Card"
];

// Helper: Generate a full deck of 52 cards.
function generateDeck(): CardData[] {
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const suits = ["♠", "♥", "♦", "♣"];
  const deck: CardData[] = [];
  for (const suit of suits) {
    for (const rank of ranks) {
      deck.push({ rank, suit });
    }
  }
  return deck;
}

// Helper: Shuffle an array using Fisher-Yates.
function shuffleArray<T>(array: T[]): T[] {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const GameBoard: React.FC = () => {
  // Using the custom useTimer hook to manage the countdown.
  const { time, addTime } = useTimer(100);
  const [gameOver, setGameOver] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [round, setRound] = useState(0);

  // State for the current round's cards and answer options.
  const [currentCards, setCurrentCards] = useState<CardData[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");

  // Deal a new round: select 5 cards, determine the correct answer, and generate options.
  const dealNewRound = () => {
    const deck = shuffleArray(generateDeck());
    const dealtCards = deck.slice(0, 5);
    const answer = solveHand(dealtCards);
    // Generate distractors: choose two random options from allHandOptions excluding the correct answer.
    const distractorPool = allHandOptions.filter(opt => opt !== answer);
    const shuffledDistractors = shuffleArray(distractorPool);
    const distractors = shuffledDistractors.slice(0, 2);
    // Combine and shuffle the correct answer with the distractors.
    const options = shuffleArray([answer, ...distractors]);

    setCurrentCards(dealtCards);
    setCorrectAnswer(answer);
    setCurrentOptions(options);
  };

  // Initialize the first round.
  useEffect(() => {
    dealNewRound();
  }, []);

  // Monitor timer: if time reaches 0, mark game as over.
  useEffect(() => {
    if (time <= 0) {
      setGameOver(true);
    }
  }, [time]);

  // Handle option selection.
  const handleOptionSelect = (selectedValue: string) => {
    setAttempts(prev => [
      ...prev,
      `Round ${round + 1}: Selected "${selectedValue}" (Correct: "${correctAnswer}")`
    ]);
    if (selectedValue === correctAnswer) {
      setTotalCorrect(prev => prev + 1);
      // Award bonus time for a correct answer.
      addTime(5);
    }
    setRound(prev => prev + 1);
    dealNewRound();
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
      <CardDeck cards={currentCards} onCardClick={(i) => console.log(`Card ${i} clicked`)} />
      <HandOptions
        options={currentOptions.map(option => ({ label: option, value: option }))}
        onSelect={handleOptionSelect}
      />
      <FunnyMessage trigger={round} />
    </Box>
  );
};

export default GameBoard;


// ................

// import React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import useTimer from '../hooks/useTimer';

// const GameBoard: React.FC = () => {
//   const { time, addTime, resetTimer } = useTimer(100);

//   // Example usage: Add bonus time on correct answer
//   const handleCorrectAnswer = () => {
//     addTime(5);
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h6">Time: {time}s</Typography>
//       <button onClick={handleCorrectAnswer}>Simulate Correct Answer (+5s)</button>
//       <button onClick={() => resetTimer()}>Reset Timer</button>
//     </Box>
//   );
// };

// export default GameBoard;



// .................... // 

// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Timer from './Timer';
// import CardDeck, { CardData } from './CardDeck';
// import HandOptions, { HandOption } from './HandOptions';
// import FunnyMessage from './FunnyMessage';
// import Summary from './Summary';

// const GameBoard: React.FC = () => {
//   const [time, setTime] = useState(100);
//   const [gameOver, setGameOver] = useState(false);
//   const [totalCorrect, setTotalCorrect] = useState(0);
//   const [attempts, setAttempts] = useState<string[]>([]);
//   const [round, setRound] = useState(0);



//   // Dummy card data (could be generated or fetched based on game logic)
//   const sampleCards: CardData[] = [
//     { rank: 'A', suit: '♠' },
//     { rank: 'K', suit: '♥' },
//     { rank: 'Q', suit: '♦' },
//     { rank: 'J', suit: '♣' },
//     { rank: '10', suit: '♠' },
//   ];

//   const handOptions: HandOption[] = [
//     { label: 'Straight Flush', value: 'straight_flush' },
//     { label: 'Four of a Kind', value: 'four_of_a_kind' },
//     { label: 'Full House', value: 'full_house' },
//   ];

//   // Countdown timer effect
//   useEffect(() => {
//     if (time <= 0) {
//       setGameOver(true);
//       return;
//     }
//     const interval = setInterval(() => {
//       setTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [time]);

//   // Logic when a hand option is selected
//   const handleOptionSelect = (selectedValue: string) => {
//     // Here you can integrate PokerSolver logic to check if the selected hand ranking is correct.
//     // For demonstration purposes, we'll assume the answer is always correct.
//     setAttempts(prev => [...prev, `Round ${round + 1}: ${selectedValue}`]);
//     setTotalCorrect(prev => prev + 1);
//     setRound(prev => prev + 1);
//     // Add bonus time for a correct answer
//     setTime(prev => prev + 5);
//   };

//   // When game is over, show summary
//   if (gameOver) {
//     return (
//       <Box sx={{ p: 2 }}>
//         <Typography variant="h4" gutterBottom>
//           Game Over!
//         </Typography>
//         <Summary totalCorrect={totalCorrect} attempts={attempts} />
//       </Box>
//     );
//   }

//   // Main game view
//   return (
//     <Box sx={{ p: 2 }}>
//       <Timer time={time} />
//       <CardDeck cards={sampleCards} onCardClick={i => console.log(`Card ${i} clicked`)} />
//       <HandOptions options={handOptions} onSelect={handleOptionSelect} />
//       <FunnyMessage trigger={round} />
//     </Box>
//   );
// };

// export default GameBoard;
