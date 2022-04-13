import { MantineGradient, MantineThemeOverride } from '@mantine/core';

const theme: {
    mantine: MantineThemeOverride,
    accentColor: string,
    errorColor: string,
    warningColor: string,
    primaryGradient: MantineGradient,
    accentGradient: MantineGradient,
    deleteGradient: MantineGradient,
    whiteGradient: MantineGradient,
    darkGradient: MantineGradient,
    transitionDuration: number,
} = {
  // Mantine
  mantine: {
    colorScheme: 'dark',
    colors: {
      white: [
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
        '#ffffff',
      ],
      cyan: [
        '#E3FAFC',
        '#C5F6FA',
        '#99E9F2',
        '#66D9E8',
        '#3BC9DB',
        '#22B8CF',
        '#15AABF',
        '#1098AD',
        '#0C8599',
        '#0B7285',
      ],
      teal: [
        '#E6FCF5',
        '#C3FAE8',
        '#96F2D7',
        '#63E6BE',
        '#38D9A9',
        '#20C997',
        '#12B886',
        '#0CA678',
        '#099268',
        '#087F5B',
      ],
      dark: [
        '#ffffff',
        '#395A60',
        '#254950',
        '#0F373F',
        '#0C2A30',
        '#081C20',
        '#040E10',
        '#020708',
        '#010304',
        '#000000',
      ],
    },
    primaryColor: 'teal',
    loader: 'bars',
    breakpoints: {
      xs: 500,
      sm: 800,
      md: 1000,
      lg: 1200,
      xl: 1400,
    },
    fontFamily: 'Verdana, sans-serif',
    fontFamilyMonospace: 'monospace',
    headings: { fontFamily: 'Blessed Light, monospace' },
  },

  // Extended
  accentColor: 'orange',
  errorColor: 'red',
  warningColor: 'red',

  primaryGradient: { from: 'teal', to: 'dark', deg: 10 },
  accentGradient: { from: 'orange', to: 'dark', deg: 10 },
  deleteGradient: { from: 'red', to: 'dark', deg: 10 },
  darkGradient: { from: 'dark', to: 'teal', deg: 35 },
  whiteGradient: { from: 'white', to: 'gray', deg: 25 },

  transitionDuration: 700,
};

export default theme;
