import React, { Component } from 'react';
import { Grid, Button, FormHelperText } from '@material-ui/core';
import { renderTextField } from '../renderMatUI';
import { firebase } from '../../firebase-object';
import lightGreen from '@material-ui/core/colors/lightGreen';
import { reduxForm, Field, SubmissionError, clearSubmitErrors, clearAsyncError } from 'redux-form';
import { withRouter } from 'react-router-dom';

const validate = values => {
  let errors = {};
  if (!values['login-email']) {
    errors['login-email'] = 'Required';
  }
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values['login-email'])) {
    errors['login-email'] = 'Pleaser enter valid email';
  }
  if (!values['login-pw']) {
    errors['login-pw'] = 'Required';
  }
  return errors;
}

class LoginForm extends Component {

  firebaseLogin = (email, pw) => {
    return firebase.auth().signInWithEmailAndPassword(email, pw)
      .then((res) => {
        console.log('signed in!');
      })
      .catch(error => {
        console.log('error!', error);
        let errorCode = error.code;
        throw new SubmissionError({ _error: `Login Failed! error: ${errorCode}` });

      })
  };

  handleLogin = values => {
    return this.firebaseLogin(values['login-email'], values['login-pw']);
  };


  render() {
    const { error, handleSubmit, submitting, valid } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <Field name="login-email" component={renderTextField} label="Email" />
        </Grid>
        <Grid item>
          <Field name="login-pw" type="password" component={renderTextField} label="Password" />
        </Grid>
        <Grid item><FormHelperText disabled={!error} error={true}>{error}</FormHelperText></Grid>
        <Grid item>
          <Button onClick={handleSubmit(this.handleLogin)} type="submit" disabled={submitting} variant="contained">Submit</Button>
        </Grid>
      </Grid>
    )
  }
}

LoginForm = reduxForm({
  form: 'login',
  validate,
})(LoginForm)

export default LoginForm;