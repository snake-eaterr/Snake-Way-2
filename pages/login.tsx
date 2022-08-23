import { Layout } from '../components/Layout';
import Box from '@mui/material/Box';
import { Typography, useTheme } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Values, Token } from '../types';
import TextField from '@mui/material/TextField';
import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../apollo/mutations';
import { useEffect , useState} from 'react';
import Head from 'next/head';
import { useAuth } from '../utils/auth';
import { StyledButton } from '../components/Styled';
import { BoxPaper } from '../components/Styled';

interface MutationVariables {
  username: string;
  password: string;
}

export default function Login() {
  let timeout: ReturnType<typeof setTimeout>;
  const [gError, setGError] = useState<string>('');
  const { isAuthenticated, isLoading, logIn } = useAuth();

  

  useEffect(() => {
    if(!isLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading])

  

  const router = useRouter();
 

  const theme = useTheme();
 
  const formValues: Values = { username: '', password: '' };

  

  const [login, result] = useMutation<
    { login: Token },
    MutationVariables
  >(LOGIN, {
    onError: (error) => {
      setGError(error.graphQLErrors[0].message);
      clearTimeout(timeout)
			timeout = setTimeout(() => {
				setGError('');
			}, 7000)
		},
    
  })

  useEffect(() => {
    if(result.data) {
      const token = result.data.login.value;
      logIn && logIn(token);
    }
    
  }, [result.data]);

 

  return (
    <Layout>
      <Head>
        <title>Login to your account</title>
      </Head>
      <BoxPaper 
        sx={{
          maxWidth: '50vw',
          [theme.breakpoints.down('md')]: {
            maxWidth: '95vw'
          },
          margin: 'auto',
          marginTop: '2rem',
          textAlign: 'center'
        }}
        >

          <Typography variant="h3" sx={{
            padding: '1.2rem 0',
            fontWeight: 400,
            [theme.breakpoints.down('md')]: {
              fontSize: '1.8rem'
            }
          }}>
            Login to your account
          </Typography>
          <hr style={{ color: theme.palette.secondary.main }}/>
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
            
            onSubmit={values => login({ variables: { username: values.username, password: values.password } })}
        
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
                     <StyledButton variant="contained"  type="submit" sx={{ marginBottom: '2rem' }}>Login</StyledButton>
                     {  gError && <Typography color="error" mb="2rem">{gError}</Typography>  }
                  </Box>
                </Form>
              )
            }}
          </Formik>
        </BoxPaper>
      
    </Layout>
  )
}