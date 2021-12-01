import './App.css';
import SignIn from './components/Signin';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SignUp from './components/Signup';
import Home  from './components/Home';
import {ThemeProvider  } from "@mui/styles";
import theme from "./theme";
import { Main as MainLayout } from "./layouts";
import { RouteWithLayout } from "./components";

const isUser = { isAuthenticated: false };

const isUserAuthenticate = () => {
  const userData = JSON.parse(sessionStorage.getItem("user"));
  if (userData) {
    isUser.isAuthenticated = true;
  } else {
    isUser.isAuthenticated = false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => {
  let user = rest.props;
  let isAuthenticated = user;
  isUserAuthenticate();
  return (
    <Route
      exact
      {...rest}
      render={(props) =>
        isAuthenticated || (isUser && isUser.isAuthenticated) ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};

function App() {
  return (
    <ThemeProvider theme={theme}>
    <div>
    <Router>
        <Switch>
        <RouteWithLayout
        component={Home}
        exact
        layout={MainLayout}
        path="/"
      />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
    </Router>
    </div>
    </ThemeProvider>
  );
}

export default App;
