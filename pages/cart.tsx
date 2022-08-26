import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import { Layout } from "../components/Layout";
import { CartItems } from '../components/Cart';
import { useTheme } from '@mui/material';
import useUser from '../utils/useUser';
import Head from 'next/head';





export default function Cart() {
  const router = useRouter();
  const theme = useTheme();
  
  
  

  return (
    <Layout>
      <Head>
        <title>My cart</title>
      </Head>
      <Box sx={{ minHeight: '80vh' }}>
        <CartItems />
      </Box>
    </Layout>
  )
}