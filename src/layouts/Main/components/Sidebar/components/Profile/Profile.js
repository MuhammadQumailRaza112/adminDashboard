import React, {useState, useEffect} from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { Avatar, Typography } from "@mui/material";
import { getUser } from "../../../../../../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  name: {
    paddingTop: '20px',
  },
  email: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    paddingBottom:'20px'

  },
}));

const Profile = (props) => {
  const [user, setUser] = useState({});

  const { className, ...rest } = props;

  const classes = useStyles();

  const userDummy = {
    name: "Shen Zhi",
    avatar: "/images/avatars/avatar_11.png",
    bio: "Brain Director",
  };

  useEffect(() => {
    getUser((status, res) => {
      if (status) {
        setUser(res.user);
      }
    });
  }, []);

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={userDummy.avatar}
        to="/settings"
      />
      <Typography className={classes.name} variant="h4">
      {user?.firstName} {user?.lastName}
      </Typography>
      <Typography className={classes.email} variant="body2">{user?.email}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
