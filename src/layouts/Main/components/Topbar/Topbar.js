import React, { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { AppBar, Toolbar, Badge, Hidden, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/NotificationAddOutlined";
import InputIcon from "@mui/icons-material/Input";

const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  flexGrow: {
    flexGrow: 1,
  },
  signOutButton: {
    marginLeft: theme.spacing(1),
  },
}));

const Topbar = (props) => {
  const { className, onSidebarOpen, ...rest } = props;
  const history = useHistory();
  const [user, setUser] = useState({});
  const classes = useStyles();

  const [notifications] = useState([]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    history.replace("/");
  };

  return (
    <AppBar style={{background:'#007179'}} {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo--white.svg" />
        </RouterLink>
        <div className={classes.flexGrow} />
        <Hidden mdDown>
          <IconButton color="inherit">
            <Badge
              badgeContent={notifications.length}
              color="primary"
              variant="dot"
            >
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton onClick={handleLogout} className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
