import React, { Component } from 'react';
import axios from 'axios';
import * as qs from 'query-string';

class Withings extends Component {
  confirmAuth = () => {
    const parsedLocation = qs.parse(window.location.search);
    this.oauth(parsedLocation);
  };

  oauth = async params => {
    const res = await axios.post('https://account.withings.com/oauth2/token', {
      grant_type: 'authorization_code',
      client_id: process.env.REACT_APP_WITHINGS_CLIENT_ID,
      client_secret: process.env.REACT_APP_WITHINGS_CLIENT_SECRET,
      code: params.code,
      redirect_uri: 'https://fattis-2c690.firebaseapp.com/api/v1/callback'
    });
    console.log(res);
  };

  render() {
    return (
      <div>
        <h4>Authenticating Withings...</h4>
        <button onClick={this.confirmAuth} />
      </div>
    );
  }
}

export default Withings;
