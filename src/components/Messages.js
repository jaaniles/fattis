import React, { Component } from 'react';
import styled from 'styled-components';

import Message from './Message';

const Button = styled.button`
  margin: 25px 0;

  text-transform: uppercase;
  font-weight: 800;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px 35px;
  background: none;

  color: #2d3746;

  outline: none;

  &:active {
    background: #2d3746;
    color: white;
  }

  transition: 0.2s ease-in-out;
`;

const Container = styled.div`
  height: 90vh;

  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  display: flex;
`;

class Messages extends Component {
  render() {
    return (
      <Container>
        <Message text="Why are you so fat?" />
        <Message text="Being fat makes you ugly" />
        <Message text="Maybe stop being ugly and do something" />
        <Message text="But hey I`m just a website" />
        <Button>Do something</Button>
      </Container>
    );
  }
}

export default Messages;
