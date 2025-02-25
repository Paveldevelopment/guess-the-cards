# Guess the Cards

An Interactive Card Game Prototype

## Getting Started

### Prerequisites

- Node.js (version 14+ recommended)
- npm or yarn

### Installation

1. **Clone the repository and run the app:**

   ```bash
   git clone <repository-url>
   cd guess-the-cards
   ```

Install dependencies: npm install

Start the development server: npm run dev

......................................................................................................

## Overview

**Guess the Cards** is an interactive card game where the goal is to answer correctly as many times as possible. The game challenges your ability to quickly evaluate poker hands, offering a unique twist on classic card games.

## Gameplay

- **Starting Time:** The player begins with 100 seconds (time acts as a life counter).
- **Rounds:** In each round, 5 cards are dealt. After a brief delay, the cards are revealed and a countdown begins.
- **Answering:** You are presented with three hand ranking options (e.g., Straight Flush, Four of a Kind, etc.). Choose the correct ranking of the dealt hand.
- **Time Bonuses/Penalties:**
  - Correct answer: +5 seconds added.
  - Incorrect answer: -5 seconds deducted.
- **Game End:** The game ends when your time reaches 0.
- **Summary:** After the game, a summary screen displays your total correct answers and a list of your previous attempts.
- **Bonus Feature:** After each round, a call is made to the [Random Word API](https://api-ninjas.com/api/randomword) to fetch a word. A funny message is then displayed (e.g., “You're so _[word]_!”), adding an extra layer of entertainment.

## Technologies & Tools

- **Frontend Framework:** React with TypeScript
- **Bundler:** Vite
- **Component Library:** Material UI
- **Poker Hand Evaluation:** [PokerSolver](https://www.npmjs.com/package/pokersolver)
- **Random Word API:** [API Ninjas Random Word](https://api-ninjas.com/api/randomword)
