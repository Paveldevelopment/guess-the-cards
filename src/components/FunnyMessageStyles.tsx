import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const MessageContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: theme.shape.borderRadius,
  width: 250,
  height: 40,
}));
