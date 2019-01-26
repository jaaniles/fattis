import React, { Component } from 'react';
import { connect } from 'react-redux';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import fb from './Firebase';
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
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(this.handleAuth);
  }

  handleAuth = async user => {
    const { createUser, setLoggedIn } = this.props;

    if (!user) {
      return;
    }

    try {
      const userExists = await fb.userExists(user.uid).once('value');
      if (!userExists.val()) {
        createUser();
      }
    } catch (e) {
      console.log('Big error!', e);
    }

    setLoggedIn(user);
  };

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
    setLoggedIn: dispatch.auth.setLoggedIn,
    createUser: dispatch.auth.createUser
  })
)(Login);
