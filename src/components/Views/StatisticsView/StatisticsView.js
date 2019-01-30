import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { DateTime } from 'luxon';
import TimeAgo from 'react-timeago';
import { Area, AreaChart, ResponsiveContainer, YAxis } from 'recharts';

import { daysOfWeek } from '../../../services/calendar';
import Page from '../../Layout/Page';
import FlexColumn from '../../Layout/FlexColumnCenterHorizontal';
import Row from '../../Layout/FlexRowCentered';
import AnimatedNumber from './AnimatedNumber';
import EmptyState from './EmptyState';
import WeeksSinceRegistration from './WeeksSinceRegistration';

import fb from '../../Firebase';
import * as ds from '../../../design';

const gymIcon = require('../../../icons/workout.svg');
const healthyIcon = require('../../../icons/healthy.svg');
const walkIcon = require('../../../icons/walk.svg');

const PlaceholderChartData = [
  {
    id: 1,
    value: 100
  },
  {
    id: 2,
    value: 100
  }
];

const Container = styled.div({
  width: '100%',
  background: ds.colors.background.purple,
  borderRadius: 5
});
const BottomContainer = styled(Container)({
  position: 'absolute',
  bottom: 0,
  borderRadius: 0
});

const FatPoint = styled.div(props => ({
  width: 15,
  height: 15,
  borderRadius: '50%',
  background: ds.colors.red,
  opacity: props.toggle ? 1 : 0.25,
  margin: 2,

  fontSize: 10,
  color: ds.colors.pink,

  img: {
    width: 15,
    verticalAlign: 'middle',
    filter: 'grayscale(50%)'
  },

  transition: 'all 200ms ease-in'
}));

const Content = styled.div`
  display: flex;
  padding: 6px;
  justify-content: space-between;

  p {
    margin: 0;
  }
`;

const WeekSelector = styled.div({
  height: 100,
  margin: 5,

  alignSelf: 'center',
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  justifyContent: 'center',

  overflowX: 'scroll',
  overflowY: 'hidden',
  paddingBottom: ds.scale(3),
  WebkitOverflowScrolling: 'touch'
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
  color: white;
  background: ${ds.colors.red};

  transform: ${props => (props.flip ? 'scaleX(-1)' : 'none')};
`;

const Buttons = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  color: ds.type.color.secondaryDark,

  button: {
    cursor: 'pointer',
    background: 'none',
    outline: 'none',
    border: 0,

    '&:focus, &:hover, &:active': {
      background: 'none',
      outline: 'none',
      transform: 'scale(1.5)'
    },
    transition: 'all 200ms ease-in-out'
  }
});

const WeightChart = styled.div({
  position: 'absolute',
  width: '100%',
  top: '5%',

  h1: {
    color: ds.colors.teal,
    fontSize: 64
  }
});

const FatPointsRow = styled(Row)({
  width: 'initial'
});

class StatisticsView extends Component {
  constructor(props) {
    super(props);
    this.weekSelector = React.createRef();
  }

  state = {
    today: DateTime.local(),
    weekOffset: 0,
    exitEmptyState: false,
    weightDifference: 0,
    weeksSinceRegistration: null
  };

  getWeeksFromRegistration = () => {
    const { today } = this.state;
    const { registeredAt } = this.props;

    const t = DateTime.fromISO(today);
    const r = DateTime.fromISO(registeredAt);

    const weeksSinceRegistration = t.diff(r, 'weeks').toObject();
    if (weeksSinceRegistration && weeksSinceRegistration.weeks) {
      console.log(weeksSinceRegistration, weeksSinceRegistration.weeks);
      this.setState({ weeksSinceRegistration: Math.round(weeksSinceRegistration.weeks) });
    }
  };

  scrollWeekSelector = () => {
    if (!this.weekSelector || !this.weekSelector.current) {
      return;
    }

    this.weekSelector.current.scrollLeft = this.weekSelector.current.scrollWidth;
  };

  changeWeek = offset => {
    const o = this.state.weekOffset + offset;
    this.setState({ weekOffset: o });
  };

  switchWeekTo = offset => {
    this.setState({ weekOffset: offset });
  };

  render() {
    const { today, weekOffset } = this.state;
    const { logs, loading, toggles, weight, registeredAt } = this.props;

    if (logs.length < 1) {
      return (
        <Page background={ds.colors.background.purple}>
          <EmptyState loading={loading} toggles={toggles} handleClick={this.log} />
        </Page>
      );
    }

    const d = today.plus({ weeks: weekOffset });
    const days = daysOfWeek(d);

    const gymPoints = getPoints(days, logs, 'GYM');
    const healthPoints = getPoints(days, logs, 'HEALTHY');
    const walkPoints = getPoints(days, logs, 'WALK');

    const weightThisWeek = fb
      .toArray(weight)
      .sort((a, b) => DateTime.fromISO(a.id) - DateTime.fromISO(b.id))
      .filter(data => DateTime.fromISO(data.id).toFormat('W') === d.toFormat('W'));

    const weightDifference = getWeightDifference(weightThisWeek) || 0;

    return (
      <Page style={{ position: 'relative' }} background={ds.colors.background.purple}>
        <WeightChart>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={weightThisWeek.length < 2 ? PlaceholderChartData : weightThisWeek}>
              <YAxis domain={['dataMin', 'dataMax']} hide />
              <Area
                type="monotone"
                dataKey="value"
                fill={ds.colors.background.purple}
                stroke={ds.colors.teal}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
          <AnimatedNumber pose="enter" initialPose="exit" value={weightDifference.toFixed(2)} />
        </WeightChart>
        <FlexColumn>
          <Container>
            <Content>
              <div>
                <img style={{ weight: 35, height: 35 }} src={gymIcon} alt="gym" />
              </div>
              <FatPointsRow>
                {gymPoints.map((p, i) => (
                  <FatPoint toggle={p} key={i} />
                ))}
              </FatPointsRow>
            </Content>
            <Content>
              <div>
                <img style={{ weight: 35, height: 35 }} src={healthyIcon} alt="Ate healthy" />
              </div>
              <FatPointsRow>
                {healthPoints.map((p, i) => (
                  <FatPoint toggle={p} key={i} />
                ))}
              </FatPointsRow>
            </Content>
            <Content>
              <div>
                <img style={{ weight: 35, height: 35 }} src={walkIcon} alt="Walked!" />
              </div>
              <FatPointsRow>
                {walkPoints.map((p, i) => (
                  <FatPoint toggle={p} key={i} />
                ))}
              </FatPointsRow>
            </Content>
          </Container>
          <BottomContainer>
            <Buttons>
              <button onClick={() => this.changeWeek(-1)}>
                <Arrow flip>{`➤`}</Arrow>
              </button>
              <h1>{weekOffset === 0 ? 'THIS WEEK' : <TimeAgo date={d} live={false} />}</h1>
              <button disabled={weekOffset === 0} onClick={() => this.changeWeek(1)}>
                <Arrow>{`➤`}</Arrow>
              </button>
            </Buttons>
            <WeekSelector ref={this.weekSelector}>
              {registeredAt && (
                <WeeksSinceRegistration
                  today={today}
                  registeredAt={registeredAt}
                  handleClick={this.switchWeekTo}
                  weekOffset={weekOffset}
                  scrollWeekSelector={this.scrollWeekSelector}
                />
              )}
            </WeekSelector>
          </BottomContainer>
        </FlexColumn>
      </Page>
    );
  }
}

const getWeightDifference = weightThisWeek => {
  if (!weightThisWeek || weightThisWeek.length < 2) {
    return false;
  }

  const diff = weightThisWeek[0].value - weightThisWeek[weightThisWeek.length - 1].value;
  return diff - diff * 2;
};
const getPoints = (days, logs, stat) =>
  days.map((day, i) => (logs[day.toISODate()] && logs[day.toISODate()][stat]) || false);

export default connect(
  state => ({
    logs: state.log.logs,
    loading: state.log.loading,
    toggles: state.log.logs[DateTime.local().toISODate()],
    registeredAt: state.auth.registeredAt,
    weight: state.weight
  }),
  dispatch => ({
    loadChat: dispatch.chat.loadChat,
    logDate: dispatch.log.logDate
  })
)(StatisticsView);
