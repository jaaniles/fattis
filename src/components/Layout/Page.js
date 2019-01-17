import styled from 'styled-components';

import * as ds from '../../design';

export default styled.div`
  height: 100vh;
  background: ${props => (props.background ? props.background : ds.colors.background.level0)};

  padding-left: ${ds.scale(1)};
  padding-right: ${ds.scale(1)};

  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
