import { Box } from '@mui/material';
import { FC } from 'react';
import {
  SimpleHeader,
  SimpleHeroSection,
  ToolbarApolBlog,
  SimpleAbout,
  SimpleFooter,
} from '../../components';
import { ButtonNavigation, IconNavigation, LinkText } from '../../shared';

interface ApolHomeContainerProps {
  header: {
    headerTitle?: string;
    headerListButtons: ButtonNavigation[];
  };
  company: {
    companyLogo: string;
    companyLogoAltTitle?: string;
    companyName?: string;
  };
  hero: {
    image: string;
    title: string;
    subTitle?: string;
    backgroundColor?: string;
    backgroundImage?: string;
    imageAltTitle?: string;
  };
  about: {
    aboutTitle: string;
    aboutDescription: string;
    aboutBackgroundColor?: string;
    aboutImage: string;
    aboutImageAltTitle?: string;
    aboutCtaButton: () => void;
    aboutCtaButtonTitle?: string;
  };
  footer: {
    footerCopyrightText?: string;
    footerIcons: IconNavigation[];
    footerMobileColor?: string;
    footerTabletColor?: string;
    footerDefaultColor?: string;
  };
}

export const ApolHomeContainer: FC<ApolHomeContainerProps> = ({
  header: { headerTitle, headerListButtons },
  company: { companyLogo, companyLogoAltTitle, companyName },
  hero: {
    title,
    image,
    backgroundColor,
    backgroundImage,
    subTitle,
    imageAltTitle,
  },
  about: {
    aboutTitle,
    aboutBackgroundColor,
    aboutDescription,
    aboutImageAltTitle,
    aboutImage,
    aboutCtaButton,
    aboutCtaButtonTitle,
  },
  footer: {
    footerIcons,
    footerCopyrightText,
    footerMobileColor,
    footerTabletColor,
    footerDefaultColor,
  },
}) => {
  return (
    <Box>
      <SimpleHeader
        title={headerTitle}
        logo={companyLogo}
        logoAltTitle={companyLogoAltTitle}
        listButtons={headerListButtons}
        toolBar={<ToolbarApolBlog />}
      />
      <SimpleHeroSection
        image={image}
        title={title}
        backgroundColor={backgroundColor}
        backgroundImage={backgroundImage}
        subTitle={subTitle}
        imageAltTitle={imageAltTitle}
      />
      <SimpleAbout
        ctaButton={aboutCtaButton}
        ctaButtonTitle={aboutCtaButtonTitle}
        title={aboutTitle}
        description={aboutDescription}
        backgroundColor={aboutBackgroundColor}
        aboutImage={aboutImage}
        aboutImageAltTitle={aboutImageAltTitle}
      />
      <SimpleFooter
        icons={footerIcons}
        colorDefault={footerDefaultColor}
        company={{
          companyLogo,
          companyName,
        }}
        copyrightText={footerCopyrightText}
        colorMobile={footerMobileColor}
        colorTablet={footerTabletColor}
      />
    </Box>
  );
};
