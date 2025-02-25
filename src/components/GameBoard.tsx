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
import { solveHand, CardData } from '../services/pokerSolverService'; // PAV CardData je dobre to mit jako typ v pokerSolverSerice a nebo separatne v type filu?
import useTimer from '../hooks/useTimer';
import FunnyMessage from './FunnyMessage';

// PAV jedine vyuziti tohoto je vyfiltrovat vsechno krome spravne odpovedi a dat to do tzv distractorPool
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




const generateDeck = (): CardData[] => {
  const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  const suits = ["♠", "♥", "♦", "♣"];
  return suits.flatMap(suit => ranks.map(rank => ({ rank, suit })));
};





// PAV asi vic react aproach nez Fisher-Yates
const shuffleArray = <T,>(array: T[]): T[] =>
  array
    .map(item => ({ item, sort: Math.random() })) // Assign random sort values
    .sort((a, b) => a.sort - b.sort) // Sort based on random values
    .map(({ item }) => item); // Extract shuffled items


const GameBoard: React.FC = () => {
  // Use custom timer hook.
  const { time, addTime, startTimer, stopTimer } = useTimer(100);
  const [gameOver, setGameOver] = useState(false);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [attempts, setAttempts] = useState<string[]>([]);
  const [round, setRound] = useState(0);

  // State for current round.
  const [currentCards, setCurrentCards] = useState<CardData[]>([]);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [correctAnswer, setCorrectAnswer] = useState<string>("");
  // Control card reveal (face-up vs. face-down).
  const [cardsRevealed, setCardsRevealed] = useState(false);
  // Control answer feedback modal.
  const [showAnswerModal, setShowAnswerModal] = useState(false);
  // Record if the last answer was correct.
  const [lastAnswerCorrect, setLastAnswerCorrect] = useState<boolean>(false);

  // Deal a new round: first, show cards face-down; after a delay, reveal and start timer.
  const dealNewRound = () => {
    stopTimer();
    const deck = shuffleArray(generateDeck());
    const dealtCards = deck.slice(0, 5);
    setCardsRevealed(false);

    const answer = solveHand(dealtCards);
    const distractorPool = allHandOptions.filter(opt => opt !== answer);
    const shuffledDistractors = shuffleArray(distractorPool);
    const distractors = shuffledDistractors.slice(0, 2);
    // PAV proc je tady ten spread operator u distractors?
    const options = shuffleArray([answer, ...distractors]);

    setCurrentCards(dealtCards);
    setCorrectAnswer(answer);
    setCurrentOptions(options);

    // After 1 second, reveal cards and resume the timer.
   // PAV proc ten timeout nemam v useTimer? protoze je tady ten state asi ze? 
    setTimeout(() => {
      setCardsRevealed(true);
      startTimer();
    }, 1000);
  };

  // Initialize the first round.
  useEffect(() => {
    dealNewRound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // PAV proc tady mas ten eslint? 
  }, []);

  // Monitor timer; if time runs out, end the game.
  // PAV takze tady pustim useEffect kazdou sekundu v podstate. Je to idealni nezatezuje to device? 
  useEffect(() => {
    if (time <= 0) {
      setGameOver(true);
    }
  }, [time]);

  // Handle answer selection.
  const handleOptionSelect = (selectedValue: string) => {
    const wasCorrect = selectedValue === correctAnswer;
    // PAV pro zajimavost tady je ... prev a dole jenom prev.
    setAttempts(prev => [
      ...prev,
      `Round ${round + 1}: Selected "${selectedValue}" (Correct: "${correctAnswer}")`
    ]);
    setLastAnswerCorrect(wasCorrect);
    stopTimer();
    if (wasCorrect) {
      setTotalCorrect(prev => prev + 1);
      addTime(5);
    } else {
      addTime(-5);
    }
    setShowAnswerModal(true);
    setRound(prev => prev + 1);
    // After 2 seconds, close modal and start a new round.
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
    // PAV proc je tady ten style napsany inline?
    <Box sx={{ p: 2 }}>
      <Timer time={time} />
      <CardDeck
        cards={currentCards.map(card => ({ ...card, faceUp: cardsRevealed }))}
        onCardClick={(i) => console.log(`Card ${i} clicked`)} // PAV proc se da na karty klikat? 
      />
      <HandOptions
        options={currentOptions.map(option => ({ label: option, value: option }))}
        onSelect={handleOptionSelect}
      />
      {/* Answer Feedback Modal */}
      <Dialog open={showAnswerModal}>
        <DialogTitle>
          {lastAnswerCorrect ? "Correct!" : "Wrong!"}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            {lastAnswerCorrect ? "You earned +5 seconds!" : "You lost 5 seconds!"}
          </Typography>
          {/* Display the funny message inside the modal */}
          <FunnyMessage trigger={round} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default GameBoard;



// ........................... PAV

// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Timer from './Timer';
// import CardDeck from './CardDeck';
// import HandOptions from './HandOptions';
// import FunnyMessage from './FunnyMessage';
// import Summary from './Summary';
// import { solveHand, CardData } from '../services/pokerSolverService';
// import useTimer from '../hooks/useTimer';
// import Dialog from '@mui/material/Dialog';
// import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';

// const allHandOptions = [
//   "Straight Flush",
//   "Four of a Kind",
//   "Full House",
//   "Flush",
//   "Straight",
//   "Three of a Kind",
//   "Two Pair",
//   "One Pair",
//   "High Card"
// ];

// // Helper: Generate a full deck of 52 cards.
// function generateDeck(): CardData[] {
//   const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
//   const suits = ["♠", "♥", "♦", "♣"];
//   const deck: CardData[] = [];
//   for (const suit of suits) {
//     for (const rank of ranks) {
//       deck.push({ rank, suit });
//     }
//   }
//   return deck;
// }

// // Helper: Shuffle an array using the Fisher–Yates algorithm.
// function shuffleArray<T>(array: T[]): T[] {
//   const arr = array.slice();
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// }

// const GameBoard: React.FC = () => {
//   // useTimer hook now provides control functions.
//   const { time, addTime, startTimer, stopTimer } = useTimer(100);
//   const [gameOver, setGameOver] = useState(false);
//   const [totalCorrect, setTotalCorrect] = useState(0);
//   const [attempts, setAttempts] = useState<string[]>([]);
//   const [round, setRound] = useState(0);

//   // State for the current round's cards, answer options, and the correct answer.
//   const [currentCards, setCurrentCards] = useState<CardData[]>([]);
//   const [currentOptions, setCurrentOptions] = useState<string[]>([]);
//   const [correctAnswer, setCorrectAnswer] = useState<string>("");

//   // Controls whether cards are revealed (face-up) or not.
//   const [cardsRevealed, setCardsRevealed] = useState(false);
//   // Controls showing the correct answer modal.
//   const [showCorrectModal, setShowCorrectModal] = useState(false);

//   // Deal a new round: deal 5 cards (start face-down), compute the correct answer, and generate three options.
//   const dealNewRound = () => {
//     // Stop the timer during the transition.
//     stopTimer();
//     // Generate a shuffled deck and pick the first 5 cards.
//     const deck = shuffleArray(generateDeck());
//     const dealtCards = deck.slice(0, 5);
//     // Initially, show cards face-down.
//     setCardsRevealed(false);

//     // Compute the correct answer.
//     const answer = solveHand(dealtCards);
//     // Generate two distractor options (excluding the correct answer).
//     const distractorPool = allHandOptions.filter(opt => opt !== answer);
//     const shuffledDistractors = shuffleArray(distractorPool);
//     const distractors = shuffledDistractors.slice(0, 2);
//     // Combine and shuffle the answer and distractors.
//     const options = shuffleArray([answer, ...distractors]);

//     setCurrentCards(dealtCards);
//     setCorrectAnswer(answer);
//     setCurrentOptions(options);

//     // After a short delay, reveal the cards and start the timer.
//     setTimeout(() => {
//       setCardsRevealed(true);
//       startTimer();
//     }, 1000); // 1-second delay before revealing
//   };

//   // Initialize the first round.
//   useEffect(() => {
//     dealNewRound();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // Monitor timer: if time runs out, set game over.
//   useEffect(() => {
//     if (time <= 0) {
//       setGameOver(true);
//     }
//   }, [time]);

//   // Handle option selection.
//   const handleOptionSelect = (selectedValue: string) => {
//     if (selectedValue === correctAnswer) {
//       // Correct answer: pause the game, show modal, add bonus time.
//       stopTimer();
//       setShowCorrectModal(true);
//       setTotalCorrect(prev => prev + 1);
//       addTime(5);
//       setAttempts(prev => [
//         ...prev,
//         `Round ${round + 1}: Correct! Selected "${selectedValue}" (Answer: "${correctAnswer}")`
//       ]);
//       setRound(prev => prev + 1);
//       // After showing the modal for 2 seconds, hide it and deal a new round.
//       setTimeout(() => {
//         setShowCorrectModal(false);
//         dealNewRound();
//       }, 2000);
//     } else {
//       // Incorrect answer: log attempt and immediately start a new round.
//       setAttempts(prev => [
//         ...prev,
//         `Round ${round + 1}: Wrong! Selected "${selectedValue}" (Answer: "${correctAnswer}")`
//       ]);
//       setRound(prev => prev + 1);
//       dealNewRound();
//     }
//   };

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

//   return (
//     <Box sx={{ p: 2 }}>
//       <Timer time={time} />
//       {/* 
//         Pass the cards to CardDeck.
//         We map over the current cards to override the faceUp property based on cardsRevealed.
//         (Ensure your CardDeck component passes this prop to each Card.)
//       */}
//       <CardDeck
//         cards={currentCards.map(card => ({ ...card, faceUp: cardsRevealed }))}
//         onCardClick={(i) => console.log(`Card ${i} clicked`)}
//       />
//       <HandOptions
//         options={currentOptions.map(option => ({ label: option, value: option }))}
//         onSelect={handleOptionSelect}
//       />
//       <FunnyMessage trigger={round} />
//       {/* Modal for correct answer */}
//       <Dialog open={showCorrectModal}>
//         <DialogTitle>Correct!</DialogTitle>
//         <DialogContent>
//           <Typography variant="body1">
//             You earned 5 bonus seconds!
//           </Typography>
//         </DialogContent>
//       </Dialog>
//     </Box>
//   );
// };

// export default GameBoard;


// ..............

// import React, { useState, useEffect } from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Timer from './Timer';
// import CardDeck from './CardDeck';
// import HandOptions from './HandOptions';
// import FunnyMessage from './FunnyMessage';
// import Summary from './Summary';
// import { solveHand, CardData } from '../services/pokerSolverService';
// import useTimer from '../hooks/useTimer';

// const allHandOptions = [
//   "Straight Flush",
//   "Four of a Kind",
//   "Full House",
//   "Flush",
//   "Straight",
//   "Three of a Kind",
//   "Two Pair",
//   "One Pair",
//   "High Card"
// ];

// // Helper: Generate a full deck of 52 cards.
// function generateDeck(): CardData[] {
//   const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
//   const suits = ["♠", "♥", "♦", "♣"];
//   const deck: CardData[] = [];
//   for (const suit of suits) {
//     for (const rank of ranks) {
//       deck.push({ rank, suit });
//     }
//   }
//   return deck;
// }

// // Helper: Shuffle an array using Fisher-Yates.
// function shuffleArray<T>(array: T[]): T[] {
//   const arr = array.slice();
//   for (let i = arr.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   }
//   return arr;
// }

// const GameBoard: React.FC = () => {
//   // Using the custom useTimer hook to manage the countdown.
//   const { time, addTime } = useTimer(100);
//   const [gameOver, setGameOver] = useState(false);
//   const [totalCorrect, setTotalCorrect] = useState(0);
//   const [attempts, setAttempts] = useState<string[]>([]);
//   const [round, setRound] = useState(0);

//   // State for the current round's cards and answer options.
//   const [currentCards, setCurrentCards] = useState<CardData[]>([]);
//   const [currentOptions, setCurrentOptions] = useState<string[]>([]);
//   const [correctAnswer, setCorrectAnswer] = useState<string>("");

//   // Deal a new round: select 5 cards, determine the correct answer, and generate options.
//   const dealNewRound = () => {
//     const deck = shuffleArray(generateDeck());
//     const dealtCards = deck.slice(0, 5);
//     const answer = solveHand(dealtCards);
//     // Generate distractors: choose two random options from allHandOptions excluding the correct answer.
//     const distractorPool = allHandOptions.filter(opt => opt !== answer);
//     const shuffledDistractors = shuffleArray(distractorPool);
//     const distractors = shuffledDistractors.slice(0, 2);
//     // Combine and shuffle the correct answer with the distractors.
//     const options = shuffleArray([answer, ...distractors]);

//     setCurrentCards(dealtCards);
//     setCorrectAnswer(answer);
//     setCurrentOptions(options);
//   };

//   // Initialize the first round.
//   useEffect(() => {
//     dealNewRound();
//   }, []);

//   // Monitor timer: if time reaches 0, mark game as over.
//   useEffect(() => {
//     if (time <= 0) {
//       setGameOver(true);
//     }
//   }, [time]);

//   // Handle option selection.
//   const handleOptionSelect = (selectedValue: string) => {
//     setAttempts(prev => [
//       ...prev,
//       `Round ${round + 1}: Selected "${selectedValue}" (Correct: "${correctAnswer}")`
//     ]);
//     if (selectedValue === correctAnswer) {
//       setTotalCorrect(prev => prev + 1);
//       // Award bonus time for a correct answer.
//       addTime(5);
//     }
//     setRound(prev => prev + 1);
//     dealNewRound();
//   };

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

//   return (
//     <Box sx={{ p: 2 }}>
//       <Timer time={time} />
//       <CardDeck cards={currentCards} onCardClick={(i) => console.log(`Card ${i} clicked`)} />
//       <HandOptions
//         options={currentOptions.map(option => ({ label: option, value: option }))}
//         onSelect={handleOptionSelect}
//       />
//       <FunnyMessage trigger={round} />
//     </Box>
//   );
// };

// export default GameBoard;


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
