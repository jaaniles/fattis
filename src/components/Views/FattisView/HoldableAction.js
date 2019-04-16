import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { keyframes } from 'popmotion';
import { linear } from '@popmotion/easing';

import ProgressCircle from './ProgressCircle';

import * as ds from '../../../design';

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
    y: 150,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15
    }
  }
});

const PATHS = {
  check: 'M6.173 16.252l5.722 4.228 9.22-12.69',
  line: 'M 100 300 A 0 0 0 0 0 700 300'
};

/*
const morphTransition = ({ from, to }) =>
  tween({
    from: 0,
    to: 1
  }).pipe(interpolate(from, to));

const MorphPath = posed.path(
  Object.keys(PATHS).reduce((config, id) => {
    config[id] = {
      d: PATHS[id],
      transition: {
        ease: "linear",
        duration: 1000
      }
    };

    console.log(config);

    return config;
  }, {})
);
*/

const Checkmark = styled.svg({
  transform: 'scale(0.5)',
  marginTop: '-42% !important',
  marginLeft: '-50% !important'
});

const DrawPath = posed.path({
  init: {
    stroke: ds.colors.terra,
    pathLength: 0,
    transition: {
      ease: 'linear',
      duration: 500
    }
  },
  done: {
    stroke: ds.colors.green,
    pathLength: 100,
    transition: {
      ease: 'linear',
      duration: 500
    }
  }
});

class ActionComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.checkmark = React.createRef();
  }

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

    if (this.checkmark) {
      console.log(this.checkmark);
    }

    return (
      <HoldableAction
        toggled={toggled}
        onPressStart={this.handlePressStart}
        onPressEnd={this.handlePressEnd}
        onPoseComplete={this.handlePoseComplete}
        initialPose="init"
        pose={pose}
      >
        <Checkmark viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <DrawPath d={PATHS.check} initialPose="init" pose={toggled ? 'done' : 'init'} fill={'transparent'} />
        </Checkmark>
        <ProgressCircle />
        {children}
      </HoldableAction>
    );
  }
}

export default ActionComponent;
