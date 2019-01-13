import posed from 'react-pose';
import React from 'react';
import { Cat } from 'react-kawaii';
import styled, { keyframes } from 'styled-components';

import Message from './Message';
import Flex from '../../Layout/FlexRowCentered';

const move = keyframes({
  from: { transform: 'translateX(0)', transform: 'rotate(0deg)', width: 100 },
  to: { transform: 'translateX(5%)', transform: 'rotate(360deg)', width: 25 }
});

const LoadingIndicator = styled(Flex)`
  animation: ${move} 1s ease-in-out forwards alternate infinite;
  width: 100px;
  height: 25px;
  border-radius: 25px;
  display: inline-block;
  background: hotpink;
`;

const EmptyState = React.forwardRef((props, ref) => (
  <div ref={ref}>
    {props.loading && <LoadingIndicator />}
    {!props.loading &&
      props.noMessages && (
        <div>
          <Message>Don´t you have any friends? No messages for the fat one here. </Message>
          <Cat size={320} mood="shocked" color="#596881" />
        </div>
      )}
  </div>
));

export default posed(EmptyState)({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});
