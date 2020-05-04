import React from 'react';
import { Grid, Typography, Container } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { firebase } from '../../firebase-object';
import LoginForm from './loginForm';
import { withRouter } from 'react-router-dom';

let LoginPage = (props) => {

  console.log('user', firebase.auth().currentUser);

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
              Login
            </Typography>
          </Grid>
          <Grid item>
            <LoginForm />
          </Grid>
          <Grid item>
            <Typography variant='body1'>
              New user? Click here to <Link to="/signup">Sign Up!</Link>
            </Typography>
          </Grid>
        </Grid >
      </Container>
    )
}

export default withRouter(LoginPage);