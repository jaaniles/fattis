const logs = {
  state: {},
  reducers: {},
  effects: dispatch => ({
    async authorize(payload, rootState) {
      const url = `https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=${
        process.env.REACT_APP_WITHINGS_CLIENT_ID
      }&state=fattis&scope=user.metrics&redirect_uri=https://fattis-2c690.firebaseapp.com/api/v1/callback`;

      window.location.href = url;
    }
  })
};

export default logs;
