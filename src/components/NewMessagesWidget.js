import React from 'react';
import styled, { keyframes } from 'styled-components';
import posed from 'react-pose';
import { SpeechBubble } from 'react-kawaii';

import * as ds from '../design';
import Flex from './Layout/FlexRowCentered';

const jump = keyframes({
  from: { transform: 'scale(1.1)' },
  to: { transform: 'scale(1)' }
});

const NewMessages = styled(Flex)`
  animation: ${jump} 1s linear forwards alternate infinite;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  transition: all 0.1s ease-in-out;

  color: white;
  text-align: center;

  position: fixed;
  right: ${ds.scale(1)};
  bottom: ${ds.scale(1)};

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

const NewMessagesWidget = React.forwardRef((props, ref) => (
  <button ref={ref} onClick={() => props.handleClick(1)}>
    <NewMessages>
      <SpeechBubble size={50} />
    </NewMessages>
  </button>
));

export default posed(NewMessagesWidget)({
  enter: { opacity: 1, transition: { duration: 200 } },
  exit: { opacity: 0, transition: { duration: 200 } }
});
