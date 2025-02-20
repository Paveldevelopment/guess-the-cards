import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const SummaryContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(2, 0),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
}));

export const AttemptList = styled('ul')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: theme.spacing(1, 0, 0, 0),
}));

export const AttemptItem = styled('li')(({ theme }) => ({
  marginBottom: theme.spacing(0.5),
}));
