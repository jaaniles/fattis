import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import ReactSVG from 'react-svg';
import { darken } from 'polished';

import Row from '../../Layout/FlexRowCentered';
import * as ds from '../../../design';

const gymIcon = require('../../../icons/workout.svg');
const walkIcon = require('../../../icons/walk.svg');
const healthyIcon = require('../../../icons/healthy.svg');

const Icon = styled(ReactSVG)`
  width: 55px;
  height: 55px;
  filter: grayscale(70%);

  transition: all 0.2s ease-in-out;
`;

const Action = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;

  font-size: 10pt;

  width: 33%;
  height: 150px;

  color: ${ds.type.color.secondary};

  ${props =>
    props.pressed &&
    css`
      color: ${ds.colors.red};
      background: ${darken(0.1, ds.colors.background.level0)};
      transform: scale(0.95);
      ${Icon} {
        filter: none;
      }
    `};

  transition: all 0.2s ease-in-out;
`;

class Actions extends Component {
  render() {
    const { toggles, handleClick } = this.props;

    return (
      <Row>
        <Action pressed={toggles && toggles.GYM} onClick={() => handleClick('GYM')}>
          <Icon src={gymIcon} />
          <p>GYM</p>
        </Action>
        <Action pressed={toggles && toggles.HEALTHY} onClick={() => handleClick('HEALTHY')}>
          <Icon src={healthyIcon} />
          <p>ATE HEALTHY</p>
        </Action>
        <Action pressed={toggles && toggles.WALK} onClick={() => handleClick('WALK')}>
          <Icon src={walkIcon} />
          <p>EXTRA WALK</p>
        </Action>
      </Row>
    );
  }
}

export default Actions;
