import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

const RouteWithLayout = (props) => {
  const isUser = { isAuthenticated: false };

  const isUserAuthenticate = () => {
    const userData = JSON.parse(sessionStorage.getItem("user"));
    if (userData) {
      isUser.isAuthenticated = true;
    } else {
      isUser.isAuthenticated = false;
    }
  };

  const { layout: Layout, component: Component, ...rest } = props;
  let user = rest.props;
  let isAuthenticated = user;
  isUserAuthenticate();

  return (
    <Route
      {...rest}
      render={(matchProps) =>isAuthenticated || (isUser && isUser.isAuthenticated) ? (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )
      : (
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

RouteWithLayout.propTypes = {
  component: PropTypes.any.isRequired,
  layout: PropTypes.any.isRequired,
  path: PropTypes.string,
};

export default RouteWithLayout;
