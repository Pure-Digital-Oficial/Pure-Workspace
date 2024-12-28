import { Box } from '@mui/material';
import { FC, useState } from 'react';
import {
  FormEditCompany,
  FormEditCompanyAddress,
  FormEditCompanyData,
  FormEditCompanyResponsible,
} from '../../form';
import { CompanyAllIdsResponseDto } from '@pure-workspace/domain';

interface CompanyStepperProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  totalPosition?: number;
  companyIds: CompanyAllIdsResponseDto;
}

export const EditCompanyStepper: FC<CompanyStepperProps> = ({
  handlePopUpClose,
  showAlert,
  companyIds,
  totalPosition = 4,
}) => {
  const [step, setStep] = useState(1);

  const changeStage = (stepPosition: number) => {
    setStep(stepPosition);
  };

  return (
    <Box>
      {step === 1 && (
        <FormEditCompany
          buttonRight={() => changeStage(2)}
          showAlert={showAlert}
          handlePopUpClose={() => changeStage(2)}
          step={{
            stepPosition: step,
            totalPositions: totalPosition,
          }}
          totalPosition={totalPosition}
          companyId={companyIds.companySimpleId}
        />
      )}

      {step === 2 && (
        <FormEditCompanyData
          companyDataId={companyIds.companyDataId}
          showAlert={showAlert}
          handlePopUpClose={() => changeStage(3)}
          buttonRight={() => changeStage(3)}
          buttonLeft={() => changeStage(1)}
          step={{
            stepPosition: step,
            totalPositions: totalPosition,
          }}
        />
      )}

      {step === 3 && (
        <FormEditCompanyAddress
          companyAddressId={companyIds.companyAddressId}
          handlePopUpClose={() => changeStage(4)}
          showAlert={showAlert}
          buttonRight={() => changeStage(4)}
          buttonLeft={() => changeStage(2)}
          step={{
            stepPosition: step,
            totalPositions: totalPosition,
          }}
          totalPosition={totalPosition}
        />
      )}

      {step === 4 && (
        <FormEditCompanyResponsible
          companyResponsibleId={companyIds.companyResponsibleId}
          showAlert={showAlert}
          buttonRight={() => changeStage(1)}
          buttonLeft={() => changeStage(3)}
          handlePopUpClose={handlePopUpClose}
          step={{
            stepPosition: step,
            totalPositions: totalPosition,
          }}
        />
      )}
    </Box>
  );
};
