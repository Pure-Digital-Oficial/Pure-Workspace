import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ButtonNavigation, IconTextProps } from '../../shared';
import {
  PureDigitalAbout,
  SimpleDetailsFeature,
  SimpleHeader,
  SimpleHeroSection,
  ToolbarPureDigital,
} from '../../components';
import { FC } from 'react';

interface PureDigitalHomeContainerProps {
  header: {
    headerTitle?: string;
    headerListButtons: ButtonNavigation[];
  };
  company: {
    companyLogo: string;
    companyLogoAltTitle?: string;
  };
  cta: {
    ctaButton: () => void;
    ctaButtonTitle?: string;
  };
  hero: {
    image: string;
    title: string;
    subTitle?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    imageAltTitle?: string;
  };
  detailsFeature: {
    detailsFeatureAltTitle?: string;
    detailsFeatureImage: string;
    detailsFeatureTitle: string;
    listFeatures: IconTextProps[];
  };
  about: {
    aboutTitle: string;
    aboutDescription: string;
    aboutBackgroundColor?: string;
    aboutList: IconTextProps[];
    aboutImage: string;
    aboutImageAltTitle?: string;
    aboutRigthBackground?: string;
  };
}

export const PureDigitalHomeContainer: FC<PureDigitalHomeContainerProps> = ({
  header: { headerListButtons, headerTitle },
  company: { companyLogo, companyLogoAltTitle },
  cta: { ctaButtonTitle, ctaButton },
  hero: {
    title,
    image,
    backgroundColor,
    backgroundImage,
    subTitle,
    imageAltTitle,
  },
  detailsFeature: {
    detailsFeatureImage,
    detailsFeatureAltTitle,
    detailsFeatureTitle,
    listFeatures,
  },
  about: {
    aboutTitle,
    aboutBackgroundColor,
    aboutList,
    aboutDescription,
    aboutImageAltTitle,
    aboutImage,
    aboutRigthBackground,
  },
}) => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box>
      <SimpleHeader
        color="primary"
        title={headerTitle}
        logo={companyLogo}
        logoAltTitle={companyLogoAltTitle}
        listButtons={headerListButtons}
        toolBar={
          <ToolbarPureDigital
            ctaButton={ctaButton}
            ctaButtonTitle={ctaButtonTitle}
          />
        }
      />

      <SimpleHeroSection
        image={image}
        title={title}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        subTitle={subTitle}
        imageAltTitle={imageAltTitle}
        photoAlignItems="end"
        textWidth={smDown ? '100%' : '60%'}
      />
      <SimpleDetailsFeature
        image={detailsFeatureImage}
        imageAltTitle={detailsFeatureAltTitle}
        title={detailsFeatureTitle}
        ctaButton={ctaButton}
        ctaButtonTitle={ctaButtonTitle}
        listFeatures={listFeatures}
      />

      <PureDigitalAbout
        aboutList={aboutList}
        ctaButton={ctaButton}
        ctaButtonTitle={ctaButtonTitle}
        title={aboutTitle}
        description={aboutDescription}
        backgroundColor={aboutBackgroundColor}
        aboutImage={aboutImage}
        aboutImageAltTitle={aboutImageAltTitle}
        backgroundRight={aboutRigthBackground}
      />
    </Box>
  );
};
