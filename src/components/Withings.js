import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import * as qs from 'query-string';
import firebase from 'firebase/app';
import 'firebase/functions';

import Page from '../components/Layout/Page';
import LoadingIndicator from '../components/LoadingIndicator';
import * as ds from '../design';

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
      <Page background={ds.colors.background.level2}>
        <h1 style={{ fontWeight: 800 }}>Authenticating Withings...</h1>
        <LoadingIndicator />
        {redirect && <Redirect to="/" />}
      </Page>
    );
  }
}

export default connect(
  state => ({
    user: state.auth.user
  }),
  dispatch => ({})
)(Withings);
