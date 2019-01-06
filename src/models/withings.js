import { DateTime } from 'luxon';

import fb from '../components/Firebase';

const withings = {
  state: {},
  reducers: {
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
      fb.withings(uid).once('value', this.setAccessData);
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
    async authorize(payload, rootState) {
      const url = `https://account.withings.com/oauth2_user/authorize2?response_type=code&client_id=${
        process.env.REACT_APP_WITHINGS_CLIENT_ID
      }&state=fattis&scope=user.metrics&redirect_uri=https://fattis-2c690.firebaseapp.com/callback`;
      window.location.href = url;
    }
  })
};

export default withings;
