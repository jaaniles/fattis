import posed from 'react-pose';
import React from 'react';
import { Ghost } from 'react-kawaii';

import Actions from '../FattisView/Actions';
import Highlight from '../../Highlight';
import Message from '../ChatView/Message';
import LoadingIndicator from '../../LoadingIndicator';
import * as ds from '../../../design';

const NoLogs = React.forwardRef((props, ref) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} ref={ref}>
    <Message>
      Hey fattie, start logging your <Highlight color={ds.colors.tea}>SUCCESSESS</Highlight>
    </Message>
    <Message>Maybe you´ll lose some of that enormous weight you´re carrying</Message>
    <Ghost size={320} mood="blissful" color="#596881" />
    <p>I know you´re huge but did you happen to do any of these today? Please?</p>
    <Actions toggles={props.toggles} handleClick={props.handleClick} />
  </div>
));

const NoLogsPosed = posed(NoLogs)({
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
  exit: { y: 100, opacity: 0, transition: { duration: 500 } }
});

const EmptyState = React.forwardRef((props, ref) => (
  <div ref={ref}>
    {props.loading ? (
      <LoadingIndicator initialPose="exit" pose="enter" />
    ) : (
      <NoLogsPosed
        initialPose="exit"
        pose={props.exit ? 'exit' : 'enter'}
        toggles={props.toggles}
        handleClick={props.handleClick}
      />
    )}
  </div>
));

export default posed(EmptyState)({
  enter: { opacity: 1 },
  exit: { opacity: 0 }
});
