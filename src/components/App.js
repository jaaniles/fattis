import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { PoseGroup } from 'react-pose';
import reset from 'css-wipe/js';

import Login from './Login';
import ChatView from './Views/ChatView/';
import SettingsView from './Views/SettingsView';
import FattisView from './Views/FattisView/';
import StatisticsView from './Views/StatisticsView';
import Withings from './Withings';
import * as ds from '../design';

class MainApp extends Component {
  state = {
    sidebarOpen: false,
    yViewIndex: 0,
    xViewIndex: 0
  };

  componentDidMount() {
    // TODO: Maybe a dataloader or something????
    this.props.loadLogs();
    this.props.initWithings();
    this.props.loadWeight();
    this.props.loadUser();
  }

  componentDidUpdate() {
    const { withings, updateWeight, weight } = this.props;
    if (Object.keys(weight).length === 0 && withings.access_token) {
      updateWeight();
    }
  }

  sideMenuOpen = index => {
    this.setXIndex(index);
    if (index === 1) this.setState({ sidebarOpen: true });
    else this.setState({ sidebarOpen: false });
  };

  setYIndex = index => {
    this.setState({ yViewIndex: index });
  };

  setXIndex = index => {
    this.setState({ xViewindex: index });
  };

  render() {
    const { xViewIndex, yViewIndex } = this.state;

    return (
      <SwipeableViews
        enableMouseEvents
        containerStyle={{ width: '100%' }}
        axis="x"
        onChangeIndex={this.sideMenuOpen}
        resistance
        index={xViewIndex}
        ignoreNativeScroll
        disabled={yViewIndex !== 0}
      >
        <SwipeableViews
          onChangeIndex={this.setYIndex}
          enableMouseEvents
          containerStyle={{ height: '100vh' }}
          axis="y"
          resistance
          index={yViewIndex}
        >
          <FattisView changeView={this.setXIndex} />
          <StatisticsView />
          <SettingsView />
        </SwipeableViews>
        <ChatView isShown={xViewIndex === 1} />
      </SwipeableViews>
    );
  }
}

class App extends Component {
  componentDidMount() {
    if (typeof window !== 'undefined') {
      window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      };
    }
  }

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
    loadUser: dispatch.auth.loadUser,
    loadWeight: dispatch.weight.loadWeight
  })
)(MainApp);

export default connect(
  state => ({
    isLoggedIn: state.auth.isLoggedIn
  }),
  dispatch => ({
    loadLogs: dispatch.log.loadLogs,
    logout: dispatch.auth.logout
  })
)(App);
