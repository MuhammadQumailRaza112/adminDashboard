import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { LoadingButton } from "@mui/lab";
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  } from "../App.css";
import { signup } from '../store/actions/authActions';
import encrypt from '../services/Encryption';
import { useHistory } from "react-router-dom";
import { Alert, Snackbar } from '@mui/material';
import { validateEmail } from '../shared/validators';

function Copyright(props) {
  return (
    <Typography variant="body2" className="color" align="center" {...props}>
      {'Copyright © '}
      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {

    const history = useHistory()
   const [isLoading, setIsLoading] = React.useState(false); 
   const [alertData, setAlertData] = React.useState({
    open: false,
    severity: "",
    msg: "",
});

const handleClose = () => {
    setAlertData({
        open: false,
        severity: "",
        msg: "",
    });
};

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    if(!validateEmail(data.get('email')) || !data.get('password')){
        setAlertData({
            open:true,
            msg:"Invalid Email or Password!",
            severity:'error'
        })
        setIsLoading(false)
        return
    }
    let params = {
        email: data.get('email'),
        password: encrypt(data.get('password')),
        firstName: data.get('firstName'),
        lastName: data.get('lastName')
    }
    
    signup(params,(status, res) => {
        console.log('res', res)
        if(status){
            setAlertData({
                open:true,
                msg:'Successfully Registered!',
                severity:'success'
            })
            setTimeout(() => {
                history.replace('/signin')

            },2000)
        }
        else{
            setAlertData({
                open:true,
                msg:res?.data?.error,
                severity:'error'
            })
        }
        setIsLoading(false)
    })
    // fetch('http://localhost:3003/signup',{
    //     method:"POST",
    //     headers:{
    //         'Content-Type': 'application/json'
    //     },
    //     body:JSON.stringify(params)
    // }).then(res => res.json()).then(res =>{
    //     console.log('res', res)
    // }).catch(err =>{
    //     console.log(err)
    // })
  };

  return (
    <ThemeProvider theme={theme}>
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
          <Avatar sx={{ m: 1, bgcolor: '#007179' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography  component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              loading={isLoading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              className="backgroundColor"
            >
              Sign Up
            </LoadingButton>
            <Snackbar open={alertData.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertData.severity} sx={{ width: '100%' }}>
          {alertData.msg}
        </Alert>
      </Snackbar>
            <Grid container justifyContent="center">
              <Grid item>
                <Link onClick={() => history.push('/signin')} href="/signin" className="color" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}