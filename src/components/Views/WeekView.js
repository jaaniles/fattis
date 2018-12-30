import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';

import { Header } from '../Header';
import { View } from './View';

import weekdayIcons from '../../icons/icons';

import { IoMdWalk, IoMdHeart, IoMdTrendingUp } from 'react-icons/io';

const Weeks = styled(View)`
  color: white;

  ${Header} {
    background: #ef5350;
  }
`;

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
    today: DateTime.local(),
    weekNumber: 40
  };

  componentDidMount() {
    this.props.getWeek(this.state.weekNumber);
  }

  render() {
    const {
      week: { week }
    } = this.props;

    const today = DateTime.local();
    const weekNumber = today.toFormat('W');

    return (
      <Weeks>
        <Header topHeader>
          <p>WEEK {weekNumber}</p>
        </Header>
        <Days>
          {week &&
            week.map((d, i) => (
              <Row key={i}>
                <Img alt="weekday" src={weekdayIcons[i]} />
                <div>
                  {d.healthyFood && <IoMdHeart />}
                  {d.aerobic && <IoMdWalk />}
                  {d.gym && <IoMdTrendingUp />}
                </div>
              </Row>
            ))}
        </Days>
      </Weeks>
    );
  }
}

export default connect(
  state => ({
    week: state.week
  }),
  dispatch => ({
    getWeek: dispatch.week.updateWeek
  })
)(WeekView);
