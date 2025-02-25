import { Hand } from 'pokersolver';

export interface CardData {
  rank: string;
  suit: string;
  faceUp?: boolean;
}

const suitMap: Record<string, string> = {
  '♠': 's',
  '♥': 'h',
  '♦': 'd',
  '♣': 'c',
};

function convertCard(card: CardData): string {
  let rank = card.rank;
  const suit = card.suit;

  if (rank === '10') {
    rank = 'T';
  }

  rank = rank.toUpperCase();

  const suitLetter = suitMap[suit] || suit;
  return `${rank}${suitLetter}`;
}

export function solveHand(cards: CardData[]): string {
  const cardStrings = cards.map(convertCard);
  const hand = Hand.solve(cardStrings);
  return hand.name;
}
