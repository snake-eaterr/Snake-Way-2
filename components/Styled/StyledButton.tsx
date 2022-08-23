import Button, { ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';


export const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.primary.main,
  boxShadow: `-3px 5px ${theme.palette.secondary.main}`,
  border: `3px solid ${theme.palette.secondary.main}`,
  borderRadius: 0,
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    color: 'white',
    boxShadow: `-3px 5px ${theme.palette.secondary.main}`,
    border: `3px solid ${theme.palette.secondary.main}`,
    borderRadius: 0
  }
}));
