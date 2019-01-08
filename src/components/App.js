import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Login';
import MainView from './Views/MainView';
import WeekView from './Views/WeekView';
import SettingsView from './Views/SettingsView';
import FattisView from './Views/FattisView';
import Withings from './Withings';

import '../styles/index.css';

class MainApp extends Component {
  state = {
    sidebarOpen: false,
    yViewIndex: 0
  };

  componentDidMount() {
    // TODO: Maybe a dataloader or something????
    this.props.loadLogs();
    this.props.initWithings();
    this.props.loadWeight();
  }

  componentDidUpdate() {
    const { withings, updateWeight, weight } = this.props;
    if (Object.keys(weight).length === 0 && withings.access_token) {
      updateWeight();
    }
  }

  sideMenuOpen = index => {
    if (index === 1) this.setState({ sidebarOpen: true });
    else this.setState({ sidebarOpen: false });
  };

  handleYSwipe = index => {
    this.setState({ yViewIndex: index });
  };

  render() {
    //ßconst { yViewIndex } = this.state;

    return (
      <SwipeableViews
        enableMouseEvents
        containerStyle={{ width: '100%' }}
        axis="x"
        onChangeIndex={this.sideMenuOpen}
        resistance
      >
        <SwipeableViews
          onChangeIndex={this.handleYSwipe}
          enableMouseEvents
          containerStyle={{ height: '100vh' }}
          axis="y"
          resistance
        >
          <MainView />
          <WeekView />
          <SettingsView />
        </SwipeableViews>
        <FattisView />
      </SwipeableViews>
    );
  }
}

class App extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <Router>
        <div>
          {!isLoggedIn ? (
            <Route path="/" component={Login} />
          ) : (
            <>
              <Route path="/" exact component={MainAppConnected} />
              <Route path="/callback" component={Withings} />
            </>
          )}
        </div>
      </Router>
    );
  }
}

const MainAppConnected = connect(
  state => ({ withings: state.withings, weight: state.weight }),
  dispatch => ({
    loadLogs: dispatch.log.loadLogs,
    initWithings: dispatch.withings.init,
    updateWeight: dispatch.withings.updateWeight,
    loadWeight: dispatch.weight.loadWeight
  })
)(MainApp);

export default connect(
  state => ({
    isLoggedIn: state.auth.isLoggedIn
  }),
  dispatch => ({
    login: dispatch.auth.login,
    loadLogs: dispatch.log.loadLogs,
    logout: dispatch.auth.logout
  })
)(App);
