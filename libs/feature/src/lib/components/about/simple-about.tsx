import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { CtaButton } from '../buttom';

interface SimpleAboutProps {
  backgroundColor?: string;
  title: string;
  description: string;
  ctaButton: () => void;
  ctaButtonTitle?: string;
  aboutImage: string;
  aboutImageAltTitle?: string;
}

export const SimpleAbout: FC<SimpleAboutProps> = ({
  backgroundColor,
  title,
  description,
  ctaButton,
  ctaButtonTitle,
  aboutImage,
  aboutImageAltTitle = 'Foto da seção sobre',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <Box
      id="about-section"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: smDown ? '100vh' : theme.spacing(70),
        backgroundColor,
        padding: theme.spacing(4),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: smDown ? 'column' : 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: 1600,
          width: lgDown ? '100%' : '90%',
        }}
      >
        {!smDown && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              flex: '1 1 50%',
            }}
          >
            <Box
              component="img"
              src={aboutImage}
              alt={aboutImageAltTitle}
              sx={{
                maxWidth: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
        )}

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            textAlign: 'left',
            flex: '1 1 50%',
            padding: smDown ? '' : theme.spacing(4),
            maxWidth: smDown ? '100%' : lgDown ? '75%' : '60%',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontSize: smDown
                ? theme.spacing(4)
                : lgDown
                ? theme.spacing(4.5)
                : theme.spacing(5),
              fontWeight: 600,
              whiteSpace: 'pre-line',
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              fontSize: smDown
                ? theme.spacing(1.5)
                : lgDown
                ? theme.spacing(1.6)
                : theme.spacing(2.5),
              fontWeight: 400,
              marginTop: theme.spacing(3),
            }}
          >
            {description}
          </Typography>

          <Box sx={{ marginTop: theme.spacing(4) }}>
            <CtaButton
              action={ctaButton}
              title={ctaButtonTitle}
              fontSize={lgDown ? 14 : 24}
              width={lgDown ? 24 : 40}
              padding={lgDown ? 0 : 1}
            />
          </Box>
        </Box>

        {smDown && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: theme.spacing(3),
            }}
          >
            <Box
              component="img"
              src={aboutImage}
              alt={aboutImageAltTitle}
              sx={{
                maxWidth: '80%',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};
