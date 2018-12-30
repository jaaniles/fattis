const emptyWeek = [{}, {}, {}, {}, {}, {}, {}];

const week = {
  state: {
    week: emptyWeek
  },
  reducers: {
    setWeek(state, payload) {
      return {
        ...state,
        week: payload || emptyWeek
      };
    }
  },
  effects: dispatch => ({
    async updateWeek(payload, rootState) {
      const week = await localStorage.getItem(`WEEK${payload}`);
      this.setWeek(JSON.parse(week));
    },
    async setDayAchievement(payload, rootState) {
      const { dayNumber, healthyFood, gym, aerobic } = payload;
      const {
        week: { week }
      } = rootState;

      const weekNumber = 40;

      const day = week[payload.dayNumber];
      const newDay = Object.assign(
        { ...day },
        healthyFood !== undefined && { healthyFood },
        gym !== undefined && { gym },
        aerobic !== undefined && { aerobic }
      );

      const newWeek = Object.assign([], week, { [dayNumber]: newDay });

      await localStorage.setItem(`WEEK${weekNumber}`, JSON.stringify(newWeek));
      await this.updateWeek(weekNumber);
    }
  })
};

export default week;
