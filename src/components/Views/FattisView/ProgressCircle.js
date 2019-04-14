import React from 'react';
import styled from 'styled-components';
import posed from 'react-pose';

import * as ds from '../../../design';

const circleSize = 145;
const strokeWidth = 4;
const radius = circleSize / 2 - strokeWidth * 2;
const circumference = radius * 2 * Math.PI;
const strokeDasharray = `${circumference}px ${circumference}px`;
const initialOffset = circumference - (15 / 100) * circumference;
//const completedOffset = circumference - (200 / 100) * circumference;

const Circle = styled.circle(props => ({
  fill: 'transparent',
  strokeWidth: strokeWidth,
  stroke: ds.colors.white,
  transform: 'rotate(-90deg)',
  transformOrigin: '50% 50%'
}));

const ProgressCircle = posed(Circle)({
  init: {
    strokeDashoffset: initialOffset
  },
  normal: {
    strokeDashoffset: initialOffset,
    opacity: 0,
    transition: {
      ease: 'linear',
      duration: 250
    }
  },
  hold: {
    opacity: 1,
    strokeDashoffset: 0,
    transition: {
      ease: 'linear',
      duration: 250
    }
  },
  done: {
    opacity: 0,
    strokeDashoffset: initialOffset,
    transition: {
      ease: 'linear',
      duration: 250
    }
  }
});

const ProgressCircleComponent = () => (
  <svg height={circleSize} width={circleSize}>
    <ProgressCircle strokeDasharray={strokeDasharray} r={radius} cx={circleSize / 2} cy={circleSize / 2} />
  </svg>
);

export default ProgressCircleComponent;
