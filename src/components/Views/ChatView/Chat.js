import React, { Component } from 'react';

import Message from './Message';
import Typing from './Typing';
import FlexColumn from '../../Layout/FlexColumnCenterHorizontal';

class Chat extends Component {
  state = {
    ready: true,
    typing: false,
    chat: [],
    newMessages: messages
  };

  writer = async () => {
    const { typing, ready } = this.state;

    if (!ready || this.state.newMessages.length < 1 || typing) {
      return;
    }

    this.setState({ typing: true, ready: false });
    await waitFor(randomIntFromInterval(10, 20) * 100);

    const newMessages = this.state.newMessages;
    if (newMessages.length < 1) {
      return;
    }

    const message = this.state.newMessages[0];

    this.setState({
      chat: this.state.chat.concat(message),
      newMessages: this.state.newMessages.slice(1),
      typing: false
    });

    await waitFor(randomIntFromInterval(1, 3) * 1000);

    this.setState({ ready: true });
  };

  componentDidMount() {
    setInterval(() => this.writer(), 1000);
  }

  render() {
    const { chat, typing } = this.state;

    return (
      <div>
        {(chat.length > 0 || typing) && (
          <FlexColumn>
            {chat.map((content, key) => (
              <Message
                initialPose="exit"
                key={key}
                pose="enter"
                ref={key === messages.length - 1 ? this.lastMessageRef : undefined}
              >
                {content}
              </Message>
            ))}
            {typing && <Typing />}
          </FlexColumn>
        )}
      </div>
    );
  }
}

const messages = [
  <p key="1">Why are you so fat</p>,
  <p key="2">Being fat makes you ugly</p>,
  <p key="3">Maybe you should stop being ugly</p>,
  <p key="4">But hey what do I know</p>
];

const randomIntFromInterval = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const waitFor = ms => new Promise(resolve => setTimeout(resolve, ms));

export default Chat;
