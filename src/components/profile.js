import React, { useState } from 'react'
import { Grid, Button } from '@material-ui/core';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { firebase } from '../firebase-object';

const signOut = () => {
  firebase.auth().signOut()
    .then(() => {
      this.props.history.push('/login');
    })
    .catch(() => {
      console.log('failed to logout');
    })
}

let Profile = () => {
  return (!firebase.auth().currentUser) ? <Redirect to="/login" /> : (
    <div>
      Profile Page!
      <Link to="/login">back to login</Link>
      <Button varient="contained" onClick={signOut}>sign out</Button>
    </div>
  );
}

export default withRouter(Profile);
