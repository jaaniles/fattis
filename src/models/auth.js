import firebase from 'firebase/app';

import fb from '../components/Firebase';

const auth = {
  state: {
    isLoggedIn: false,
    user: null
  },
  reducers: {
    setLoggedIn(state, payload) {
      return {
        ...state,
        isLoggedIn: !!payload,
        user: payload
      };
    }
  },
  effects: dispatch => ({
    async hello(payload, rootState) {
      fb.user(rootState.auth.user.uid).set({
        hello: 'SATAN!'
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
