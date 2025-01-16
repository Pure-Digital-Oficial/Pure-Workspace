import { Box } from '@mui/material';
import {
  SimpleHeader,
  SimpleHeroSection,
  ToolbarApolBlog,
} from '../../components';
import { ButtonNavigation } from '../../shared';
import { FC } from 'react';

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
    </Box>
  );
};
