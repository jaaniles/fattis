import { DateTime } from 'luxon';

import fb from '../components/Firebase';

const chat = {
  state: {
    history: [],
    newMessages: [],
    loading: true
  },
  reducers: {
    setChat(state, payload) {
      return {
        ...state,
        history: payload.history,
        newMessages: payload.newMessages
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
    async loadChat(payload, rootState) {
      this.setLoading(true);

      const { uid } = rootState.auth.user;

      await fb.chat(uid).on('value', snap => {
        const data = snap.val();

        if (!data) {
          this.setLoading(false);
          return;
        }

        const chat = fb.toArray(data);
        const newMessages = chat.filter(d => d.seen !== true);
        const history = chat.filter(d => d.seen === true);

        this.setChat({ newMessages, history });
        this.setLoading(false);
      });
    },
    async readMessage(payload, rootState) {
      const { uid } = rootState.auth.user;

      await fb.chat(uid).update({
        [payload.id]: {
          message: payload.message,
          timestamp: payload.timestamp,
          seen: true
        }
      });
    },
    async addNewMessage(payload, rootState) {
      const { uid } = rootState.auth.user;
      await fb.chat(uid).push({
        message: payload.message,
        timestamp: DateTime.local().toISO(),
        seen: false
      });
    }
  })
};

export default chat;
