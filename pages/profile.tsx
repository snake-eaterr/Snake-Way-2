import { Box, Typography } from '@mui/material';
import { Layout } from '../components/Layout/Layout';
import useUser from '../utils/useUser';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { StyledButton, BoxPaper } from '../components/Styled';
import { useMutation } from '@apollo/client';
import { UPDATE_USERNAME } from '../apollo/mutations';
import { ReturnedUser } from '../types';
import { useState, useEffect } from 'react';
import { UPDATE_PASSWORD } from '../apollo/mutations';
import { useTheme } from '@mui/material';
import OrdersHistory from '../components/Product/OrdersHistory';
import { useAuth } from '../utils/auth';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import { ME } from '../apollo/queries';
import RedirectingFullPage from '../components/Redirecting';
import Head from 'next/head';

interface MutationVariables {
  newUsername: string;
}

interface MutationPasswordVariables {
  oldPassword: string;
  newPassword: string;
}

interface PasswordValues {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface PasswordErrors {
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

interface MeQuery {
  me: ReturnedUser;
}



// the password validation is complex, so we go manually instead of using Yup
const validate = (values: PasswordValues) => {
  const errors = {} as PasswordErrors;
  if(!values.oldPassword) errors.oldPassword = 'Required';
  if(!values.newPassword) errors.newPassword = 'Required';
  if(!values.confirmPassword) errors.confirmPassword = 'Required';

  if(values.oldPassword.length > 20 || values.oldPassword.length < 8) errors.oldPassword = 'No more than 20 characters or less than 8 characters';
  if(values.newPassword.length > 20 || values.newPassword.length < 8) errors.newPassword = 'No more than 20 characters or less than 8 characters';
  if(values.confirmPassword.length > 20 || values.confirmPassword.length < 8) errors.confirmPassword = 'No more than 20 characters or less than 8 characters';

  if(values.newPassword !== values.confirmPassword) errors.confirmPassword = 'Passwords don\'t match';
  return errors
}


export default function Profile() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [me, { loading, data }] = useLazyQuery<MeQuery>(ME); //useLazyQuery so we can call it on useEffect and avoid it being called on prerender
  console.log(isAuthenticated, isLoading)
  useEffect(() => {
    if(!isLoading && !isAuthenticated) {
      router.push('/login');
    } else  {
      console.log('HERE')
      me();
    }
  }, [isAuthenticated, isLoading])

 

  const theme = useTheme();
  let timeout: ReturnType<typeof setTimeout>;
  const [success, setSuccess] = useState<string>('');
  const [gError, setGError] = useState<string>('');

  
  console.log(data?.me)

  const [updateUsername, userResult] = useMutation<
  ReturnedUser, 
  MutationVariables
  >(UPDATE_USERNAME, {
    onError: (error) => {
      setGError(error.graphQLErrors[0].message);
      clearTimeout(timeout)
			timeout = setTimeout(() => {
				setGError('');
			}, 7000)
		},
  })

  const [updatePassword, passwordResult] = useMutation<
  ReturnedUser,
  MutationPasswordVariables
  >(UPDATE_PASSWORD, {
    onError: (error) => {
      setGError(error.graphQLErrors[0].message);
      clearTimeout(timeout)
			timeout = setTimeout(() => {
				setGError('');
			}, 7000)
		},
  })

  useEffect(() => {
    if(userResult.data) {
      setSuccess('Username updated successfuly');
      clearTimeout(timeout)
			timeout = setTimeout(() => {
				setSuccess('');
			}, 7000)
    }
  }, [userResult.data])

  useEffect(() => {
    if(passwordResult.data) {
      setSuccess('Password updated successfuly');
      clearTimeout(timeout)
			timeout = setTimeout(() => {
				setSuccess('');
			}, 7000)
    }
  }, [passwordResult.data])
  

  if(isLoading || !isAuthenticated) {
    return (
      <RedirectingFullPage />
    )
  }
  
  
  
 
  return (
    <Layout>
      <Head>
        <title>Profile</title>
      </Head>
      
      <Box mt='5rem'>
        {
          data?.me
          ?
          <Box sx={{
            maxWidth: '50vw',
            [theme.breakpoints.down('md')]: {
              maxWidth: '95vw'
            },
            margin: 'auto',
            textAlign: 'left',
            
          }}>
            <Typography variant="h4">
              Username
            </Typography>
            <BoxPaper sx={{
              marginTop: '0.5rem',
            }}>
              <Formik
                initialValues={{
                  username: data.me.username
                }}

                validationSchema={Yup.object({
                  username: Yup.string()
                    .max(15, 'Must not exceed 15 characters')
                    .min(8, 'Must be 8 characters or more' )
                    .required('Required'),
                })}
                
                onSubmit={values => updateUsername({ variables: { newUsername: values.username } })}
            
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
                        <StyledButton sx={{   marginBottom: '2rem' }} variant="contained" type="submit">Update</StyledButton>
                        {  gError && <Typography color="error" mb="2rem">{gError}</Typography>  }
                        {  success && <Typography color="darkgreen" mb="2rem">{success}</Typography>  }
                      </Box>
                    </Form>
                  )
                }}
              </Formik>
            </BoxPaper>
          </Box>
          :
          null

        }
        {
          data?.me
          ?
          <Box sx={{
            maxWidth: '50vw',
            [theme.breakpoints.down('md')]: {
              maxWidth: '95vw'
            },
            margin: 'auto',
            textAlign: 'left',
            marginTop: '6rem'
          }}>
            <Typography variant="h4">
              Password
            </Typography>
            <BoxPaper sx={{
              marginTop: '0.5rem',
            }}>
              <Formik
                initialValues={{
                  oldPassword: '',
                  newPassword: '',
                  confirmPassword: ''
                }}

                validate={validate}
                
                onSubmit={(values, { resetForm }) => {
                  updatePassword({ variables: { oldPassword: values.oldPassword, newPassword: values.newPassword } });
                  resetForm();
                }}
            
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
                          name="oldPassword"
                          id="oldPassword"
                          type="password"
                          label="Old password"
                          color='primary'
                          value={formik.values.oldPassword}
                          onChange={formik.handleChange}
                          error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                          helperText={formik.touched.oldPassword && formik.errors.oldPassword}
                          sx={{
                            marginBottom: '2rem',
                            marginTop: '2rem'
                          }}
                      
                        />
                        <TextField
                          variant='standard'
                          name="newPassword"
                          id="newPassword"
                          type="password"
                          label="New password"
                          color='primary'
                          value={formik.values.newPassword}
                          onChange={formik.handleChange}
                          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                          helperText={formik.touched.newPassword && formik.errors.newPassword}
                          sx={{
                            marginBottom: '2rem',
                            marginTop: '2rem'
                          }}
                      
                        />
                        <TextField
                          variant='standard'
                          name="confirmPassword"
                          id="confirmPassword"
                          type="password"
                          label="Confirm password"
                          color='primary'
                          value={formik.values.confirmPassword}
                          onChange={formik.handleChange}
                          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                          sx={{
                            marginBottom: '2rem',
                            marginTop: '2rem'
                          }}
                      
                        />
                        <StyledButton variant="contained"  type="submit" sx={{ marginBottom: '2rem' }}>Update</StyledButton>
                        {  gError && <Typography color="error" mb="2rem">{gError}</Typography>  }
                        {  success && <Typography color="darkgreen" mb="2rem">{success}</Typography>  }
                      </Box>
                    </Form>
                  )
                }}
              </Formik>
            </BoxPaper>
          </Box>
          :
          null

        }
        {
          data?.me
          ?
          <OrdersHistory />
          :
          null
        }
      </Box>
    </Layout>
  )
}