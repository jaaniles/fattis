import React, { Component } from 'react';
import styled from 'styled-components';

import { Ghost } from 'react-kawaii';
import { styler, tween, easing } from 'popmotion';

const Container = styled.div`
  margin-top: 15px;
  align-self: center;
`;

class Character extends Component {
  constructor(props) {
    super(props);

    this.ghostRef = React.createRef();
  }

  componentDidMount() {
    const mouth = styler(this.ghostRef.current.querySelector('#kawaii-face__mouth'));
    const body = styler(this.ghostRef.current.querySelector('svg'));

    tween({
      from: { scaleY: 0, scaleX: 0 },
      to: { scaleY: 1, scaleX: 1 },
      duration: 500,
      easings: easing.easeOut
    }).start(body.set);

    tween({
      from: { y: 5 },
      to: { y: 30 },
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
      <Container>
        <div ref={this.ghostRef}>
          <Ghost size={200} mood="sad" color="#94CFF7" />
        </div>
      </Container>
    );
  }
}

export default Character;
