import React, { Component } from 'react';
import { Planet } from 'react-kawaii';
import styled, { keyframes } from 'styled-components';
import { styler, tween, easing } from 'popmotion';

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

const Shake = styled.div`
  &:active {
    animation: ${shake} 500ms ease-in-out;
  }

  &:hover {
    animation: ${shake} 500ms ease-in-out;
  }
`;

class FattisPlaceholder extends Component {
  state = {
    mood: 'sad',
    message: null
  };

  constructor(props) {
    super(props);
    this.fattisRef = React.createRef();
  }

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
    return (
      <div ref={this.fattisRef}>
        <Shake onClick={this.bullyFattis}>
          <Planet size={150} mood={this.state.mood} color="#E37868" />
        </Shake>
      </div>
    );
  }
}

export default FattisPlaceholder;
