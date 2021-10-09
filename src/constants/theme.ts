import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const COLORS = {
  // base colors
  primary: {
    100: '#EAF2FF',
    200: '#99B1F0',
    300: '#FF740F',
    400: '#436ACC',
    500: '#232D5A',
  },
  secondary: {
    200: '#1AA260',
  },
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 12,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  primaryFam: {
    fontFamily: 'Roboto-regular',
  },
  secondaryFam: {
    fontFamily: 'Poppins-Regular',
  },
};

const appTheme = {COLORS, SIZES, FONTS};

export default appTheme;
