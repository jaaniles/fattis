import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { PoseGroup } from 'react-pose';
import reset from 'css-wipe/js';

import Login from './Login';
import ChatView from './Views/ChatView/';
import WeekView from './Views/WeekView';
import SettingsView from './Views/SettingsView';
import FattisView from './Views/FattisView/';
import Withings from './Withings';
import * as ds from '../design';

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
        <ChatView />
        <SwipeableViews
          onChangeIndex={this.handleYSwipe}
          enableMouseEvents
          containerStyle={{ height: '100vh' }}
          axis="y"
          resistance
        >
          <FattisView />
          <WeekView />
          <SettingsView />
        </SwipeableViews>
      </SwipeableViews>
    );
  }
}

class App extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <>
        <GlobalStyle />
        <PoseGroup>
          <Router key="router">
            <div>
              {!isLoggedIn ? (
                <Route path="/" component={Login} key="login" />
              ) : (
                <>
                  <Route path="/" exact component={MainAppConnected} key="main" />
                  <Route path="/callback" component={Withings} key="callback" />
                </>
              )}
            </div>
          </Router>
        </PoseGroup>
      </>
    );
  }
}

const GlobalStyle = createGlobalStyle(reset, {
  html: {
    height: '100%'
  },

  body: {
    ...ds.type.bodyFont,
    backgroundColor: ds.colors.background.level1,
    color: ds.type.color.primary,
    fontSize: ds.sizes.default,
    height: '100%',
    overflowX: 'hidden',
    overflowY: 'auto',
    margin: 0
  },

  '#root': {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%'
  },

  a: {
    backgroundImage: `linear-gradient(0deg, ${ds.colors.blue} 0, ${ds.colors.blue} 2px, transparent 2px)`,
    backgroundPosition: 'bottom center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    color: 'inherit',
    textDecoration: 'none',

    '&:hover': {
      color: ds.colors.blue
    }
  },

  h1: {
    ...ds.headings.h1
  },

  h2: {
    ...ds.headings.h2
  },

  h3: {
    ...ds.headings.h3
  },

  h4: {
    ...ds.headings.h4
  },

  strong: {
    fontWeight: 600
  }
});

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
