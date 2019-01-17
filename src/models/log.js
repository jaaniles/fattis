import { DateTime } from 'luxon';
import fb from '../components/Firebase';

const EMPTY_LOGS = [];

const logs = {
  state: {
    loading: false,
    logs: EMPTY_LOGS
  },
  reducers: {
    setLog(state, logs) {
      return {
        ...state,
        logs
      };
    },
    setLoading(state, payload) {
      return {
        ...state,
        loading: payload
      };
    }
  },
  effects: dispatch => ({
    async loadLogs(payload, rootState) {
      this.setLoading(true);
      const { uid } = rootState.auth.user;

      await fb.logs(uid).on('value', snap => {
        this.setLog(snap.val() || EMPTY_LOGS);
        this.setLoading(false);
      });
    },
    async logDate(payload, rootState) {
      const { uid } = rootState.auth.user;
      const today = DateTime.local().toISODate();

      const toggles = rootState.log.logs[today] || {};

      await fb.logs(uid).update({
        [today]: {
          ...toggles,
          [payload]: payload in toggles ? !toggles[payload] : true
        }
      });
    }
  })
};

export default logs;
