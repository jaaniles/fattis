import firebase from 'firebase/app';

const auth = {
  state: {
    isLoggedIn: false
  },
  reducers: {
    setLoggedIn(state, payload) {
      return {
        ...state,
        isLoggedIn: payload || false
      };
    }
  },
  effects: dispatch => ({
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
