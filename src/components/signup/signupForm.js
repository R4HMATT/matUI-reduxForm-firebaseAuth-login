import React, { Component } from 'react';
import { Grid, Button, FormHelperText } from '@material-ui/core';
import { renderTextField } from '../renderMatUI';
import { firebase } from '../../firebase-object';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { withRouter } from 'react-router-dom';

const validate = values => {
  let errors = {};
  if (!values['signup-email']) {
    errors['signup-email'] = 'Required';
  }
  if (!values['signup-pw']) {
    errors['signup-pw'] = 'Required';
  }
  return errors;
}

const firebaseSignup = (email, pw) => {
  return firebase.auth().createUserWithEmailAndPassword(email, pw)
    .then((res) => {
      console.log('signed up!');
      this.props.history.push('/profile');
      // console.log(res.credential.toJSON());
    })
    .catch(error => {
      console.log('error!', error);
      let errorCode = error.code;
      throw new SubmissionError({ ['signup-email']: ' ', ['signup-pw']: ' ', _error: 'Signup Failed!' });

    })
};

const handleLogin = values => {
  return firebaseSignup(values['signup-email'], values['signup-pw']);
};


let SignupForm = ({ error, handleSubmit, submitting, valid }) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item>
        <Field name="signup-email" component={renderTextField} label="Email" />
      </Grid>
      <Grid item>
        <Field name="signup-pw" type="password" component={renderTextField} label="Password" />
      </Grid>
      <Grid item><FormHelperText disabled={!error} error={true}>{error}</FormHelperText></Grid>
      <Grid item>
        <Button onClick={handleSubmit(handleLogin)} type="submit" disabled={submitting} color={lightGreen[600]} variant="contained">Submit</Button>
      </Grid>
    </Grid>
    // </Grid>
  )
}

SignupForm = reduxForm({
  form: 'signup',
  validate
})(SignupForm)

export default withRouter(SignupForm);