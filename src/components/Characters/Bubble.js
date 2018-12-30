import React, { Component } from 'react';

import { SpeechBubble } from 'react-kawaii';
import { styler, tween, easing } from 'popmotion';

class Bubble extends Component {
  constructor(props) {
    super(props);

    this.bubbleRef = React.createRef();
  }

  componentDidMount() {
    const body = styler(this.bubbleRef.current.querySelector('svg'));
    const mouth = styler(this.bubbleRef.current.querySelector('#Combined-Shape'));

    tween({
      from: { y: 5 },
      to: { y: -5 },
      easings: easing.easeOut,
      duration: 1500,
      yoyo: Infinity
    }).start(body.set);

    tween({
      from: { scaleX: 0.1 },
      to: { scaleX: 1 },
      duration: 500,
      yoyo: Infinity
    }).start(mouth.set);
  }

  render() {
    return (
      <div ref={this.bubbleRef}>
        <SpeechBubble size={40} mood="lovestruck" color="#b1de98" />
      </div>
    );
  }
}

export default Bubble;
