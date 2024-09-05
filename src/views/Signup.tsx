import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Formik, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { Account } from '../Types';
import axiosClient from '../axios-client';
import { useStateContext } from '../context/ContextProvider';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignUp() {

  const {setUser, setToken} = useStateContext();
  const Submit = async (values: any) => {
    console.log(values);
    // combine first and last name into name
    values.name = `${values.firstName} ${values.lastName}`;
    const response = axiosClient.post('/signup', values);
    return response;
  };

  const formik = useFormik<Account>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      password_confirmation: '',
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      Submit(values).then((res) => {
        setUser(res.data.user);
        setToken(res.data.token);
        alert('Sign Up Success');
        formik.setSubmitting(false);
        console.log(res);
      })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.response && err.response.status === 422) {
            alert(`Validation Error: ${err.response.errors}`);
          }
        });
    },
  });

  const {
    handleSubmit,
    handleChange,
    values,
    errors,
    touched,
    isSubmitting,
    getFieldProps,
    dirty,
  } = formik;


  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <FormikProvider value={formik}>
            <form autoComplete='off' noValidate onSubmit={handleSubmit}>

              <Box sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="First Name"
                      {...getFieldProps('firstName')}
                      error={Boolean(touched.firstName && errors.firstName)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Last Name"
                      {...getFieldProps('lastName')}
                      error={Boolean(touched.lastName && errors.lastName)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      type="email"
                      {...getFieldProps('email')}
                      error={Boolean(touched.email && errors.email)}

                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Password"
                      type="password"
                      {...getFieldProps('password')}
                      error={Boolean(touched.password && errors.password)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Password Confirmation"
                      type="password"
                      {...getFieldProps('password_confirmation')}
                      error={Boolean(touched.password && errors.password)}
                    />
                  </Grid>
                </Grid>
                <LoadingButton
                  type="submit"
                  fullWidth
                  variant="contained"
                  loading={isSubmitting}
                  disabled={!dirty}
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </LoadingButton>

                <Grid container justifyContent="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                      Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </FormikProvider>

        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}