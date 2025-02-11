import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { SectionContainer } from '../section';

import { FC } from 'react';
import { CtaButton } from '../buttom';
import { PureDigitalAbouList } from '../list';
import { IconTextProps } from '../../shared';

interface PureDigitalAboutProps {
  backgroundColor?: string;
  title: string;
  description: string;
  aboutList: IconTextProps[];
  ctaButton: () => void;
  ctaButtonTitle?: string;
  backgroundRight?: string;
  dividerColor?: string;
  aboutImage: string;
  aboutImageAltTitle?: string;
}

export const PureDigitalAbout: FC<PureDigitalAboutProps> = ({
  backgroundColor,
  title,
  description,
  aboutList,
  ctaButton,
  ctaButtonTitle,
  backgroundRight = 'linear-gradient(35deg, #2d2c2c, #302c2c, #592527 35%, #762124, #9c1b1f 90%)',
  dividerColor = '#8e8e8e',
  aboutImage,
  aboutImageAltTitle = 'Foto da seção sobre',
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <SectionContainer
      fullHeigth={smDown ? true : false}
      id="about-section"
      backgroundColor={backgroundColor}
      heigth={70}
      flexDirection={lgDown ? 'column' : 'row'}
      fullWidth={lgDown ? '100%' : ''}
      aligmentItems={lgDown ? 'start' : ''}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: smDown ? 'center' : lgDown ? 'start' : 'flex-end',
          alignItems: smDown ? 'center' : lgDown ? 'flex-start' : 'center',
          flexDirection: 'column',
          mt: smDown ? theme.spacing(4) : '',
          mb: lgDown && !smDown ? theme.spacing(6) : '',
          ml: lgDown && !smDown ? theme.spacing(6) : '',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: smDown ? 'center' : 'start',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              whiteSpace: 'pre-line',
              textAlign: 'start',
              maxWidth: smDown
                ? '95%'
                : lgDown
                ? theme.spacing(60)
                : theme.spacing(40),
              fontSize: smDown ? theme.spacing(2) : theme.spacing(3),
              fontWeight: 700,
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-line',
              textAlign: 'start',
              maxWidth: smDown
                ? '95%'
                : lgDown
                ? theme.spacing(60)
                : theme.spacing(40),
              fontSize: smDown ? theme.spacing(2) : theme.spacing(1.7),
              fontWeight: 300,
              mt: theme.spacing(3),
            }}
          >
            {description}
          </Typography>

          {!lgDown && (
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                justifyContent: mdDown ? 'center' : 'start',
                mt: theme.spacing(4),
                mb: smDown ? theme.spacing(4) : mdDown ? theme.spacing(4) : '',
              }}
            >
              <CtaButton
                action={ctaButton}
                title={ctaButtonTitle}
                fontSize={14}
                width={40}
                padding={2}
                color="secondary"
                borderRadius={90}
                titleColor="white"
                iconRight={<ArrowForwardIcon />}
              />
            </Box>
          )}
        </Box>
      </Box>

      {lgDown && !smDown && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            background: '#cccccc',
            paddingTop: theme.spacing(2),
          }}
        >
          <Box
            sx={{
              marginTop: -12,
              zIndex: 0,
            }}
          >
            <Box
              component="img"
              src={aboutImage}
              alt={aboutImageAltTitle}
              height={theme.spacing(70)}
              sx={{
                maxWidth: '100%',
                objectFit: 'contain',
                transform: 'rotate(4.97deg)',
              }}
              loading="lazy"
            />
          </Box>
          <PureDigitalAbouList
            aboutList={aboutList}
            backgroundRight={backgroundRight}
            marginTop={-2}
            alignItems="center"
            width={mdDown ? '60%' : '55%'}
            borderTopLeftRadius={theme.spacing(25)}
            dividerColor={dividerColor}
          />
        </Box>
      )}

      {(!lgDown || smDown) && (
        <>
          <Box
            sx={{
              display: 'flex',
              justifyContent: smDown ? 'center' : 'start',
              height: '100%',
              marginBottom: smDown ? -17 : 0,
              marginTop: smDown ? '' : -20,
              marginRight: smDown ? '' : -13,
              zIndex: 0,
            }}
          >
            <Box
              component="img"
              src={aboutImage}
              alt={aboutImageAltTitle}
              height={smDown ? theme.spacing(60) : theme.spacing(70)}
              sx={{
                maxWidth: smDown ? '100%' : '100%',
                objectFit: 'contain',
              }}
              loading="lazy"
            />
          </Box>
          <PureDigitalAbouList
            aboutList={aboutList}
            backgroundRight={backgroundRight}
            marginTop={-2}
            alignItems="center"
            justifyContent="center"
            width={smDown ? '100%' : '50%'}
            borderTopLeftRadius={mdDown ? theme.spacing(23) : theme.spacing(25)}
            marginRight={mdDown ? '' : -23}
            paddingTop={smDown ? theme.spacing(17) : theme.spacing(7)}
            paddingLeft={mdDown ? '' : theme.spacing(13)}
            paddingBottom={mdDown ? theme.spacing(6) : ''}
            dividerColor={dividerColor}
          />
        </>
      )}

      {lgDown && (
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: lgDown ? 'center' : 'start',
            mt: theme.spacing(4),
            mb: smDown ? theme.spacing(4) : lgDown ? theme.spacing(4) : '',
          }}
        >
          <CtaButton
            action={ctaButton}
            title={ctaButtonTitle}
            fontSize={14}
            width={30}
            padding={2}
            color="secondary"
            borderRadius={90}
            titleColor="white"
            iconRight={<ArrowForwardIcon />}
          />
        </Box>
      )}
    </SectionContainer>
  );
};
