import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import TimeAgo from 'react-timeago';
import { lighten } from 'polished';

import TimelineEmptyState from './TimelineEmptyState';
import { daysOfWeek } from '../../../services/calendar';
import PageLayout from '../../Layout/Page';
import weekdayIcons from '../../../icons/icons';
import * as ds from '../../../design';

const gymIcon = require('../../../icons/workout.svg');
const walkIcon = require('../../../icons/walk.svg');
const healthyIcon = require('../../../icons/healthy.svg');

const Page = styled(PageLayout)({
  background: ds.colors.background.level3
});

const Arrow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-weight: 800;

  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: ${ds.colors.red};
  border: 1px solid ${ds.colors.red};
`;

const ActionIcon = styled.img({
  width: 25,
  height: 25,
  opacity: 0.85,

  ...ds.minWidth.bigMobile({
    height: 55,
    width: 55
  })
});
const TimelineIcon = styled.img`
  width: 50px;
`;

const Timeline = styled.div`
  width: 95%;
  position: relative;

  &:after {
    content: '';
    display: table;
    clear: both;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 18px;
    height: 100%;
    width: 6px;
    background: linear-gradient(to bottom, #d3766a 0%, #e1df8a 86%, #e1df8a 100%, #2989d8 100%);
  }
`;

const Event = styled.div`
  position: relative;
  margin: ${ds.scale(1)} 0;

  div {
    min-height: 35px;
    position: relative;
    margin-left: ${ds.scale(5)};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    background: linear-gradient(
      to right,
      ${props => props.day.GYM} 0%,
      ${props => props.day.HEALTHY} 50%,
      ${props => props.day.WALK} 100%
    );

    padding: 5px;
    border-radius: 0.25em;

    > :not(:last-child) {
      margin-right: ${ds.scale(2)};
    }

    transition: 200ms all ease-in-out;
  }

  ${TimelineIcon} {
    position: absolute;
    background: hotpink;
    z-index: ${ds.zIndex.high};
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid black;
  }

  transition: all 200ms ease-in-out;
`;

const Buttons = styled.div({
  width: '90%',

  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  color: ds.type.color.secondaryDark,
  marginBottom: ds.scale(1),

  button: {
    cursor: 'pointer',
    background: 'none',
    outline: 'none',
    border: 0
  }
});

class ActivityTimelineView extends Component {
  state = {
    today: DateTime.local(),
    weekOffset: 0,
    exitEmptyState: false
  };

  nextWeek = () => {
    const weekOffset = this.state.weekOffset + 1;
    this.setState({ weekOffset });
  };
  lastWeek = () => {
    const weekOffset = this.state.weekOffset - 1;
    this.setState({ weekOffset });
  };
  log = what => {
    this.setState({ exitEmptyState: true });
    setTimeout(() => {
      this.props.logDate(what);
      this.setState({ dbg: true });
    }, 500);
  };

  render() {
    const { today, weekOffset, exitEmptyState } = this.state;
    const { logs, loading, toggles } = this.props;

    if (logs.length < 1) {
      return (
        <Page>
          <TimelineEmptyState loading={loading} toggles={toggles} handleClick={this.log} exit={exitEmptyState} />
        </Page>
      );
    }

    const d = today.plus({ weeks: weekOffset });

    const days = daysOfWeek(d).map(
      d =>
        ({
          ...logs[d.toISODate()],
          future: d > today
        } || {})
    );

    return (
      <Page>
        <Buttons>
          <button onClick={this.lastWeek}>
            <Arrow>{`<`}</Arrow>
          </button>
          <h1>{weekOffset === 0 ? 'THIS WEEK' : <TimeAgo date={d} live={false} />}</h1>
          <button disabled={weekOffset === 0} onClick={this.nextWeek}>
            <Arrow>{`>`}</Arrow>
          </button>
        </Buttons>
        <Timeline>
          {days.map((day, i) => (
            <Event key={i} day={dayAsColors(day)}>
              <TimelineIcon alt="weekday" src={weekdayIcons[i]} />
              <div>
                {!day.future && (
                  <>
                    <ActionIcon src={gymIcon} />
                    <ActionIcon src={healthyIcon} />
                    <ActionIcon src={walkIcon} />
                  </>
                )}
              </div>
            </Event>
          ))}
        </Timeline>
      </Page>
    );
  }
}

const dayAsColors = day => {
  if (day.future) {
    return {
      GYM: lighten(0.05, ds.colors.background.level3),
      HEALTHY: lighten(0.025, ds.colors.background.level3),
      WALK: lighten(0.05, ds.colors.background.level3)
    };
  }

  return {
    GYM: day.GYM ? ds.colors.red : lighten(0.05, ds.colors.background.level3),
    HEALTHY: day.HEALTHY ? ds.colors.red : lighten(0.05, ds.colors.background.level3),
    WALK: day.WALK ? ds.colors.red : lighten(0.05, ds.colors.background.level3)
  };
};

export default connect(
  state => ({
    logs: state.log.logs,
    loading: state.log.loading,
    toggles: state.log.logs[DateTime.local().toISODate()]
  }),
  dispatch => ({
    loadChat: dispatch.chat.loadChat,
    logDate: dispatch.log.logDate
  })
)(ActivityTimelineView);
