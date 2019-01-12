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
  componentDidMount() {
    this.props.loadChat();
  }

  render() {
    const { chat, readMessage, addNewMessage, isShown } = this.props;

    return (
      <Page>
        <Chat enableReading={isShown} chat={chat} readMessage={readMessage} addNewMessage={addNewMessage} />
      </Page>
    );
  }
}

export default connect(
  state => ({
    access: state.withings.accessData,
    chat: state.chat
  }),
  dispatch => ({
    loadChat: dispatch.chat.loadChat,
    readMessage: dispatch.chat.readMessage,
    addNewMessage: dispatch.chat.addNewMessage
  })
)(ChatView);
