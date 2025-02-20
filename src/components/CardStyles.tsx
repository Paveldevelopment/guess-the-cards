import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import { CardActionArea } from '@mui/material';

export const StyledCard = styled(MuiCard)(({ theme }) => ({
  width: 80,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  margin: theme.spacing(1),
  boxShadow: theme.shadows[3],
}));

export const StyledCardActionArea = styled(CardActionArea)({
  height: '100%',
});
