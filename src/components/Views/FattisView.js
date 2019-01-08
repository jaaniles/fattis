import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import ReactSVG from 'react-svg';
import { darken } from 'polished';
import { DateTime } from 'luxon';

import Highlight from '../Highlight';
import FattisPlaceholder from '../Characters/FattisPlaceholder';

const gymIcon = require('../../icons/workout.svg');
const walkIcon = require('../../icons/walk.svg');
const healthyIcon = require('../../icons/healthy.svg');

//#34344d background
//7EB7E1 blue
//E37868 red
//74D0AF green

//707086 secondary
//E7E8F2 primary

const Icon = styled(ReactSVG)`
  width: 35px;
  height: 35px;
  filter: grayscale(100%);
`;

const Page = styled.div`
  height: 100vh;
  background: #34344d;

  display: flex;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 90%;
`;

const Action = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  width: 33%;
  height: 200px;

  color: #707086;

  ${props =>
    props.pressed &&
    css`
      color: #e37868;
      background: ${darken(0.05, '#34344d')};
      transform: scale(0.95);
      ${Icon} {
        filter: none;
      }
    `};

  transition: all 0.3s cubic-bezier(0.96, 1.5, 0.96, 1.5);
`;

class FattisView extends Component {
  log = what => {
    console.log('Logdate', what);
    this.props.logDate(what);
  };

  render() {
    const { toggles } = this.props;

    return (
      <Page>
        <FattisPlaceholder />
        <p style={{ color: '#E7E8F2' }}>
          Did <Highlight>FATTIS</Highlight> do anything worthwhile today?
        </p>
        <Actions>
          <Action pressed={toggles && toggles.GYM} onClick={() => this.log('GYM')}>
            <Icon src={gymIcon} />
            <p>GYM</p>
          </Action>
          <Action pressed={toggles && toggles.HEALTHY} onClick={() => this.log('HEALTHY')}>
            <Icon src={healthyIcon} />
            <p>ATE HEALTHY</p>
          </Action>
          <Action>
            <Icon src={walkIcon} />
            <p>EXTRA WALK</p>
          </Action>
        </Actions>
      </Page>
    );
  }
}

export default connect(
  state => ({
    week: state.week,
    isLoading: state.log.isLoading,
    toggles: state.log.logs[DateTime.local().toISODate()]
  }),
  dispatch => ({
    loadLogs: dispatch.log.loadLogs,
    logDate: dispatch.log.logDate,
    authorizeWithings: dispatch.withings.authorize,
    logout: dispatch.auth.logout
  })
)(FattisView);
