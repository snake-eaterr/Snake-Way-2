import { Layout } from "../../components/Layout";
import { initializeApollo, addApolloState } from "../../apollo/client";
import { ALL_PRODUCTS, GET_PRODUCT_BY_ID } from "../../apollo/queries";
import { Product, Review } from "../../types";
import { GetStaticProps } from 'next';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Image from 'next/image';
import { Typography } from "@mui/material";
import React, { FormEventHandler, useMemo } from 'react';
import { StyledRating, StyledButton, BoxPaper } from '../../components/Styled';
import { useTheme } from '@mui/material';

import cartHelper from '../../utils/cart-helper';
import { useRouter } from 'next/router';
import Reviews from '../../components/Product/Reviews';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import { useStateValue } from '../../utils/state';
import { addToCart } from '../../utils/state';








interface ProductsData {
  allProducts: Product[];
}

interface ProductData {
  getProductById: Product;
}

interface ProductId {
  productId: string;
}





export default function ProductPage({ id }: { id: string }) {

  const [_state, dispatch] = useStateValue();

  

  const theme = useTheme();
  const router = useRouter();
  const {loading, data, error} = useQuery<ProductData, ProductId>(GET_PRODUCT_BY_ID, {
    variables: { productId: id }
  })

  const averageRating = useMemo(() => {
    if(!data) return;
    const sum = data?.getProductById.reviews.reduce<number>((a, b) => a + b.rating, 0);
    return sum / data?.getProductById.reviews.length;
		
		
	}, [data?.getProductById.reviews]);

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(addToCart());
    if(data) {
      cartHelper.addItem(data?.getProductById, 1 , () => router.push('/cart') );
    }
  };

  
  return (
    <Layout>
      <Head>
        <title>{data?.getProductById.label}</title>
      </Head>
      <Box>
        <Grid container spacing={3} sx={{ color: 'rgb(231, 211, 211)' }}>
          <Grid item xs={12}  md={6}>
            <Image
              src={`https://frozen-bayou-75999.herokuapp.com/api/image/${data?.getProductById.id}`}
              width={200}
              height={200}
              layout="responsive"
              alt="Product image"
            />
          </Grid>
          <Grid item xs={12} md={6} mt="0.5rem">
            <BoxPaper sx={{
              marginBottom: '0.4rem',
              [theme.breakpoints.up('md')]: {
                marginRight: '0.5rem'
              }
              
            }}>

              <Typography variant="h4" sx={{ mb: '0.4rem', padding: '0.4rem' }}>
                {data?.getProductById.label}
              </Typography>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.4rem',
                textAlign: 'center'
              }}>
                <StyledRating readOnly value={averageRating} />
                <Typography component="span" variant="body1" ml='0.5rem'>
                  {data?.getProductById.reviews.length} ratings
                </Typography>
              </Box>
              <Typography variant="body1" component="span" sx={{ marginLeft: '0.6rem' }}>
                Price: <span style={{ color: 'hsl(0, 80%, 50%)' }}>${data?.getProductById.price}</span>
              </Typography>
              <hr style={{ color: theme.palette.primary.main }}/>
              <Typography variant="body2" mt="1.5rem" sx={{
                [theme.breakpoints.down('md')]: {
                  padding: '0.5rem'
                }
              }}>
                {data?.getProductById.description}
              </Typography>
              <hr style={{ color: theme.palette.primary.main }}/>
              <Box sx={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '0.4rem' }}>
                {
                  data && 
                  data?.getProductById?.stock > 0
                  ? <Typography variant="h6">In stock. Order soon!</Typography>
                  : <Typography variant="h6">Out of stock</Typography>
                }
                <form onSubmit={handleAddToCart}>
                  <StyledButton variant="contained" type="submit" disabled={ (() => data && data?.getProductById.stock > 0 ? false : true)() }  sx={{ marginTop: '0.5rem' }}>Add to cart</StyledButton>
                </form>
              </Box>
            </BoxPaper>
            <Reviews reviews={ data?.getProductById.reviews as Review[]}  productId={data?.getProductById.id as string} />
          </Grid>
          
        </Grid>
      </Box>
    </Layout>
  )
}

export async function getStaticPaths() {
  const client = initializeApollo();
  const { data } = await client.query<ProductsData>({
    query: ALL_PRODUCTS
  }); 

  const paths = data.allProducts.map(product => {
    return {
      params: {
        id: product.id
      }
    };
  });

  return {
    paths,
    fallback: false
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const client = initializeApollo()
  await client.query<ProductData, ProductId>({
    query: GET_PRODUCT_BY_ID,
    variables: { productId: params?.id as string }
  });

  return addApolloState(client, {
    props: {
      id: params?.id
    }
  });

  

 
}