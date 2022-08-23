import React, { HTMLInputTypeAttribute, useEffect, useState } from "react";
import cartHelper from '../../utils/cart-helper';
import { CartEntry } from "../../types";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Typography from '@mui/material/Typography';
import { useTheme }from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Link from 'next/link';
import { useAuth } from '../../utils/auth';

interface CheckoutProps {
  handleCheckout: () => number;
  getTotal: () => number;
}

export function Checkout(props: CheckoutProps) {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuth();
  
  
  const handleCheckout = () => {
    const value = props.handleCheckout();
    if(value === 1) {
      setOpen(true)
    }
  }

  

  return (
    <Box sx={{
      boxShadow: '0 0 0 2px rgba(0,0,0.1)',
      background: theme.palette.background.paper,
      color: 'black',
      marginTop: '0.5rem',
      padding: '0.5rem'
    }}>
      <Typography variant="h6">
        Total: ${props.getTotal()}
      </Typography>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        {
          isAuthenticated
          ?
          <Button disabled={ (() => props.getTotal() > 0 ? false : true)() } variant="contained" color="secondary" onClick={handleCheckout}>Checkout</Button>
          :
          <Link href='/login'>
            <Button variant="text" color="secondary">Login to checkout</Button>
          </Link>

        }
        <Button variant="contained" color="secondary">Continue shopping</Button>
      </Box>
      <Dialog open={open}>
				<DialogTitle>New Orders</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Orders successfully placed
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link href="/profile">
						<Button color="secondary"  variant="contained">
							Track order
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
    </Box>
  )
}