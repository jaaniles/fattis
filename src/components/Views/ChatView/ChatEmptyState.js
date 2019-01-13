import posed from 'react-pose';
import React from 'react';
import { Cat } from 'react-kawaii';

import Message from './Message';
import LoadingIndicator from '../../LoadingIndicator';

const NoMessages = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <Message>Don´t you have any friends? No messages for the fat one here. </Message>
    <Message>Use the app and get we´ll comment your progress - or un-progress </Message>
    <Cat size={320} mood="shocked" color="#596881" />
  </div>
));

const NoMessagesPosed = posed(NoMessages)({
  enter: {
    y: 0,
    opacity: 1,
    delayChildren: 500,
    staggerChildren: 500,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      default: { duration: 300 }
    }
  },
  exit: { y: 20, opacity: 0, transition: { duration: 150 } }
});

const EmptyState = React.forwardRef((props, ref) => (
  <div ref={ref}>
    {props.loading && <LoadingIndicator initialPose="exit" pose="enter" />}
    {!props.loading && props.noMessages && <NoMessagesPosed initialPose="exit" pose="enter" />}
  </div>
));

export default posed(EmptyState)({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});
