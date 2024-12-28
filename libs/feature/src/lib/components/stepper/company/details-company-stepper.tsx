import { Box } from '@mui/material';
import { CompanyAllIdsResponseDto } from '@pure-workspace/domain';
import { FC, useState } from 'react';
import { FormDetailsCompanyFinal, FormDetailsCompanyInitial } from '../../form';

interface DetailsCompanyStepperProps {
  showAlert: (message: string, success: boolean) => void;
  totalPosition?: number;
  companyIds: CompanyAllIdsResponseDto;
}

export const DetailsCompanyStepper: FC<DetailsCompanyStepperProps> = ({
  showAlert,
  totalPosition = 2,
  companyIds,
}) => {
  const [step, setStep] = useState(1);

  const changeStage = (stepPosition: number) => {
    setStep(stepPosition);
  };

  return (
    <Box>
      {step === 1 && companyIds.companySimpleId && companyIds.companyDataId && (
        <FormDetailsCompanyInitial
          companySimpleId={companyIds.companySimpleId}
          companyDataId={companyIds.companyDataId}
          showAlert={showAlert}
          step={{
            stepPosition: step,
            totalPositions: totalPosition,
          }}
          buttonRight={() => changeStage(2)}
          buttonLeft={() => changeStage(2)}
        />
      )}

      {step === 2 &&
        companyIds.companyAddressId &&
        companyIds.companyResponsibleId && (
          <FormDetailsCompanyFinal
            companyAddressId={companyIds.companyAddressId}
            companyResponsibleId={companyIds.companyResponsibleId}
            buttonLeft={() => changeStage(1)}
            buttonRight={() => changeStage(1)}
            showAlert={showAlert}
            step={{
              stepPosition: step,
              totalPositions: totalPosition,
            }}
          />
        )}
    </Box>
  );
};
