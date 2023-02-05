import { useQuery } from "@apollo/client";
import { GET_ORDERS_BY_USER } from "../../apollo/queries";
import { Order } from "../../types";
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import { BoxPaper } from '../Styled';


interface ReturnedOrders {
  getOrdersByUser?: Order[];
}

export default function OrdersHistory() {
  const [orders, setOrders] = useState<Order[]>([] as Order[]);
  const result = useQuery<ReturnedOrders>(GET_ORDERS_BY_USER);
  const theme = useTheme();
  
  useEffect(() => {
    if(result.data) {
      setOrders(orders.concat([...result.data.getOrdersByUser as Order[]]));
    }
  }, [result.data])

  console.log(orders)
  return (
    <Box sx={{
      maxWidth: '50vw',
      [theme.breakpoints.down('md')]: {
      maxWidth: '95vw'
      },
      margin: 'auto',
      textAlign: 'left',
      marginTop: '6rem',
      marginBottom: '6rem'
    }}>
      <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
        Orders history
      </Typography>
      {
        orders
        ?
        <BoxPaper sx={{
          marginTop: '0.5rem',
          padding: 0
          
        }}>
          {
            orders.length > 0
            ?
            orders.map((order, index) => {
              return (
                <Box key={order.id}>
                  <Grid container spacing={4} sx={{ padding: 0 }}>
                    <Grid item xs={12} md={4}>
                      <Image
                        src={`https://snake-way.onrender.com/api/image/${order.orderedProduct.id}`}
                        width={400}
                        height={400}
                        layout="responsive"
                        alt="Product image"
                      />    
                    </Grid>
                      <Grid item md={8}>
                        <Box>
                          <Typography variant="h4">
                            {order.orderedProduct.label}
                          </Typography>
                          <Box sx={{
                            marginTop: '5rem'
                          }}>
                            <Typography variant="body1">
                              Quantity: {order.quantity}
                            </Typography>
                            <Typography variant="body1">
                              Created: { new Date(order.created).toDateString() }
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                      { index + 1 < orders.length && <hr style={{ color: theme.palette.primary.main }}/>  }
                </Box>
              )
            })
            :
            <Typography sx={{
              textAlign: 'center',
              fontSize: '1.2rem'
            }}>No orders yet</Typography>
          }
        </BoxPaper>
        :
        null
      }
    </Box>
  )


}