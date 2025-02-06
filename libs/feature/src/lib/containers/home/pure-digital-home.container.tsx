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
  };
  cta: {
    ctaButton: () => void;
    ctaButtonTitle?: string;
  };
}

export const PureDigitalHomeContainer: FC<PureDigitalHomeContainerProps> = ({
  header: { headerListButtons, headerTitle },
  company: { companyLogo, companyLogoAltTitle },
  cta: { ctaButtonTitle, ctaButton },
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
            ctaButton={ctaButton}
            ctaButtonTitle={ctaButtonTitle}
          />
        }
      />
    </Box>
  );
};
