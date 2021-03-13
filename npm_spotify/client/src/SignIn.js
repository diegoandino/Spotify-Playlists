import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockIcon from '@material-ui/icons/Lock';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center" className="copyright">
      {'Copyright © '}
      <Link color="inherit" href="#">
        andino.io
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.success.main,
  }
}));

function SignIn() {
  const classes = useStyles();

  return (
    <div className="sign-in-body">
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <div>
          <h1 className="sign-in-text">Sign in</h1>
        </div>
        <form action="http://localhost:8000/login" className="login-btn-parent">
            <input type="submit" value="Login With Spotify" className="login-btn"/>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </div>
  );
}

export default SignIn;