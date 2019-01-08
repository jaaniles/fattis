import React, { Component } from 'react';

import { Planet } from 'react-kawaii';
import { styler, tween, easing } from 'popmotion';

class FattisPlaceholder extends Component {
  state = {
    mood: 'sad'
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
        <Planet size={150} mood={this.state.mood} color="#E37868" />
      </div>
    );
  }
}

export default FattisPlaceholder;
