import React from 'react';
import styled from 'styled-components';

const Textbox = styled.div`
  margin: 5px 0;
  padding: 0 35px;
  color: white;

  border-radius: 10px;
  background: #2d3746;
`;

class Message extends React.Component {
  render() {
    const { text } = this.props;

    return (
      <Textbox>
        <p>{text}</p>
      </Textbox>
    );
  }
}

export default Message;
