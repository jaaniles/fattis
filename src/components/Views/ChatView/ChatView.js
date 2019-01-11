import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import Chat from './Chat';
import PageLayout from '../../Layout/Page';
import * as ds from '../../../design';

const Page = styled(PageLayout)`
  background: ${ds.colors.background.level5};
`;

class ChatView extends React.Component {
  render() {
    return (
      <Page>
        <h1>Fattis</h1>
        <Chat />
      </Page>
    );
  }
}

export default connect(
  state => ({
    access: state.withings.accessData
  }),
  dispatch => ({})
)(ChatView);
