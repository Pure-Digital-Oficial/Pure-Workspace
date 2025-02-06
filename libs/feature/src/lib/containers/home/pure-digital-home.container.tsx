import { Box } from '@mui/material';
import { ButtonNavigation } from '../../shared';
import { SimpleHeader, ToolbarPureDigital } from '../../components';
import { FC } from 'react';

interface PureDigitalHomeContainerProps {
  header: {
    headerTitle?: string;
    headerListButtons: ButtonNavigation[];
  };
  company: {
    companyLogo: string;
    companyLogoAltTitle?: string;
    companyName?: string;
  };
}

export const PureDigitalHomeContainer: FC<PureDigitalHomeContainerProps> = ({
  header: { headerListButtons, headerTitle },
  company: { companyLogo, companyLogoAltTitle, companyName },
}) => {
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
            ctaButton={() => {
              console.log('aaa');
            }}
          />
        }
      />
    </Box>
  );
};
