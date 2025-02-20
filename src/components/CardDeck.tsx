import React from 'react';
import { StyledCardDeck } from './CardDeckStyles';
import Card from './Card';

export interface CardData {
  rank: string;
  suit: string;
  faceUp?: boolean;
}

interface CardDeckProps {
  cards: CardData[];
  onCardClick?: (index: number) => void;
}

const CardDeck: React.FC<CardDeckProps> = ({ cards, onCardClick }) => {
  return (
    <StyledCardDeck>
      {cards.map((card, index) => (
        <Card
          key={index}
          rank={card.rank}
          suit={card.suit}
          faceUp={card.faceUp !== undefined ? card.faceUp : true}
          onClick={() => onCardClick && onCardClick(index)}
        />
      ))}
    </StyledCardDeck>
  );
};

export default CardDeck;
