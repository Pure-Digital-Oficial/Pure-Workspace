import { Box, useMediaQuery, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';

interface SimpleSectionContainerPros {
  children: ReactNode;
  id: string;
  backgroundColor?: string;
  backgroundImage?: string;
  fullHeigth: boolean;
  aligmentContent?: boolean;
  heigth?: number;
  maxWidth?: number;
  flexDirection?: string;
  fullWidth?: string;
  aligmentItems?: string;
}

export const SectionContainer: FC<SimpleSectionContainerPros> = ({
  children,
  id,
  backgroundColor,
  backgroundImage,
  fullHeigth,
  aligmentContent = false,
  heigth = 78.1,
  maxWidth = 1400,
  flexDirection,
  fullWidth,
  aligmentItems,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const xlDown = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <Box
      id={id}
      component="section"
      sx={{
        position: 'relative',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: fullHeigth ? '100vh' : theme.spacing(heigth),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          background: backgroundColor,
          alignItems: aligmentContent ? 'center' : '',
          justifyContent: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: aligmentItems ? aligmentItems : 'center',
            flexDirection: flexDirection
              ? flexDirection
              : smDown
              ? 'column'
              : 'row',
            width: fullWidth ? fullWidth : xlDown ? '90%' : '100%',
            maxWidth: maxWidth,
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
