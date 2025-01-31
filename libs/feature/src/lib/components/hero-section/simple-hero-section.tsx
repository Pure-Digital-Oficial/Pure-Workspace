import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { FC } from 'react';
import { SectionContainer } from '../section';

interface SimpleHeroSectionProps {
  title: string;
  subTitle?: string;
  image: string;
  imageAltTitle?: string;
  backgroundColor?: string;
  backgroundImage?: string;
  fontTitleWeight?: number;
  fontSubTitleWeight?: number;
  heigth?: number;
}

export const SimpleHeroSection: FC<SimpleHeroSectionProps> = ({
  title,
  subTitle,
  image,
  backgroundImage,
  imageAltTitle = 'Foto do Título',
  backgroundColor = '#1B7A43E3',
  fontTitleWeight = 600,
  fontSubTitleWeight = 400,
  heigth = 56.7,
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));
  const xlDown = useMediaQuery(theme.breakpoints.down('xl'));

  return (
    <SectionContainer
      fullHeigth={false}
      id="hero-section"
      backgroundColor={backgroundColor}
      backgroundImage={backgroundImage}
      heigth={heigth}
    >
      <Box
        sx={{
          alignContent: 'center',
          position: 'relative',
          width: mdDown ? '100%' : xlDown ? '60%' : '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'start',
            maxWidth: '86%',
            marginLeft: smDown ? theme.spacing(2) : '',
            mt: smDown ? theme.spacing(4) : '',
          }}
        >
          <Typography
            variant={xlDown ? 'h5' : 'h4'}
            sx={{
              whiteSpace: 'pre-line',
              color: 'white',
              maxWidth: '95%',
              fontSize: smDown
                ? theme.spacing(2.5)
                : lgDown
                ? theme.spacing(3.75)
                : theme.spacing(5),
              fontWeight: fontTitleWeight,
            }}
          >
            {title}
          </Typography>
          {subTitle && (
            <Typography
              variant="body2"
              mt={theme.spacing(1)}
              fontSize={
                smDown
                  ? theme.spacing(1.5)
                  : lgDown
                  ? theme.spacing(1.75)
                  : theme.spacing(2.5)
              }
              color="white"
              fontWeight={fontSubTitleWeight}
            >
              {subTitle}
            </Typography>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: lgDown ? 'center' : '',
          position: 'relative',
          height: '100%',
        }}
      >
        <Box
          component="img"
          height={smDown ? theme.spacing(24) : xlDown ? '80%' : '100%'}
          src={image}
          alt={imageAltTitle}
          sx={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>
    </SectionContainer>
  );
};
