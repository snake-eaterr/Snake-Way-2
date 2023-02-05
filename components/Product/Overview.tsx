import { Typography, Box, Grid } from '@mui/material';
import Image from 'next/image';
import { Product } from '../../types';
import { useTheme } from '@mui/material';
import Link from 'next/link';
import { BoxPaper } from '../Styled';



export default function Overview({ products, category }: { products: Product[], category: string } ) {
  const theme = useTheme();
  return (
    <Box>
      
      <Typography variant="h3" sx={{
        marginTop: '5rem',
        padding: 0,
        
        
      }}>
        {category}
      </Typography>
      <br />
      <Grid container spacing={4}>
        {
          products.map((product) => {
            return (
              <Grid item xs={12} md={4} key={product.id}>
                <Link href={`/products/${product.id}`}>
                  <a>
                    <BoxPaper sx={{
                      
                      flexGrow: 5,
                      padding: 0
                    
                      }}>
                      <Typography variant="h5" sx={{
                        padding: '0.5rem 0',
                        textAlign: 'center'
                      }}>
                        {product.label}
                      </Typography>
                      <Image
                        src={`https://snake-way.onrender.com/api/image/${product.id}`}
                        alt="Product image"
                        width={400}
                        height={400}
                        layout='responsive'
                      />
                      <Typography variant="body1" sx={{ padding: '0.5rem' }}>
                      { // Don't show whole description in overview
														product.description.length < 160
														?
														product.description
														:
														product.description.slice(0, 160)
													}
													...
                      </Typography>
                    </BoxPaper>
                  </a>
                </Link>
                
              </Grid>
            )
          })
        }

      </Grid>
    </Box>
  )
}