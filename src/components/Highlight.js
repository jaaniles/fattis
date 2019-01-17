import styled from 'styled-components';

export default styled.span`
  background: ${props => (props.color ? props.color : '#e7e8f2')};
  color: ${props => (props.fontColor ? props.fontColor : 'black')};
  padding: 1px 5px 1px 5px;
  margin: 0 2px 0 2px;
  font-weight: 800;

  border-radius: 2px;
`;
