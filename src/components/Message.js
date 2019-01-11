import React from 'react';
import styled from 'styled-components';

import * as ds from '../design';

const Textbox = styled.div`
  margin-top: ${ds.scale(1)};
  padding: 4px ${ds.scale(2)};
  color: ${ds.colors.black};

  border-radius: 10px;
  background: white;
`;

const Message = ({ children }) => <Textbox>{children}</Textbox>;

export default Message;
