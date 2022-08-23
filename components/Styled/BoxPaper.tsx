import Box, { BoxProps } from '@mui/material/Box';
import { styled } from '@mui/material/styles';


export const BoxPaper = styled(Box)<BoxProps>(({ theme }) => ({
  boxShadow: `0 0 0 2px ${theme.palette.secondary.main}`,
  backgroundColor: theme.palette.background.paper,
  color: 'black',
  padding: '0.7rem'

}));

