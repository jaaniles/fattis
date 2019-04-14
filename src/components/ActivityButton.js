import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = styled.button`
  padding: 2px;
  width: 200px;

  color: white;
  background: none;
  border: 1px solid white;
  border-radius: 5px;

  text-transform: uppercase;

  font-size: 16pt;

  ${props =>
    props.toggled &&
    `
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transform: scale(0.80);
    color: white;
    border: 2px solid #B1DE98;
  `};

  transition: all 0.2s cubic-bezier(0.96, 1.5, 0.96, 1.5);

  outline: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

class ActivityButton extends Component {
  pressButton = () => {
    const { toggled } = this.props;
    this.props.handleClick(!toggled);
  };

  render() {
    const { icon, text } = this.props;

    return (
      <ButtonContainer onClick={this.pressButton}>
        <Button toggled={this.props.toggled}>{text ? text : <FontAwesomeIcon icon={icon} />}</Button>
      </ButtonContainer>
    );
  }
}

export default ActivityButton;
