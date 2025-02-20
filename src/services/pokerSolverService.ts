// src/services/pokerSolverService.ts
import { Hand } from 'pokersolver';

export interface CardData {
  rank: string;
  suit: string;
  faceUp?: boolean;
}

// Map the Unicode suit symbols to shorthand letters used by pokersolver.
const suitMap: Record<string, string> = {
  '♠': 's',
  '♥': 'h',
  '♦': 'd',
  '♣': 'c',
};

// Convert a card from our CardData format to the two-character string expected by pokersolver.
function convertCard(card: CardData): string {
  let { rank, suit } = card;
  // Convert "10" to "T" (pokersolver typically uses "T" for tens).
  if (rank === '10') {
    rank = 'T';
  }
  // Ensure the rank is uppercase (e.g., A, K, Q, J, T)
  rank = rank.toUpperCase();
  // Use the suitMap to convert suit symbols (if available).
  const suitLetter = suitMap[suit] || suit;
  return `${rank}${suitLetter}`;
}

// Given an array of CardData, solve the hand and return its ranking name.
export function solveHand(cards: CardData[]): string {
  const cardStrings = cards.map(convertCard);
  const hand = Hand.solve(cardStrings);
  return hand.name;
}
