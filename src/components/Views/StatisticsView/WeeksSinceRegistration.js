import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import TimeAgo from 'react-timeago';

import * as ds from '../../../design';

const WeekButton = styled.button(props => ({
  outline: 'none',
  borderRadius: 15,
  whiteSpace: 'nowrap',
  border: `1px solid ${ds.colors.red}`,
  background: props.toggle ? ds.colors.red : 'none',
  color: 'white',
  paddingRight: ds.scale(2),
  paddingLeft: ds.scale(2),
  height: 35,
  margin: 6,

  transition: 'all 200ms ease-in-out'
}));

class WeeksSinceRegistration extends Component {
  getWeekButtonLabel = (i, today) => {
    const t = DateTime.fromISO(today);
    return t.minus({ weeks: i });
  };

  render() {
    const { registeredAt, today, handleClick, weekOffset } = this.props;

    if (!registeredAt || !today) {
      return null;
    }

    const t = DateTime.fromISO(today);
    const r = DateTime.fromISO(registeredAt);

    const weeksSinceRegistration = t.diff(r, 'weeks').toObject();

    console.log(weeksSinceRegistration.weeks, Math.round(weeksSinceRegistration.weeks));

    const WeeksSinceRegistration = [...Array(Math.round(weeksSinceRegistration.weeks)).keys()].reverse().map(i => (
      <WeekButton key={i} toggle={weekOffset === i * -1} onClick={() => handleClick(i * -1)}>
        {i === 0 ? 'This week' : <TimeAgo date={this.getWeekButtonLabel(i, today)} live={false} />}
      </WeekButton>
    ));

    return WeeksSinceRegistration;
  }
}

export default WeeksSinceRegistration;
