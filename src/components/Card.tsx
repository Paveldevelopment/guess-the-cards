import React from 'react';
import Typography from '@mui/material/Typography';
import {
  StyledCard,
  StyledCardActionArea,
  StyledCardContent,
  StyledCardMedia,
} from './CardStyles';

interface CardProps {
  rank: string;
  suit: string;
  faceUp?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ rank, suit, faceUp = true, onClick }) => {
  const suitColor = suit === '♥' || suit === '♦' ? 'red' : 'inherit';

  return (
    <StyledCard onClick={onClick}>
      <StyledCardActionArea>
        {faceUp ? (
          <StyledCardContent>
            <Typography variant="h5">{rank}</Typography>
            <Typography variant="subtitle1" sx={{ color: suitColor }}>
              {suit}
            </Typography>
          </StyledCardContent>
        ) : (
          <StyledCardMedia
            component="img"
            image="/assets/images/card-back.png"
          />
        )}
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default Card;
