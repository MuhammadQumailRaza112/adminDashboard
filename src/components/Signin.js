import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import {Link, Container, Typography, Grid, Box, TextField, Snackbar, Alert} from '@mui/material';
import { LoadingButton } from "@mui/lab";
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {  } from "../App.css";
import { signin } from '../store/actions/authActions';
import encrypt from '../services/Encryption';
import { useHistory } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {

 const history = useHistory();   
   const [isLoading, setIsLoading] = React.useState(false); 
   const [alertData, setAlertData] = React.useState({
    open: false,
    severity: "",
    msg: "",
});

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)
    const data = new FormData(event.currentTarget);
    const params = {
        email: data.get('email'),
      password: encrypt(data.get('password'))
    }
    signin(params, (status, res)=>{
        if(status){
            setAlertData({
                open:true,
                msg:'Successfully Logged in!',
                severity:'success'
            })
            sessionStorage.setItem("user", JSON.stringify(res.token))
            history.replace('/')
        }
        else{
            console.log(res.data.error)
            setAlertData({
                open:true,
                msg:res?.data?.error,
                severity:'error'
            })
        }
        setIsLoading(false)
    })
  };

  const handleClose = () => {
    setAlertData({
        open: false,
        severity: "",
        msg: "",
    });
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
          <Avatar sx={{ m: 2, bgcolor: '#007179' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            
            <LoadingButton
              type="submit"
              fullWidth
              loading={isLoading}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              style={{background:'#007179'}}
            >
              Sign In
            </LoadingButton>
            <Snackbar open={alertData.open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alertData.severity} sx={{ width: '100%' }}>
          {alertData.msg}
        </Alert>
      </Snackbar>
            <Grid container>
              <Grid display="flex" marginTop="10px" justifyContent="center" item xs={12}>
                <Link href="#" className="color"  variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid alignItems="center" display="flex" marginTop="20px" justifyContent="center" item xs={12}>
                <Link onClick={() => history.push('/signup')} className="color" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}