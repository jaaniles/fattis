import styled, { css } from 'styled-components';

export const Header = styled.div`
  margin-top: 0px;
  background: black;
  width: 100%;
  min-height: 100px;

  text-align: center;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${props =>
    !props.topHeader &&
    css`
      padding-top: 25px;
      margin-top: -25px;
      position: absolute;
    `};
`;
