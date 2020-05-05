import React, { useEffect, useState } from 'react'
import { Grid, Button, Container, Typography } from '@material-ui/core';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { firebase } from '../firebase-object';


const signOut = (history) => {
  firebase.auth().signOut()
    .then(() => {
      // console.log(props)
      // TODO refactor this into useffect
      console.log('logged out')
    })
    .catch(() => {
      console.log('failed to logout');
    })
}
console.log('profile user', firebase.auth().currentUser);

let Profile = (props) => {


  const [user, setUser] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setCheckingAuth(false);
        setUser(user);
        console.log('profile user', user);
        console.log(user.email);
        console.log('user is authorized');
      }
      else {
        console.log('unauthorized user');
        setCheckingAuth(false);
        props.history.replace('/login');
      }
    });
  }, []);

  return (checkingAuth || !user) ? null : (
    // <Container>
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={2}
    // style={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Typography
          align='center'
          variant='h3'
          component='h1'
        >
          Profile Page
          </Typography>
      </Grid>
      <Grid item>
        <Typography
          align='left'>
          email: {user.email}
        </Typography>
        {/* </Grid> */}
        {/* <Grid item> */}
        <Typography
          align='left'>
          account creation time: {user.metadata.creationTime}
        </Typography>
      </Grid>
      <Grid item><Link to="/login">back to login</Link></Grid>
      <Grid item><Button variant="contained" onClick={() => signOut(props.history)}>sign out</Button></Grid>
    </Grid>
    // </Container >
  );
}

export default withRouter(Profile);
