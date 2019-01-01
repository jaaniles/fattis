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
    sidebarOpen: false,
    yViewIndex: 0
  };

  componentDidMount() {
    this.props.loadLogs();
  }

  sideMenuOpen = index => {
    if (index === 1) this.setState({ sidebarOpen: true });
    else this.setState({ sidebarOpen: false });
  };

  handleYSwipe = index => {
    this.setState({ yViewIndex: index });
  };

  render() {
    const { yViewIndex } = this.state;

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
        </SwipeableViews>
        <SideMenu hide={yViewIndex !== 0} open={this.state.sidebarOpen} />
      </SwipeableViews>
    );
  }
}

class App extends Component {
  render() {
    const { isLoggedIn, loadLogs } = this.props;
    return <div>{isLoggedIn ? <MainApp loadLogs={loadLogs} /> : <Login />}</div>;
  }
}

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
