import React, { useEffect, useState } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { Grid, Typography, Container } from '@material-ui/core';
import { firebase } from '../../firebase-object';
import SignupForm from './signupForm';

let SignupPage = (props) => {

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        // firebase onauthstatechanged returns the unsubscribe funcntion
        // so we return it, so useEffect will use the unsubscribe function
        // as part of the component unmount clean up
        setCheckingAuth(false);
        props.history.replace('/profile');

      } else {
        // No user is signed in.
        console.log('onauthstatechanged else');
        setCheckingAuth(false);
      }
    });
  }, []);

  return checkingAuth ? null :
    (
      <Container>
        <Grid
          container
          item
          justify="center"
          direction="column"
          alignItems="center"
          spacing={4}
          style={{ minHeight: '100vh' }}
        >
          <Grid item>
            <Typography
              align='center'
              variant='h3'
              component='h1'
            >
              Sign Up
          </Typography>
          </Grid>
          <Grid item>
            <SignupForm />
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              Already have an account? Click here to <Link to="/login">Login!</Link>
            </Typography>
          </Grid>
        </Grid >
      </Container>
    )
}

export default withRouter(SignupPage);