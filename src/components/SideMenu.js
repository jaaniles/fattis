import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { darken } from 'polished';
import { DateTime } from 'luxon';

import Bubble from './Characters/Bubble';
import FattisPlaceholder from './Characters/FattisPlaceholder';
import FatIcon from './FatIcon';
import ActivityButton from './ActivityButton';

const Menu = styled.div`
  display: flex;
  flex-direction: column;

  margin-left: ${props => (props.hide ? '20px' : '-5px')};
  position: absolute;
  color: white;
  background: #2d3746;

  top: 50%;
  transform: translateY(-50%);

  height: ${props => (props.open ? '100vh' : '50vh')};
  padding-left: 15px;
  width: 100%;

  border-radius: 5px;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const Title = styled.h4`
  text-align: center;
`;

const Highlight = styled.span`
  background: #b1de98;
  color: black;
  padding: 1px 5px 1px 5px;
  margin: 0 2px 0 2px;
  font-weight: 800;
`;

const Hitch = styled.div`
  width: 50px;
  height: 15px;
  margin-left: -25px;
  background: #2d3746;

  border-radius: 50px;

  position: absolute;
  bottom: 50%;
`;

const Teller = styled.div`
  display: flex;
  flex-direction: row;

  width: 85%;

  align-self: center;
  justify-content: center;

  text-align: center;

  background: ${darken(0.1, '#2d3746')};

  div {
    padding: 5px;
  }
`;

const CharacterContainer = styled.div`
  margin-top: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StatusIconsBar = styled.div`
  margin-top: 2rem;

  display: flex;
  flex-direction: row;
`;

class SideMenu extends React.Component {
  state = {
    showTeller: false
  };

  log = what => {
    this.props.logDate(what);
  };

  render() {
    const { showTeller } = this.state;
    const { open, toggles, hide } = this.props;

    return (
      <Menu hide={hide} open={open}>
        <Title>
          WHAT DID THE <Highlight>FAT GUY</Highlight> do today?
        </Title>
        <CharacterContainer>
          <FattisPlaceholder />
          <StatusIconsBar>
            <FatIcon />
            <FatIcon />
            <FatIcon />
            <FatIcon />
          </StatusIconsBar>
        </CharacterContainer>
        <div>
          <ActivityButton
            toggled={toggles && toggles.HEALTHY}
            text="I ate healthy"
            handleClick={() => this.log('HEALTHY')}
          />
          <ActivityButton toggled={toggles && toggles.GYM} text="I did gym" handleClick={() => this.log('GYM')} />
        </div>
        <Hitch />
        {showTeller && (
          <Teller>
            <div>
              <Bubble />
            </div>
            <div>
              <p>
                Congrats <Highlight>FATTIE</Highlight>! Skinny people do that every day.
              </p>
            </div>
          </Teller>
        )}
      </Menu>
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
)(SideMenu);
