import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as qs from 'query-string';
import firebase from 'firebase/app';
import 'firebase/functions';

class Withings extends Component {
  state = {
    redirect: null
  };

  componentDidMount = () => {
    const parsedLocation = qs.parse(window.location.search);
    this.oauth(parsedLocation);
  };

  oauth = async params => {
    const { user } = this.props;

    const body = {
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_WITHINGS_CLIENT_ID,
      code: params.code,
      redirect_uri: 'https://fattis-2c690.firebaseapp.com/callback'
    };

    const callIt = firebase.functions().httpsCallable('webApi/api/v1/oauth');
    const res = await callIt({
      body: body,
      uid: user.uid
    });

    this.setState({ redirect: res.data });
  };

  render() {
    const { redirect } = this.state;

    return (
      <div>
        <h4>Authenticating Withings...</h4>
        {redirect && <Redirect to="/" />}
      </div>
    );
  }
}

export default connect(
  state => ({
    user: state.auth.user
  }),
  dispatch => ({})
)(Withings);
