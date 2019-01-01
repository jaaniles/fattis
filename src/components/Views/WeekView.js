import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';

import { View } from './View';
import { daysOfWeek } from '../../services/calendar';

import weekdayIcons from '../../icons/icons';

import { IoMdHeart, IoMdTrendingUp } from 'react-icons/io';

const Days = styled.div`
  padding: 25px 0px 0px 5px;
  width: 100%;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  color: black;
  margin-bottom: 10px;

  ${props => props.today && 'border-bottom: 3px solid #ef5350'};

  div {
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

    padding-left: 15px;

    width: 100%;
    border-bottom: 1px solid #e0e0e0;
  }

  svg {
    font-size: 25px;
    align-self: center;
    margin-right: 15px;
  }

  :last-child {
    display: flex;
  }
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
`;

class WeekView extends React.Component {
  state = {
    today: DateTime.local()
  };

  render() {
    const { logs } = this.props;
    const { today } = this.state;

    const days = daysOfWeek(today).map(d => logs[d.toISODate()] || {});

    return (
      <View>
        <Days>
          {days.map((d, i) => (
            <Row key={i}>
              <Img alt="weekday" src={weekdayIcons[i]} />
              <div>
                {d.HEALTHY && <IoMdHeart />}
                {d.GYM && <IoMdTrendingUp />}
              </div>
            </Row>
          ))}
        </Days>
      </View>
    );
  }
}

export default connect(
  state => ({
    logs: state.log.logs || []
  }),
  dispatch => ({})
)(WeekView);
