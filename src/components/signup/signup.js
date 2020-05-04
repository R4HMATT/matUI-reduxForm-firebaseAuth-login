import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Grid, Typography, Container } from '@material-ui/core';
import { firebase } from '../../firebase-object';
import SignupForm from './signupForm';

let SignupPage = () => {
  console.log(firebase.auth().currentUser);
  return (firebase.auth().currentUser) ? <Redirect to="/profile" /> :
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

export default SignupPage;