import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FC } from 'react';
import { CtaButton } from '../buttom';
import { IconTextProps } from '../../shared';
import { IconText } from '../list';
import { SectionContainer } from '../section';

interface SimpleDetailsFeatureProps {
  backgroundColor?: string;
  image: string;
  imageAltTitle?: string;
  title: string;
  ctaButton: () => void;
  ctaButtonTitle?: string;
  listFeatures: IconTextProps[];
}

export const SimpleDetailsFeature: FC<SimpleDetailsFeatureProps> = ({
  backgroundColor,
  image,
  title,
  ctaButton,
  ctaButtonTitle,
  imageAltTitle = 'Foto do Produto',
  listFeatures,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const containerStyles = {
    display: 'flex',
    justifyContent: lgDown ? 'center' : 'space-between',
    alignItems: 'center',
    flexDirection: lgDown ? 'column' : 'row',
    flex: 1,
    mb: smDown ? theme.spacing(3) : '',
  };

  const textBoxStyles = {
    maxWidth: smDown ? '90%' : lgDown ? '70%' : '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: lgDown ? 'center' : 'left',
    margin: '0 auto',
  };

  const imageBoxStyles = {
    maxWidth: '100%',
    width: lgDown ? '100%' : 'auto',
    objectFit: 'contain' as const,
    objectPosition: 'center',
    mb: lgDown ? -5 : '',
    padding: smDown ? theme.spacing(1) : theme.spacing(2),
  };

  return (
    <SectionContainer
      id="details-feature"
      fullHeigth={lgDown ? true : false}
      aligmentContent
      heigth={70}
      backgroundColor={backgroundColor}
    >
      {!lgDown && (
        <Box
          component="img"
          height={theme.spacing(75)}
          src={image}
          alt={imageAltTitle}
          sx={imageBoxStyles}
        />
      )}

      <Box sx={containerStyles}>
        <Box sx={textBoxStyles}>
          <Box sx={{ width: '95%' }}>
            <Typography
              variant={smDown ? 'h6' : 'h5'}
              sx={{
                whiteSpace: 'pre-line',
                textAlign: 'start',
                maxWidth: smDown ? '100%' : lgDown ? '80%' : theme.spacing(55),
                fontSize: smDown ? theme.spacing(2) : 'auto',
                fontWeight: 800,
              }}
            >
              {title}
            </Typography>

            <Box mt={theme.spacing(2)}>
              {listFeatures.map((feature) => (
                <IconText
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  fontSize={lgDown ? theme.spacing(2) : theme.spacing(1.5)}
                />
              ))}
            </Box>
          </Box>

          {lgDown && (
            <Box
              component="img"
              height={lgDown ? '100%' : theme.spacing(75)}
              src={image}
              alt={imageAltTitle}
              sx={imageBoxStyles}
            />
          )}

          <Box sx={{ marginTop: lgDown ? 'auto' : theme.spacing(12) }}>
            <CtaButton
              action={ctaButton}
              title={ctaButtonTitle}
              fontSize={smDown ? 16 : 13}
              width={smDown ? 40 : 32}
              padding={smDown ? 2 : 1.5}
              color="secondary"
              borderRadius={90}
              titleColor="white"
              iconLeft={smDown ? undefined : <ArrowBackIcon />}
              iconRight={smDown ? <ArrowForwardIcon /> : undefined}
            />
          </Box>
        </Box>
      </Box>
    </SectionContainer>
  );
};
