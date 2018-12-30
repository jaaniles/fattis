import React from 'react';
import styled from 'styled-components';
import media from 'styled-media-query';

import { Header } from '../Header';
import { View } from './View';
import Character from '../Character';
import Messages from '../Messages';

const Main = styled(View)`
  ${Header} {
    background: #eaf5fe;
  }
`;

const Content = styled.div`
  display: flex;
  height: 90vh;

  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;

  ${media.lessThan('small')`
    flex-direction: column;
  `};
`;

class MainView extends React.Component {
  render() {
    return (
      <Main>
        <Content>
          <Character />
          <Messages />
        </Content>
      </Main>
    );
  }
}

export default MainView;
