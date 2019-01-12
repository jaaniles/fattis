import React from 'react';
import styled, { keyframes } from 'styled-components';
import posed from 'react-pose';

import * as ds from '../design';
import Flex from './Layout/FlexRowCentered';

const newMessageIcon = require('../icons/chat.svg');

const jump = keyframes({
  from: { transform: 'scale(1.1)' },
  to: { transform: 'scale(1)' }
});

const NewMessages = styled(Flex)`
  animation: ${jump} 1s linear forwards alternate infinite;
  width: 50px;
  height: 50px;
  background: ${ds.colors.green};
  border-radius: 50%;
  transition: all 0.1s ease-in-out;

  font-size: 50px;
  color: white;
  text-align: center;
  line-height: 70px;

  position: fixed;
  right: 50px;
  bottom: 50px;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const Icon = styled.img({
  width: 30
});

const NewMessagesWidget = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <NewMessages>
      <Icon src={newMessageIcon} alt="New messages!" />
    </NewMessages>
  </div>
));

export default posed(NewMessagesWidget)({
  enter: { width: '100%', transition: { duration: 200 } },
  exit: { width: '1%', transition: { duration: 200 } }
});
