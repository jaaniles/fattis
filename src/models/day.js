/*

  const week = [
    {
      day: "dd-mm-yyyy",
      healthyFood: false,
      gym: false,
      aerobic: false
    }
  ]

*/

const day = {
  state: {},
  reducers: {
    setDayAchievement(state, payload) {
      return {
        ...state,
        [payload]: true
      };
    },
    getDayAchievements(state, payload) {}
  }
};

export default day;
