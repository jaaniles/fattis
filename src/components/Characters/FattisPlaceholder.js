import React, { Component, forwardRef } from 'react';
import { Planet } from 'react-kawaii';
import styled, { keyframes } from 'styled-components';
import { styler, tween, easing } from 'popmotion';
import posed, { PoseGroup } from 'react-pose';

import Message from '../Message';
import MessagesContainer from '../Layout/FlexColumnCenterHorizontal';

const Shake = styled.div`
  &:active {
    animation: ${shake} 500ms ease-in-out;
  }

  &:hover {
    animation: ${shake} 500ms ease-in-out;
  }
`;

const Pose = posed.div({
  enter: {
    x: 0,
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: {
    x: 0,
    opacity: 0,
    y: { type: 'spring', stiffness: 1000, damping: 15 },
    default: { duration: 300 }
  }
});

class FattisPlaceholder extends Component {
  state = {
    mood: 'sad',
    message: null
  };

  constructor(props) {
    super(props);
    this.fattisRef = React.createRef();
  }

  bullyFattis = () => {
    clearTimeout(this.messageTimeout);

    const reaction = randomInt(0, possibleReactions.length - 1);
    this.setState({ message: possibleReactions[reaction] });

    this.messageTimeout = setTimeout(() => this.setState({ message: null }), 1500);
  };

  componentDidMount() {
    const mouth = styler(this.fattisRef.current.querySelector('#kawaii-face__mouth'));
    const body = styler(this.fattisRef.current.querySelector('svg'));

    tween({
      from: { y: 5 },
      to: { y: -5 },
      easings: easing.easeOut,
      duration: 1500,
      yoyo: Infinity
    }).start(body.set);

    tween({
      from: { y: 15, x: 17, scaleY: 1 },
      to: { y: 12, x: 17, scaleY: 1.2 },
      duration: 300,
      easings: easing.easeInOut,
      yoyo: Infinity
    }).start(mouth.set);
  }

  render() {
    const { message } = this.state;

    return (
      <div ref={this.fattisRef}>
        <PoseGroup>
          {message && (
            <Pose key="1">
              <Message>{message}</Message>
            </Pose>
          )}
        </PoseGroup>
        <Shake onClick={this.bullyFattis}>
          <Planet size={150} mood={this.state.mood} color="#E37868" />
        </Shake>
      </div>
    );
  }
}

const shake = keyframes({
  '10%, 90%': {
    transform: 'translate3d(-6px, 0, 2px)'
  },

  '20%, 80%': {
    transform: 'translate3d(2px, -2px, 0)'
  },

  '30%, 50%, 70%': {
    transform: 'translate3d(-4px, 1px, 1px)'
  },

  '40%, 60%': {
    transform: 'translate3d(4px, 0, 2px)'
  }
});

function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

const possibleReactions = [
  'I thought you were my friend...',
  'Please stop hitting me..',
  "I haven't done anything wrong",
  "I'm so fat just let me die..",
  'I hate my life'
];

export default FattisPlaceholder;
