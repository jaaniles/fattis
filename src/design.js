import { modularScale } from 'polished';

export const layout = {
  maxWidth: 1280,
  gutter: 24
};

export const breakpoints = {
  mobile: 320,
  bigMobile: 500,
  tablet: 768,
  desktop: 1024,
  maxWidth: layout.maxWidth + 2 * layout.gutter
};

export const spacing = pos => [0, 12, 24, 48, 72][pos];

export const minWidth = Object.entries(breakpoints).reduce((minWidth, current) => {
  const [key, value] = current;
  minWidth[key] = styleObj => ({
    [`@media (min-width: ${value}px)`]: styleObj
  });
  return minWidth;
}, {});

export const scale = number => modularScale(number).replace('em', 'rem');

export const colors = {
  black: '#000000',
  blue: '#7EB7E1',
  red: '#E37868',
  green: '#74D0AF',
  tea: '#CBEAA6',
  teal: '#58F8DD',
  pink: '#EF517E',

  background: {
    level0: '#34344d',
    level2: '#150C22',
    level5: '#14080E',
    purple: '#22031F'
  }
};

export const shadows = {
  small: `0 0.25rem 1rem rgba(0, 0, 0, 0.2)`,
  medium: `0 ${scale(0.5)} ${scale(1)} rgba(0, 0, 0, 0.2)`,
  large: `0 ${scale(3)} ${scale(10)} rgba(0, 0, 0, 0.6)`
};

export const glows = {
  small: `0 0.25rem 1rem rgba(138, 125, 155, 0.2)`,
  medium: `0 ${scale(0.5)} ${scale(1)} rgba(138, 125, 155, 0.2)`,
  large: `0 ${scale(3)} ${scale(10)} rgba(138, 125, 155, 0.6)`
};

export const zIndex = {
  below: -1,
  default: 1,
  low: 2,
  medium: 3,
  high: 4
};

export const type = {
  color: {
    interactive: '#2575FF',
    primary: '#E7E8F2',
    dark: '#14080E',
    secondary: '#707086',
    tertiary: '#2F436F'
  },

  bodyFont: {
    fontFamily: 'Muli, sans-serif',
    fontWeight: 400,
    lineHeight: 1.5
  },

  titleFont: {
    fontFamily: 'Raleway, sans-serif',
    fontWeight: 400,
    lineHeight: 1.75,
    textTransform: 'uppercase'
  }
};

export const sizes = {
  s: 12,
  default: 16,
  m: 20,
  l: 24,
  xl: 32,
  xxl: 48
};

export const headings = {
  h1: {
    ...type.titleFont,
    fontSize: sizes.l,
    ...minWidth.tablet({
      fontSize: sizes.xl
    })
  },

  h2: {
    ...type.titleFont,
    fontSize: sizes.m,
    ...minWidth.tablet({
      fontSize: sizes.l
    })
  },

  h3: {
    ...type.titleFont,
    fontSize: sizes.default,
    ...minWidth.tablet({
      fontSize: sizes.m
    })
  },

  h4: {
    ...type.titleFont,
    fontSize: sizes.default
  }
};
