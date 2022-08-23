import Rating, { RatingProps } from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

export const StyledRating = styled(Rating)<RatingProps>(({ theme }) => ({
  '& .MuiRating-icon': {
    color: theme.palette.primary.main
  }
}));

