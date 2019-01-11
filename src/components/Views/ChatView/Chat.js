import React, { Component } from 'react';

import Message from './Message';

class Chat extends Component {
  state = {
    ready: true,
    started: false,
    typing: false,
    messages: []
  };

  generator = () =>
    new Promise(async resolve => {
      if (!this.state.ready) {
        this.setState({ typing: true });
        await waitFor(randomIntFromInterval(10, 20) * 100);
        if (!this.state.ready) {
          const message = generateMessage.next().value;
          console.log(message);
          this.setState({ messages: this.state.messages.concat(message), typing: false }, resolve);
        } else {
          resolve();
        }
      }
    }).then(async () => {
      if (!this.state.ready && this.state.messages.length < messages.length) {
        await waitFor(1000);
        this.generator();
      } else {
        this.setState({ ready: true });
      }
    });

  handleStart = () => {
    if (!this.state.started) {
      this.setState({ messages: [], ready: false, started: true }, this.generator);
    }
  };

  componentDidMount() {
    this.handleStart();
  }

  render() {
    const { messages, typing } = this.state;
    return (
      <div>
        {(messages.length > 0 || typing) && (
          <div>
            {messages.map((content, key) => (
              <Message
                initialPose="exit"
                key={key}
                pose="enter"
                children={content}
                ref={key === messages.length - 1 ? this.lastMessageRef : undefined}
              />
            ))}
          </div>
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

function* messageGenerator(i = 0) {
  while (true) yield messages[i++];
}

const generateMessage = messageGenerator();

export default Chat;
