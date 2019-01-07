import { DateTime } from 'luxon';
import firebase from 'firebase/app';

import fb from '../components/Firebase';

const withings = {
  state: {
    lastRefreshTimestamp: null
  },
  reducers: {
    setRefreshTimestamp(state) {
      return {
        ...state,
        lastRefreshTimestamp: Math.round(new Date().getTime() / 1000)
      };
    },
    setAccessData(state, accessData) {
      return {
        ...state,
        ...accessData.val()
      };
    }
  },
  effects: dispatch => ({
    async init(payload, rootState) {
      const { uid } = rootState.auth.user;
      fb.withings(uid).on('value', this.setAccessData);
    },
    async updateWeight(payload, rootState) {
      const { uid } = rootState.auth.user;
      const { access_token } = rootState.withings;

      if (!access_token || !uid) {
        return;
      }

      const url = `https://wbsapi.withings.net/measure?action=getmeas&access_token=${access_token}&meastype=1`;
      const fetchWeightData = async () => await (await fetch(url)).json();

      const response = await fetchWeightData();

      // TODO: implement middleware that checks this?
      if (!response || response.status === 401) {
        await this.refreshToken();
        this.updateWeight();
        return;
      }

      const weightData = response.body.measuregrps.map(measure => {
        const date = DateTime.fromMillis(measure.created * 1000);
        return {
          date: date.toISODate(),
          value: measure.measures[0].value / 1000
        };
      });

      const currentWeightData = await fb.weight(uid).once('value');

      await weightData.forEach(async (m, i) => {
        const current = currentWeightData.val();

        if (current && m.date in current) {
          return;
        }

        await fb.weight(uid).update({
          [m.date]: {
            value: m.value
          }
        });
      });
    },
    async refreshToken(payload, rootState) {
      const { lastRefreshTimestamp } = rootState.withings;
      const now = Math.round(new Date().getTime() / 1000);

      if (lastRefreshTimestamp && now - lastRefreshTimestamp < 10) {
        return;
      }

      this.setRefreshTimestamp();

      const params = {
        grant_type: 'refresh_token',
        client_id: process.env.REACT_APP_WITHINGS_CLIENT_ID,
        refresh_token: rootState.withings.refresh_token
      };

      const refreshToken = firebase.functions().httpsCallable('webApi/api/v1/withingsAccess');
      await refreshToken({
        params,
        uid: rootState.auth.user.uid
      });
    },
    async authorize(payload, rootState) {
      const url = `https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=${
        process.env.REACT_APP_WITHINGS_CLIENT_ID
      }&state=fattis&scope=user.metrics&redirect_uri=https://fattis-2c690.firebaseapp.com/callback`;
      window.location.href = url;
    }
  })
};

export default withings;
