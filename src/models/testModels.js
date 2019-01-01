const count = {
  state: {
    feelings: 'ok'
  },
  reducers: {
    // handle state changes with pure functions
    increment(state, payload) {
      return state + payload;
    },
    testFeelings(state, payload) {
      return {
        feelings: payload
      };
    }
  },
  effects: dispatch => ({
    // handle state changes with impure functions.
    // use async/await for async actions
    async incrementAsync(payload, rootState) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      dispatch.count.increment(payload);
    }
  })
};

export default count;