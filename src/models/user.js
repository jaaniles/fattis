import fb from '../components/Firebase';

const weight = {
  state: {},
  reducers: {
    setUser(state, payload) {
      return {
        ...state,
        ...payload
      };
    }
  },
  effects: dispatch => ({
    async tryCreateUser(payload, rootState) {
      const { uid } = rootState.auth.user;

      await fb.weight(uid).on('value', snap => {
        const data = snap.val();
        if (!data) {
          return;
        }
        this.setWeight(data);
      });
    }
  })
};

export default weight;
