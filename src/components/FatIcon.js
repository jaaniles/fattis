import React, { Component } from 'react';
import styled from 'styled-components';

import fat from '../icons/fat.png';

const Container = styled.div`
  margin: 2px;
`;
const Icon = styled.img`
  width: 35px;
  height: 35px;
`;

class FatIcon extends Component {
  render() {
    return (
      <Container>
        <Icon src={fat} alt="FAT ICON" />
      </Container>
    );
  }
}

export default FatIcon;
