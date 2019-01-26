import firebase from 'firebase/app';
import { DateTime } from 'luxon';

import fb from '../components/Firebase';

const auth = {
  state: {
    isLoggedIn: false,
    user: null
  },
  reducers: {
    setUserInfo(state, payload) {
      return {
        ...state,
        ...payload
      };
    },
    setLoggedIn(state, payload) {
      return {
        ...state,
        isLoggedIn: !!payload,
        user: payload
      };
    },
    setRegisteredAt(state, payload) {
      return {
        ...state,
        registeredAt: payload
      };
    }
  },
  effects: dispatch => ({
    async createUser(payload, rootState) {
      const registeredAt = DateTime.local().toISODate();
      await fb.user(rootState.auth.user.uid).set({
        registeredAt
      });
      this.setRegisteredAt(registeredAt);
    },
    async loadUser(payload, rootState) {
      await fb.user(rootState.auth.user.uid).on('value', snap => {
        const data = snap.val();

        if (!data) {
          return;
        }

        this.setUserInfo(data);
      });
    },
    async logout() {
      try {
        firebase.auth().signOut();
      } catch (e) {
        console.warn('Signout failed!');
      }
      this.setLoggedIn(false);
    }
  })
};

export default auth;
