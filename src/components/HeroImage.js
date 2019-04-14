import React from 'react';
import styled from 'styled-components';

import heroImage from '../assets/fat_hero.jpg';

import * as ds from '../design';

const HeroImageContainer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  minHeight: '50vh',
  maxHeight: 600,
  overflow: 'hidden',
  pointerEvents: 'none',
  zIndex: ds.zIndex.high,

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
});

const HeroImage = () => (
  <HeroImageContainer>
    <img src={heroImage} alt="Fat man jogging" />
  </HeroImageContainer>
);

export default HeroImage;
