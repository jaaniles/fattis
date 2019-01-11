import posed from 'react-pose';
import styled from 'styled-components';

import * as ds from '../../../design';

const Message = styled.div({
  width: '300px',

  backgroundColor: 'hsl(0, 0%, 96%)',
  color: ds.type.color.dark,
  borderRadius: ds.scale(1),
  padding: '5px 20px 5px 20px',
  transition: 'all 125ms',

  '& + &': {
    marginTop: '0.5rem'
  },

  '&:last-of-type': {
    borderBottomRightRadius: 0
  }
});

export default posed(Message)({
  enter: {
    opacity: 1,
    y: '0%'
  },
  exit: {
    opacity: 0,
    y: '25%'
  }
});
