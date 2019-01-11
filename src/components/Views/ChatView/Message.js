import posed from 'react-pose';
import styled from 'styled-components';

const Message = styled.li({
  backgroundColor: 'hsl(0, 0%, 96%)',
  borderRadius: '0.5rem',
  padding: '1rem 2rem',
  transition: 'all 125ms',

  '& + &': {
    marginTop: '0.5rem'
  },

  '&:last-of-type': {
    borderBottomLeftRadius: 0
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
