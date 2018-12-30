import React from 'react';
import styled from 'styled-components';

import { Header } from '../Header';
import { View } from './View';

const Years = styled(View)`
  background: #008c5a;
  color: white;

  ${Header} {
    background: #004029;
  }
`;

export default class YearView extends React.Component {
  render() {
    return (
      <Years>
        <Header>
          <p>2018</p>
        </Header>
      </Years>
    );
  }
}
