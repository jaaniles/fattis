import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import * as ds from '../../design';

const LogoutButton = styled.button`
  text-transform: uppercase;
  background: none;
  border-radius: 5px;
  border-color: black;
  color: black;
  padding: 10px;
  width: 100px;

  margin-bottom: 1rem;
`;

const Container = styled.div`
  padding: ${ds.scale(4)};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: ${ds.colors.red};
`;

class SettingsView extends Component {
  render() {
    const { logout, authorizeWithings } = this.props;

    return (
      <Container>
        <h1>Settings</h1>
        <LogoutButton onClick={authorizeWithings}>Authorize Withings</LogoutButton>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Container>
    );
  }
}

export default connect(
  state => ({}),
  dispatch => ({
    loadLogs: dispatch.log.loadLogs,
    logDate: dispatch.log.logDate,
    authorizeWithings: dispatch.withings.authorize,
    logout: dispatch.auth.logout
  })
)(SettingsView);
