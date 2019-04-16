import React from 'react';
import styled from 'styled-components';

import heroImage from '../assets/fat_hero.jpg';

import * as ds from '../design';

const HeroImageContainer = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  minHeight: '25vh',
  maxHeight: 300,
  overflow: 'hidden',
  pointerEvents: 'none',

  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    filter: 'sepia(2)'
  }
});

const FadeIntoBackground = styled.div({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  background: `linear-gradient(to top, ${ds.colors.background.purple} 25%, transparent 100%, rgba(26,5,42,0) 300px)`
});

const HeroImage = () => (
  <HeroImageContainer>
    <img src={heroImage} alt="Fat man jogging" />
    <FadeIntoBackground />
  </HeroImageContainer>
);

export default HeroImage;
