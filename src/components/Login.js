import React, { Component } from 'react';
import { connect } from 'react-redux';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

class Login extends Component {
  componentDidMount() {
    const { setLoggedIn } = this.props;
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => setLoggedIn(user));
  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  render() {
    return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />;
  }
}

export default connect(
  state => ({
    isLoggedIn: state.auth.isLoggedIn
  }),
  dispatch => ({
    setLoggedIn: dispatch.auth.setLoggedIn
  })
)(Login);
