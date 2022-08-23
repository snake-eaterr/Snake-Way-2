import { Layout } from '../components/Layout';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Values, ReturnedUser } from '../types';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../apollo/mutations';
import { useEffect , useState} from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import authHelper from '../utils/auth-helper';
import useUser from '../utils/useUser';
import Head from 'next/head';
import { BoxPaper, StyledButton } from '../components/Styled';


interface MutationVariables {
  username: string;
  password: string;
}




export default function Register() {
  let timeout: ReturnType<typeof setTimeout>;
  const theme = useTheme();
  const router = useRouter();
  const [gError, setGError] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const formValues: Values = { username: '', password: '' };

  const { data, loading } = useUser({ redirectTo: '/', redirectIfFound: true });
  console.log(loading)

  

  

  const [createUser, result] = useMutation<
    { createUser: ReturnedUser },
    MutationVariables
  >(CREATE_USER, {
    onError: (error) => {
      setGError(error.graphQLErrors[0].message);
      clearTimeout(timeout)
			timeout = setTimeout(() => {
				setGError('');
			}, 7000)
		}
  });
  
  useEffect(() => {
    if(result.data) {
      setOpen(true);
    }
  }, [result.data])

  

  return (
    <Layout>
      <Head>
        <title>Register an account</title>
      </Head>
      <BoxPaper sx={{
        maxWidth: '50vw',
        [theme.breakpoints.down('md')]: {
          maxWidth: '95vw'
        },
        margin: 'auto',
        textAlign: 'center',
        marginTop: '2rem',
      }}>
        <Typography variant="h3" sx={{
          padding: '1.2rem 0',
          fontWeight: 400,
          [theme.breakpoints.down('md')]: {
            fontSize: '1.8rem'
          }
        }}>
          Register an account
        </Typography>
        <hr style={{ color: theme.palette.primary.main }}/>
        <Formik
          initialValues={formValues}

          validationSchema={Yup.object({
            username: Yup.string()
              .max(15, 'Must not exceed 15 characters')
              .min(8, 'Must be 8 characters or more' )
              .required('Required'),
            password: Yup.string()
              .max(20, 'Must not exceed 20 characters')
              .min(8, 'Must be 8 characters or more')
              .required('Required')
          })}
          
          onSubmit={values => createUser({ variables: { username: values.username, password: values.password } })}
      
        >
          {(formik) => {
            return (
              <Form>
                <Box sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '80%',
                  margin: 'auto'
                }}>

                  <TextField
                    variant='standard'
                    name="username"
                    id="username"
                    label="Username"
                    color='primary'
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                    sx={{
                      marginBottom: '2rem',
                      marginTop: '2rem'
                    }}
                    
                  />
                  <TextField
                    variant='standard'
                    name="password"
                    id="password"
                    label="Password"
                    color='primary'
                    type='password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                    sx={{
                      marginBottom: '2rem'
                    }}
                    
                  />
                   <StyledButton variant="contained" type="submit" sx={{ marginBottom: '2rem' }}>Register</StyledButton>
                   {  gError && <Typography color="error" mb="2rem">{gError}</Typography>  }
                </Box>
              </Form>
            )
          }}
         


          
        </Formik>
      </BoxPaper>
      <Dialog open={open}>
				<DialogTitle>New Account</DialogTitle>
				<DialogContent>
					<DialogContentText>
						New account successfully created.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Link href="/login">
						<Button color="secondary"  variant="contained">
							Login
						</Button>
					</Link>
				</DialogActions>
			</Dialog>
    </Layout>
  )
};