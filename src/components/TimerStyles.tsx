import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const TimerContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  textAlign: 'center',
  width: '120px',
  backgroundColor: theme.palette.background.paper,
}));
