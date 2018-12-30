import React, { Component } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Button = styled.button`
  padding: 16px 0px 16px 0;

  width: 100%;
  color: black;
  background: white;

  font-size: 16pt;

  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  ${props =>
    props.pressed &&
    `
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transform: scale(0.80);
    background: white;
    color: black;
    border-top: 5px solid #B1DE98;
    border-left: 5px solid #B1DE98;
    border-bottom: 5px solid #B1DE98;
  `};

  transition: all 0.2s cubic-bezier(0.96, 1.5, 0.96, 1.5);

  outline: none;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 45%;

  margin-top: 32px;
  margin-right: -15px;
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
        <Button pressed={this.props.toggled}>{text ? text : <FontAwesomeIcon icon={icon} />}</Button>
      </ButtonContainer>
    );
  }
}

export default ActivityButton;
