import { Box } from '@mui/material';
import { SimpleHeader, ToolbarApolBlog } from '../../components';
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
}

export const ApolHomeContainer: FC<ApolHomeContainerProps> = ({
  header: { headerTitle, headerListButtons },
  company: { companyLogo, companyLogoAltTitle },
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
    </Box>
  );
};
