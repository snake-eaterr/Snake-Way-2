import Appbar from './Appbar';
import Box from '@mui/material/Box';
import Footer from './Footer';

export function Layout({ children }: { children: JSX.Element[] | JSX.Element }) {
  return (
    <Box>
      <Appbar />
        {children}
      <Footer />
    </Box>
  )
}