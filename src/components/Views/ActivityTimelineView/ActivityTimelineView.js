import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';
import { DateTime } from 'luxon';

import { lighten } from 'polished';

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

const ActionIcon = styled.img({
  filter: 'grayscale(85%)',
  width: 35,
  height: 35,
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
    opacity: 0.75;
    position: relative;
    margin-left: ${ds.scale(5)};
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    background: linear-gradient(
      to right,
      ${props => props.day.GYM} 0%,
      ${props => props.day.HEALTHY} 50%,
      ${props => props.day.WALK} 100%
    );

    padding: ${ds.scale(1)};

    > :not(:last-child) {
      margin-right: ${ds.scale(2)};
    }

    transition: 200ms all ease-in-out;

    ${props =>
      props.isToday &&
      css`
        transform: scale(1.025);
        box-shadow: ${ds.glows.small};
      `};
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
    transform: ${props => (props.isToday ? 'scale(1.5)' : 'none')};
  }

  transition: all 200ms ease-in-out;
`;

class ActivityTimelineView extends Component {
  state = {
    today: DateTime.local()
  };

  render() {
    const { today } = this.state;
    const { logs } = this.props;

    const days = daysOfWeek(today).map(
      d =>
        ({
          ...logs[d.toISODate()],
          isToday: d.toISODate() === today.toISODate(),
          future: d > today
        } || {})
    );

    console.log(days);

    return (
      <Page>
        <h1>This week</h1>
        <Timeline>
          {days.map((day, i) => (
            <Event key={i} day={dayAsColors(day)} isToday={day.isToday}>
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
    GYM: day.GYM ? ds.colors.tea : ds.colors.pink,
    HEALTHY: day.HEALTHY ? ds.colors.tea : ds.colors.pink,
    WALK: day.WALK ? ds.colors.tea : ds.colors.pink
  };
};

export default connect(
  state => ({
    logs: state.log.logs
  }),
  dispatch => ({
    loadChat: dispatch.chat.loadChat,
    readMessage: dispatch.chat.readMessage,
    addNewMessage: dispatch.chat.addNewMessage
  })
)(ActivityTimelineView);
