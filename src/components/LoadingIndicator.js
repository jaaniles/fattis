import React from 'react';
import styled, { keyframes } from 'styled-components';
import posed from 'react-pose';

import * as ds from '../design';

const load = keyframes`
  0% {
    transform: rotate(0deg); 
    width: 75px; 
  }
  50% {
    transform: rotate(180deg); 
    width: 50px; 
    background: ${ds.colors.tea};
  }
  100% {
    transform: rotate(360deg); 
    width: 25px; 
    background: ${ds.colors.green};
  }
`;

const LoadingStyles = styled.div`
  animation: ${load} 1s ease-in-out alternate infinite;
  width: 100px;
  height: 25px;
  border-radius: 25px;
  display: inline-block;
  background: hotpink;
`;

const LoadingIndicator = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <LoadingStyles />
  </div>
));

export default posed(LoadingIndicator)({
  enter: {
    y: 0,
    opacity: 1,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: { y: 20, opacity: 0, transition: { duration: 150 } }
});
