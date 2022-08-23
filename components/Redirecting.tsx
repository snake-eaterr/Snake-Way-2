import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import SquareLoader from 'react-spinners/SquareLoader';
import { CSSProperties } from 'react';

const override: CSSProperties = {
  color: '#FFC23C',
  backgroundColor: '#100720'
}

// For pages behind authentication, like profile.
export default function RedirectingFullPage() {
  const theme = useTheme();
  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: 'rgb(248, 232, 203)'
    }}>
      <SquareLoader loading={true} cssOverride={override} />
    </Box>
  )
};