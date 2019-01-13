import posed from 'react-pose';
import styled from 'styled-components';
import { darken } from 'polished';

import * as ds from '../../../design';

const Message = styled.div({
  width: 200,

  backgroundColor: darken(0.05, 'white'),
  color: ds.type.color.dark,
  borderRadius: ds.scale(1),
  padding: '5px 20px 5px 20px',
  transition: 'all 125ms',

  '& + &': {
    marginTop: '0.5rem'
  },

  '&:last-of-type': {
    borderBottomRightRadius: 0
  },

  ...ds.minWidth.bigMobile({
    width: 300
  })
});

export default posed(Message)({
  enter: {
    opacity: 1,
    y: '0%'
  },
  exit: {
    opacity: 0,
    y: '50%'
  }
});
