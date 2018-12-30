import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { connect } from 'react-redux';

import Login from './Login';
import MainView from './Views/MainView';
import WeekView from './Views/WeekView';
import SideMenu from './SideMenu';

import '../styles/index.css';

class MainApp extends Component {
  state = {
    sidebarOpen: false
  };

  sideMenuOpen = index => {
    if (index === 1) this.setState({ sidebarOpen: true });
    else this.setState({ sidebarOpen: false });
  };

  render() {
    return (
      <SwipeableViews
        enableMouseEvents
        containerStyle={{ width: '100%' }}
        axis="x"
        onChangeIndex={this.sideMenuOpen}
        resistance
      >
        <SwipeableViews enableMouseEvents containerStyle={{ height: '100vh' }} axis="y" resistance>
          <MainView />
          <WeekView />
        </SwipeableViews>
        <SideMenu open={this.state.sidebarOpen} />
      </SwipeableViews>
    );
  }
}

class App extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return <div>{isLoggedIn ? <MainApp /> : <Login />}</div>;
  }
}

export default connect(
  state => ({
    isLoggedIn: state.auth.isLoggedIn
  }),
  dispatch => ({
    login: dispatch.auth.login,
    logout: dispatch.auth.logout
  })
)(App);
