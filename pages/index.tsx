import { Layout } from '../components/Layout/';
import Typography from '@mui/material/Typography';
import { ALL_PRODUCTS } from '../apollo/queries';
import { initializeApollo, addApolloState } from '../apollo/client';
import { Product } from '../types';
import Overview from '../components/Product/Overview';
import styles from '../styles/home.module.css';
import Head from 'next/head';




interface ProductsData {
  allProducts: Product[];
}
const Home = ({ products }: { products: Product[] }) => {

  
  const electroics = products.filter(product => product.category === 'Electronics');
  const books = products.filter(product => product.category === 'Books');
  const clothing = products.filter(product => product.category === 'Clothing');
  return (
    <Layout>
      <Head>
        <title>Snake Way homepage</title>
      </Head>
      <div className={styles.banner}></div>
      <div className={styles.bannerMobile}>
        <Typography variant="h4">
          Snake Way is a place to buy your favorite stuff!
        </Typography>
      </div>
      <div style={{
        maxWidth: '80%',
        margin: '20px auto'
      }}>
        <Overview products={electroics} category="Electronics" />
        <Overview products={books} category="Books" />
        <Overview products={clothing} category="Clothing" />
      </div>
    </Layout>
  )

}

export async function getStaticProps() {
  const client = initializeApollo();
  const { data } = await client.query<ProductsData>({
    query: ALL_PRODUCTS
  })
  
  // we have no interest on the cahce on this page, so just pass it as a prop
  return addApolloState(client, {
    props: {
      products: data.allProducts
    }
  });
}

export default Home
