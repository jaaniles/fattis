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

  oauth = async urlParams => {
    const { user } = this.props;

    const params = {
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_WITHINGS_CLIENT_ID,
      code: urlParams.code,
      redirect_uri: 'https://fattis-2c690.firebaseapp.com/callback'
    };

    const getAccess = firebase.functions().httpsCallable('webApi/api/v1/withingsAccess');
    const res = await getAccess({
      params,
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
