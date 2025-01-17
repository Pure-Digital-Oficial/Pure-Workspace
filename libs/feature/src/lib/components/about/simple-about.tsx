import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { SectionContainer } from '../section';
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
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <SectionContainer
      fullHeigth={false}
      id="about-section"
      backgroundColor={backgroundColor}
      heigth={lgDown ? undefined : 70}
    >
      {!smDown && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            zIndex: 0,
            ml: mdDown ? theme.spacing(3) : '',
          }}
        >
          <Box
            component="img"
            src={aboutImage}
            alt={aboutImageAltTitle}
            height={smDown ? theme.spacing(60) : theme.spacing(47.5)}
            sx={{
              maxWidth: smDown ? '80%' : '100%',
              objectFit: 'contain',
            }}
          />
        </Box>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: smDown ? 'start' : 'center',
          alignItems: 'center',
          flexDirection: 'column',
          maxWidth: smDown ? '100%' : mdDown ? '75%' : '60%',
          ml: !smDown && mdDown ? theme.spacing(3) : '',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              whiteSpace: 'pre-line',
              textAlign: smDown ? 'center' : 'start',
              maxWidth: smDown ? '100%' : mdDown ? '90%' : '80%',
              fontSize: smDown
                ? theme.spacing(4)
                : mdDown
                ? theme.spacing(4.5)
                : theme.spacing(5),
              fontWeight: 600,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-line',
              textAlign: 'start',
              maxWidth: mdDown ? '90%' : '80%',
              fontSize: smDown
                ? theme.spacing(1.5)
                : mdDown
                ? theme.spacing(1.6)
                : theme.spacing(2.5),
              fontWeight: 400,
              mt: theme.spacing(3),
              ml: smDown ? theme.spacing(3) : '',
            }}
          >
            {description}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              width: '80%',
              justifyContent: 'start',
              mt: theme.spacing(4),
              ml: smDown ? theme.spacing(3) : '',
            }}
          >
            <CtaButton
              action={ctaButton}
              title={ctaButtonTitle}
              fontSize={mdDown ? 14 : 24}
              width={mdDown ? 24 : 40}
              padding={mdDown ? 0 : 1}
            />
          </Box>
        </Box>
        {smDown && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              width: '100%',
              zIndex: 0,
              mt: theme.spacing(3),
            }}
          >
            <Box
              component="img"
              src={aboutImage}
              alt={aboutImageAltTitle}
              height={smDown ? theme.spacing(30) : theme.spacing(47.5)}
              sx={{
                maxWidth: smDown ? '80%' : '100%',
                objectFit: 'contain',
              }}
            />
          </Box>
        )}
      </Box>
    </SectionContainer>
  );
};
