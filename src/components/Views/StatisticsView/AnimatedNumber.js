import React from 'react';
import posed from 'react-pose';

const Numba = React.forwardRef((props, ref) => (
  <div ref={ref}>
    <h1>
      {props.value} <span style={{ fontSize: 12 }}>kg</span>
    </h1>
  </div>
));

export default posed(Numba)({
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      y: { type: 'spring', stiffness: 1000, damping: 15 },
      all: { ease: 'linear', duration: 300 },
      default: { ease: 'linear', duration: 300 }
    }
  },
  exit: { y: 20, opacity: 0, transition: { duration: 150 } }
});
