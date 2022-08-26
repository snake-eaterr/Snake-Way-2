import { Review } from '../../types';
import { useMutation } from '@apollo/client';
import { ADD_REVIEW } from '../../apollo/mutations';
import { ALL_PRODUCTS, GET_PRODUCT_BY_ID } from '../../apollo/queries';
import { Product } from '../../types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material';
import { Formik, Form } from 'formik';
import TextField from '@mui/material/TextField';
import { StyledRating } from '../Styled';
import Link from 'next/link';
import { useAuth } from '../../utils/auth';
import { BoxPaper, StyledButton } from '../Styled';



interface ComponentProps {
  reviews: Review[];
  productId: string;
}

interface ReviewedProduct {
  addReview: Product;
}

interface MutationVariables {
  body: string;
  rating: number;
  productId: string;
}

interface BodyProps {
  review: Review;
}

interface FormValues {
  rating: number;
  text: string;
}

interface FormErrors {
  rating: string;
  text: string;
}




const validate = (values: FormValues) => {
  const errors = {} as FormErrors;
  if(values.rating < 1 || values.rating > 5) {
    errors.rating = 'You should at least put 1 start';
  }
  if(values.text.length < 5) errors.text = 'At least 5 characters long';


  return errors;
}

const ReviewBody = ({ review }: BodyProps) => {
  return (
    <Box sx={{
      borderTop: '2px solid black',
      padding: '0.7rem',
      overflowX: 'hidden'
    }}>
      <Typography variant="subtitle1">
        {review.postedBy.username}
      </Typography>
      <StyledRating readOnly value={review.rating} />
      <Typography variant="body2" mt='0.9rem' >
        {review.text}
      </Typography>
    </Box>
  )
}

export default function Reviews({ reviews,  productId }: ComponentProps) {
  const theme = useTheme();
  const { isAuthenticated, isLoading } = useAuth();


  const [addreview] = useMutation<
  ReviewedProduct,
  MutationVariables
  >(ADD_REVIEW, {
    refetchQueries: [ { query: GET_PRODUCT_BY_ID, variables: { productId } } ]
  })

  

  return (
    <BoxPaper sx={{
      marginTop: '5rem',
      [theme.breakpoints.up('md')]: {
        marginRight: '0.5rem'
      },
      marginBottom: '2rem'
    }}>
      {
        isAuthenticated
        ?
        <Box sx={{
          padding: '0.7rem',
          marginBottom: '0.5rem'
        }}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>Add a review</Typography>
          <Formik
            initialValues={{
              rating: 0,
              text: ''
            }}
            validate={validate}
            onSubmit={(values, { resetForm }) => {
              addreview({ variables: { body: values.text, rating: Number(values.rating), productId: productId } })
              resetForm();

            } }
          >
            {(formik) => {
              return (
                <Form>
                  
                    <StyledRating  name="rating" id="rating" value={formik.values.rating} onChange={formik.handleChange}  />
                    {formik.touched.rating && formik.errors.rating ? (<Typography color="error">{formik.errors.rating}</Typography>) : null}
                    
                    <TextField
                        variant='standard'
                        multiline
                        fullWidth
                        name="text"
                        id="text"
                        label="Review body"
                        color='primary'
                        value={formik.values.text}
                        onChange={formik.handleChange}
                        error={formik.touched.text && Boolean(formik.errors.text)}
                        helperText={formik.touched.text && formik.errors.text}
                        
                        
                      />
                      <Button type="submit" sx={{ marginTop: '0.9rem', width: '20%' }}>Post</Button>
                  
                  
                </Form>
              )
            }}
          </Formik>
        </Box>
        :
        <Typography  sx={{
          padding: '0.7rem',
          textAlign: 'center',
          fontSize: '1.2rem'
        }}>
          <Link href='/login'>
            <Button variant='text' sx={{ 
              fontSize: '1.2rem',
              '&:hover': {
                backgroundColor: theme.palette.secondary.main,
                color: 'white'
              } 
             }}>Login</Button>
          </Link>
          to post review
        </Typography>
      }
      {
        reviews.length > 0
        ?
        reviews.map(review => {
          return (
            <Box key={review.id}>
              <ReviewBody review={review} />
            </Box>

          )
        })
        :
        <Typography variant="h6">
          No reviews yet. Be the first to post!
        </Typography>
      }
      
      
     
    </BoxPaper>
  )
}