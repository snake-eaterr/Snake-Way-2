import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@mui/material';


export default function Footer() {
  const theme = useTheme();
  return (
    <Box sx={{
      backgroundColor: theme.palette.primary.main,
      color: 'white',
      height: '100px',
      width: '100%',
      padding: '2rem',
      textAlign: 'center',
      position: 'absolute',
      bottom: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Typography><span style={{ color: theme.palette.background.paper }}>Snake Way2</span> Ecommerce Project</Typography>
      <a href='https://github.com/snake-eaterr?tab=repositories' target="_blank" rel="noreferrer">
        <Typography mb="0.5rem">
          <FontAwesomeIcon icon={faGithub} /> snake-eaterr
        </Typography>
      </a>
    </Box>
  )
}