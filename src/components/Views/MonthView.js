import React from 'react';
import styled from 'styled-components';

import { Header } from '../Header';
import { View } from './View';

const Months = styled(View)`
  background: #c2185b;
  color: white;

  ${Header} {
    background: #8c0032;
  }
`;

export default class MonthView extends React.Component {
  render() {
    return (
      <Months>
        <Header>
          <p>January</p>
        </Header>
      </Months>
    );
  }
}
