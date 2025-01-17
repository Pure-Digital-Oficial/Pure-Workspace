import { Box } from '@mui/material';
import { FC } from 'react';
import {
  SimpleHeader,
  SimpleHeroSection,
  ToolbarApolBlog,
  SimpleAbout,
} from '../../components';
import { ButtonNavigation } from '../../shared';

interface ApolHomeContainerProps {
  header: {
    headerTitle?: string;
    headerListButtons: ButtonNavigation[];
  };
  company: {
    companyLogo: string;
    companyLogoAltTitle?: string;
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
}

export const ApolHomeContainer: FC<ApolHomeContainerProps> = ({
  header: { headerTitle, headerListButtons },
  company: { companyLogo, companyLogoAltTitle },
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
    </Box>
  );
};
