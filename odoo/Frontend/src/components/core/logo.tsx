'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { useColorScheme } from '@mui/material/styles';

import { NoSsr } from '@/components/core/no-ssr';

const HEIGHT = 60;
const WIDTH = 60;

type Color = 'dark' | 'light';

export interface LogoProps {
  color?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function Logo({
  color = 'dark',
  height = HEIGHT,
  width = WIDTH,
}: LogoProps): React.JSX.Element {
  const isDark = color === 'dark';

  return (
    <Box
      component="span" // force it not to be an anchor
      sx={{
        height,
        width,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: height ? height / 1.5 : 24,
        color: isDark ? 'black' : 'white',
        textDecoration: 'none',       // remove underline
        cursor: 'default',            // normal cursor
        '&:hover': { textDecoration: 'none' }, // no underline on hover
      }}
    >
      Skill Swap
    </Box>
  );
}

export interface DynamicLogoProps {
  colorDark?: Color;
  colorLight?: Color;
  emblem?: boolean;
  height?: number;
  width?: number;
}

export function DynamicLogo({
  colorDark = 'light',
  colorLight = 'dark',
  height = HEIGHT,
  width = WIDTH,
  ...props
}: DynamicLogoProps): React.JSX.Element {
  const { colorScheme } = useColorScheme();
  const color = colorScheme === 'dark' ? colorDark : colorLight;

  return (
    <NoSsr fallback={<Box sx={{ height: `${height}px`, width: `${width}px` }} />}>
      <Logo color={color} height={height} width={width} {...props} />
    </NoSsr>
  );
}
