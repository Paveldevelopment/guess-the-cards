import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const StyledCardDeck = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  gap: theme.spacing(2),
  margin: theme.spacing(2, 0),
}));
