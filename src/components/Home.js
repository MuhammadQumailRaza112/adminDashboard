// import React,{useEffect, useState} from 'react';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { Grid } from '@mui/material';
// import { getUser } from '../store/actions/authActions';
// import Button from '@mui/material/Button';
// import '../App.css'
// import { useHistory } from "react-router-dom";

// const theme = createTheme();


// export default function Home() {

//     const history = useHistory()
//     const [user, setUser] = useState({})

//     const handleLogout = () => {
//         sessionStorage.removeItem("user");
//         history.replace('/')   
//     }

//     useEffect(()=>{
//         getUser((status,  res)=>{
//             if(status){
//                 setUser(res.user)
//             }
//         })
//     },[])

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="lg">
//         <Grid container>
//         <Grid item xs={12} marginTop="20px"  justifyContent="flex-end" display="flex">
//         <Button onClick={handleLogout} className="backgroundColor" variant="contained">Logout</Button>
//         </Grid>
//             <Grid item xs={12} marginTop="20px"  justifyContent="center" display="flex">
//         <Typography>Hi! {user?.firstName} {user?.lastName}</Typography>
//     </Grid>
//         <Grid item xs={12} marginTop="10px"  justifyContent="center" display="flex">
//         <Typography display="block">{user?.email}</Typography>
//         </Grid>
//         </Grid>
//       </Container>
//     </ThemeProvider>
//   );
// }

import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid } from '@mui/material';

import {
  Budget,
  TotalUsers,
  TasksProgress,
  TotalProfit,
  LatestSales,
  UsersByDevice,
  LatestProducts,
  LatestOrders
} from './Dashboard/components';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={6}
          sm={6}
          xl={3}
          xs={12}
        >
          <Budget />
        </Grid>
        <Grid
          item
          lg={6}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalUsers />
        </Grid>
        <Grid
          item
          lg={6}
          sm={6}
          xl={3}
          xs={12}
        >
          <TasksProgress />
        </Grid>
        <Grid
          item
          lg={6}
          sm={6}
          xl={3}
          xs={12}
        >
          <TotalProfit />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestSales />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={3}
          xs={12}
        >
          <UsersByDevice />
        </Grid>
        <Grid
          item
          lg={6}
          md={6}
          xl={3}
          xs={12}
        >
          <LatestProducts />
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xl={9}
          xs={12}
        >
          <LatestOrders />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
