import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { keyframes } from 'popmotion';
import { linear } from '@popmotion/easing';

import ProgressCircle from './ProgressCircle';

const HINTING_POSE = 'hinting';
const INITIAL_POSE = 'normal';
const HOLD_POSE = 'hold';
const DONE_POSE = 'done';

const ActionContainer = styled.div(
  {
    position: 'relative',
    cursor: 'pointer',
    userSelect: 'none',

    '-webkit-tap-highlight-color': 'rgba(255, 255, 255, 0)',

    width: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    svg: {
      position: 'absolute',
      marginLeft: 'auto',
      marginRight: 'auto',
      left: 0,
      right: 0,
      top: '10%'
    }
  },
  props =>
    props.toggled && {
      img: {
        filter: 'none'
      }
    }
);

const HoldableAction = posed(ActionContainer)({
  pressable: true,
  hinting: {
    y: 0,
    transition: ({ key }) => {
      const steps = {
        y: [0, -10, 0]
      };

      return keyframes({
        duration: 5000,
        easings: [linear, linear, linear],
        values: steps[key],
        times: [0, 0.5, 1],
        loop: Infinity
      });
    }
  },
  normal: {
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  },
  done: {
    scale: 0.8,
    y: 125,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
});

class ActionComponent extends React.PureComponent {
  state = {
    isTouched: false,
    holding: false
  };

  handlePressStart = () => {
    this.setState(() => ({ holding: true, isTouched: true }));
  };

  handlePressEnd = () => {
    this.setState(() => ({ holding: false }));
  };

  handlePoseComplete = pose => {
    if (pose === HOLD_POSE) {
      this.setState(() => ({ holding: false }));

      if (typeof this.props.callback === 'function') {
        this.props.callback();
      }
    }
  };

  render() {
    const { holding, isTouched } = this.state;
    const { children, toggled } = this.props;

    const pose = holding ? HOLD_POSE : toggled ? DONE_POSE : isTouched ? INITIAL_POSE : HINTING_POSE;

    return (
      <HoldableAction
        toggled={toggled}
        onPressStart={this.handlePressStart}
        onPressEnd={this.handlePressEnd}
        onPoseComplete={this.handlePoseComplete}
        initialPose="init"
        pose={pose}
      >
        <ProgressCircle />
        {children}
      </HoldableAction>
    );
  }
}

export default ActionComponent;
