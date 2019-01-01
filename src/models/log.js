import { DateTime } from 'luxon';
import fb from '../components/Firebase';

const EMPTY_LOGS = [];

const logs = {
  state: {
    isLoading: false,
    logs: EMPTY_LOGS
  },
  reducers: {
    setLog(state, logs) {
      return {
        ...state,
        logs
      };
    }
  },
  effects: dispatch => ({
    async loadLogs(payload, rootState) {
      const { uid } = rootState.auth.user;

      await fb.logs(uid).on('value', snap => {
        this.setLog(snap.val() || EMPTY_LOGS);
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
