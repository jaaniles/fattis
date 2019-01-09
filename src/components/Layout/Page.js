import styled from 'styled-components';

import * as ds from '../../design';

export default styled.div`
  height: 100vh;
  background: ${ds.colors.background.level0};

  padding: ${ds.scale(1)};

  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
