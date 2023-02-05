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
import { useMutation } from "@apollo/client";
import { PLACE_ORDER } from "../../apollo/mutations";
import { Order } from "../../types";
import { Checkout } from './Checkout';
import { useStateValue } from '../../utils/state';
import { removeFromCart } from '../../utils/state';


interface MutationVariables {
  orderedProductId: string;
  quantity: number;
  address: string;
}

export function CartItems() {
  const [_state, dispatch] = useStateValue();
  const theme = useTheme();
  const [items, setItems] = useState<CartEntry[]>([]);
  

  useEffect(() => {
    setItems(cartHelper.getCart())
  }, []);

  const [placeOrder, result] = useMutation<
    { placeOrder: Order },
    MutationVariables
  >(PLACE_ORDER, {
    onError: (error) => {
      console.log(error.graphQLErrors[0].message);
      
		}
  });

  useEffect(() => {
    if(result.data) {
      console.log(result.data.placeOrder.orderedProduct);
    }
  }, [result.data])

  const handleQuantityChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
		let updatedItems = items;
    const value: unknown = event.target.value;
		updatedItems[index].quantity = value as number;

		setItems([...updatedItems]);
		cartHelper.updateCart(index, value as number);
	}
  const removeItem = (index: number) => (event: React.MouseEvent<HTMLElement>) => {
		let updatedItems = cartHelper.removeItem(index);
		setItems(updatedItems);
    dispatch(removeFromCart());
	}

  const getTotal = () => {
		return items.reduce((a, b) => {
			return a + (b.quantity * b.product.price);
		}, 0);
	}

  const handleCheckout = () => {
    if(items.length !== 0) {
      items.forEach((item, index) => {
        placeOrder({ variables: { orderedProductId: item.product.id, quantity: Number(item.quantity), address: 'Malta' } });
        cartHelper.removeItem(index)
      })
      return 1
    }
    return 0
  }

  return (
    <Box>
      <Grid container spacing={4} sx={{ padding: '0.5rem' }}>
            <Grid item xs={12} md={8}>
              {
                items.length > 0
                ?
                <Grid container sx={{
                  boxShadow: '0 0 0 2px rgba(0,0,0.1)',
                  background: theme.palette.background.paper,
                  color: 'black',
                  padding: '0.7rem',
                  marginTop: '0.5rem'
                  
                }}>
                  {
                    items.map((item, index) => {
                      return (
                        <Grid item md={12} key={index}>
                          <Grid container spacing={4} sx={{ padding: '0.8rem' }}>
                            <Grid item xs={12} md={4}>
                              <Image
                                src={`https://snake-way.onrender.com/api/image/${item.product.id}`}
                                width={200}
                                height={200}
                                layout="responsive"
                                alt="Product image"
                              />
                          
                            </Grid>
                            <Grid item md={8}>
                              <Box>
                                <Typography variant="h4">
                                  {item.product.label}
                                </Typography>
                                <Typography variant="h5" sx={{
                                  fontWeight: 100,
                                  marginTop: '0.6rem'
                                }}>
                                  ${item.product.price}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '5rem' }}>
                                  <Typography variant="body1">
                                    Quantity: 
                                  </Typography>
                                  <TextField
                                    value={item.quantity}
                                    type="number"
                                    inputProps={{ min: 1, max: item.product.stock }}
                                    onChange={handleQuantityChange(index)}
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                    sx={{
                                      marginLeft: '0.9rem',
                                      
                                    }}
                                  />
                                  <Button onClick={removeItem(index)}>x Remove</Button>
                                </Box>
                              </Box>
                            </Grid>
                          </Grid>
                          { index + 1 < items.length && <hr style={{ color: theme.palette.primary.main }}/>  }
                          
                        </Grid>
                      )
                    })
                  }
                </Grid>
                :
                <Grid item xs={12} md={8} sx={{
                  minHeight: '6rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Typography variant="h5">
                    Nothing in cart yet
                  </Typography>
                </Grid>
              }
            </Grid>
            <Grid item xs={12} md={4}>
              <Checkout handleCheckout={handleCheckout} getTotal={getTotal} />
            </Grid>
          </Grid>
      
    </Box>
  )
}