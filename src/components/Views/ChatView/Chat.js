import React, { Component } from 'react';

import Message from './Message';
import Typing from './Typing';
import ChatEmptyState from './ChatEmptyState';
import FlexColumn from '../../Layout/FlexColumnCenterHorizontal';

class Chat extends Component {
  state = {
    ready: true,
    typing: false
  };

  writer = async () => {
    const { typing, ready } = this.state;
    const { chat, readMessage, enableReading } = this.props;

    if (!ready || chat.newMessages.length < 1 || typing || !enableReading) {
      return;
    }

    this.setState({ typing: true, ready: false });
    await waitFor(randomIntFromInterval(1, 2) * 1000);

    const { newMessages } = chat;
    if (newMessages.length < 1) {
      return;
    }

    const message = newMessages[0];
    await readMessage(message);

    this.setState({ typing: false });
    await waitFor(randomIntFromInterval(1, 3) * 1000);
    this.setState({ ready: true });
  };

  componentDidMount() {
    setInterval(() => this.writer(), 1000);
  }

  render() {
    const { typing } = this.state;
    const { chat } = this.props;

    return (
      <div>
        {chat.history.length > 0 || typing ? (
          <FlexColumn>
            {chat.history.map((content, key) => (
              <Message
                initialPose="exit"
                key={key}
                pose="enter"
                ref={key === chat.history.length - 1 ? this.lastMessageRef : undefined}
              >
                {content.message}
              </Message>
            ))}
            {typing && <Typing />}
          </FlexColumn>
        ) : (
          <ChatEmptyState loading={chat.loading} noMessages={chat.history.length < 1} initialPose="exit" pose="enter" />
        )}
      </div>
    );
  }
}

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const waitFor = ms => new Promise(resolve => setTimeout(resolve, ms));

export default Chat;
