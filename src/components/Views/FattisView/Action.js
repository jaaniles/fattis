import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';

import * as ds from '../../../design';

const Icon = styled.img({
  width: 55,
  height: 55,
  filter: 'grayscale(70%)',
  transition: 'all 200ms ease-in-out'
});

const Action = styled.div(
  {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: ds.sizes.s,
    height: 150,
    color: ds.type.color.secondary,
    transition: 'all 200ms ease-in-out'
  },
  props =>
    props.toggled && {
      color: ds.colors.red,
      background: darken(0.1, ds.colors.background.level0),
      transform: 'scale(0.95)',

      Icon: {
        filter: 'none'
      }
    }
);

const ActionComponent = ({ icon, label, toggled }) => (
  <Action toggled={toggled}>
    <Icon src={icon} alt={label} />
    <p>{label}</p>
  </Action>
);

export default ActionComponent;
