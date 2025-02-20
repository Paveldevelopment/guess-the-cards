import React from 'react';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { StyledCard, StyledCardActionArea } from './CardStyles';

interface CardProps {
  rank: string;
  suit: string;
  faceUp?: boolean;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ rank, suit, faceUp = true, onClick }) => {
  return (
    <StyledCard onClick={onClick}>
      <StyledCardActionArea>
        {faceUp ? (
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography variant="h5" component="div">
              {rank}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {suit}
            </Typography>
          </CardContent>
        ) : (
          <CardMedia
            component="img"
            image="/assets/images/card-back.png"
            alt="Card Back"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
      </StyledCardActionArea>
    </StyledCard>
  );
};

export default Card;

