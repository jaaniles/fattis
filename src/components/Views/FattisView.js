import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DateTime } from 'luxon';

import Highlight from '../Highlight';
import Page from '../Layout/Page';
import FattisPlaceholder from '../Characters/FattisPlaceholder';
import Actions from './Actions';

class FattisView extends Component {
  log = what => {
    this.props.logDate(what);
  };

  render() {
    const { toggles } = this.props;

    return (
      <Page>
        <FattisPlaceholder />
        <h4>
          Did <Highlight>FATTIS</Highlight> do anything worthwhile today?
        </h4>
        <Actions toggles={toggles} handleClick={this.log} />
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
