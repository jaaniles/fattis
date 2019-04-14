import React, { Component } from 'react';
import styled from 'styled-components';

import Action from './Action';
import Row from '../../Layout/FlexRowCentered';
import HoldableAction from './HoldableAction';

import gymIcon from '../../../icons/workout.svg';
import walkIcon from '../../../icons/walk.svg';
import healthyIcon from '../../../icons/healthy.svg';

import * as ds from '../../../design';

const GymAction = ({ toggled }) => <Action toggled={toggled} icon={gymIcon} label="Gym" />;
const WalkAction = ({ toggled }) => <Action toggled={toggled} icon={walkIcon} label="Extra Walk" />;
const HealthyAction = ({ toggled }) => <Action toggled={toggled} icon={healthyIcon} label="Ate healthy" />;

const Separator = styled.div({
  width: '95%',
  ...ds.minWidth.tablet({
    width: '80%'
  }),

  margin: '0 auto',
  border: `1px solid ${ds.colors.terra}`
});

class Actions extends Component {
  render() {
    const { toggles, handleClick } = this.props;

    return (
      <>
        <Row>
          <HoldableAction toggled={toggles && toggles.GYM} callback={() => handleClick('GYM')}>
            <GymAction />
          </HoldableAction>
          <HoldableAction toggled={toggles && toggles.WALK} callback={() => handleClick('WALK')}>
            <WalkAction />
          </HoldableAction>
          <HoldableAction toggled={toggles && toggles.HEALTHY} callback={() => handleClick('HEALTHY')}>
            <HealthyAction />
          </HoldableAction>
        </Row>
        <Separator />
      </>
    );
  }
}

export default Actions;
