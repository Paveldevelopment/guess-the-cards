import { styled } from '@mui/material/styles';
import MuiCard from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia, { CardMediaProps } from '@mui/material/CardMedia';

export const StyledCard = styled(MuiCard)(({ theme }) => ({
  width: 80,
  height: 120,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  margin: theme.spacing(1),
}));

export const StyledCardActionArea = styled(CardActionArea)({
  height: '100%',
});

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  padding: theme.spacing(1),
}));

export const StyledCardMedia = styled(CardMedia)<CardMediaProps>(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}));
