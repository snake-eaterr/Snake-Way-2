import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useMediaQuery } from '@mui/material';
import { useApolloClient } from '@apollo/client';
import Badge from '@mui/material/Badge';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import { useRouter } from 'next/router';
import { useStateValue } from '../../utils/state';
import { useAuth } from '../../utils/auth';


export default function Appbar() {
  const client = useApolloClient();
  const [{ cartBadge } , dispatch] = useStateValue();

  
  // to avoid badgeContent prop hydration mismatch
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, [])

  console.log(cartBadge)
  const router = useRouter();
  
  const theme = useTheme();
  const { isAuthenticated, logout } = useAuth();
  // mobile version account menu
  const matches = useMediaQuery('(max-width: 600px)');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout =() => {
    logout && logout();
    
  }


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        minHeight: '5rem',
        [theme.breakpoints.down('md')]: {
          minHeight: '2rem'
        }
      }}>
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Link href='/'>
            <Typography variant="h4" sx={{ 
              
              padding: '20px 0',
              [theme.breakpoints.down('md')]: {
                fontSize: '1.5rem'
              },
              cursor: 'pointer'
            }}>
              Snake <span style={{ color: theme.palette.background.paper }}>Way</span>
            </Typography>
          </Link>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Badge badgeContent={mounted ? cartBadge : 0} sx={{ 
                marginRight: '2rem',
                '& .MuiBadge-badge': {
                  backgroundColor: '#FFC23C',
                  color: 'black'
                },
                cursor: 'pointer'
              }}>
                <Link href='/cart'>
                  <ShoppingCart />
                </Link>
            </Badge>
            {
              !isAuthenticated
              &&
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-around'
              }}>
                <Link href='/register'>
                  <Button variant="text" color='inherit'>Register</Button>
                </Link>
                <Link href='/login'>
                  <Button variant="text" color='inherit'>Login</Button>
                </Link>
              </Box>
            }
            {
              isAuthenticated
              &&
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-around'
              }}>
                {
                  matches
                  ?
                  <Box>
                    
                    
                    <Button variant='text' color='inherit' onClick={handleClick}>Account</Button>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                      'aria-labelledby': 'basic-button',
                      }}
                    >
                      <Link href='/profile'>
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                      </Link>
                      
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>  {/* needs checking */}
                    </Menu>
                  </Box>
                  :
                  <Box>
                    <Link href='/profile'>
                      <Button variant="text" color='inherit'>Profile</Button>
                    </Link>
                    <Button variant="text" color='inherit' onClick={handleLogout}>Logout</Button>
                  </Box>
                }
              </Box>
            }
          </Box>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}