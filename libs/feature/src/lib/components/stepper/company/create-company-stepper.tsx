import { FC, useState } from 'react';
import {
  FormCreateCompany,
  FormCreateCompanyData,
  FormConsultCompanyByCnpj,
  FormCreateCompanyAddress,
  FormCreateCompanyResponsible,
  FormSelectCompany,
} from '../../form';
import { Box } from '@mui/material';
import { CompanyResponseDto } from '@pure-workspace/domain';

interface CompanyStepperProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  totalPosition?: number;
}

export const CreateCompanyStepper: FC<CompanyStepperProps> = ({
  showAlert,
  handlePopUpClose,
  totalPosition = 5,
}) => {
  const [step, setStep] = useState(1);
  const [companyId, setCompanyId] = useState('');
  const [companyData, setCompanyData] = useState<CompanyResponseDto>(
    {} as CompanyResponseDto
  );

  const changeStage = (stepPosition: number) => {
    setStep(stepPosition);
  };

  const changeCompany = (company: CompanyResponseDto) => {
    setCompanyData(company);
  };

  const changeCompanyId = (companyId: string) => {
    setCompanyId(companyId);
  };

  return (
    <Box>
      {step === 1 && (
        <FormConsultCompanyByCnpj
          showAlert={showAlert}
          selectCompanyRedirect={() => changeStage(6)}
          handlePopUpClose={() => changeStage(2)}
          changeCompany={changeCompany}
          step={{
            stepPosition: step,
            totalPositions: totalPosition,
          }}
          totalPosition={totalPosition}
        />
      )}

      {step === 2 && (
        <FormCreateCompany
          showAlert={showAlert}
          handlePopUpClose={() => changeStage(3)}
          changeCompanyId={changeCompanyId}
          step={{
            stepPosition: step,
            totalPositions: totalPosition,
          }}
          totalPosition={totalPosition}
          company={companyData.simple}
        />
      )}

      {step === 3 && (
        <FormCreateCompanyData
          showAlert={showAlert}
          handlePopUpClose={() => changeStage(4)}
          step={{
            stepPosition: step,
            totalPositions: totalPosition,
          }}
          companyId={companyId}
          companyData={companyData.data}
          totalPosition={totalPosition}
        />
      )}

      {step === 4 && (
        <FormCreateCompanyAddress
          showAlert={showAlert}
          handlePopUpClose={() => changeStage(5)}
          step={{
            stepPosition: step,
            totalPositions: totalPosition,
          }}
          companyId={companyId}
          companyAddress={companyData.address}
          totalPosition={totalPosition}
        />
      )}

      {step === 5 && (
        <FormCreateCompanyResponsible
          showAlert={showAlert}
          handlePopUpClose={handlePopUpClose}
          companyId={companyId}
          step={{
            stepPosition: step,
            totalPositions: totalPosition,
          }}
        />
      )}

      {step === 6 && (
        <FormSelectCompany
          backButton={() => changeStage(1)}
          showAlert={showAlert}
          handlePopUpClose={handlePopUpClose}
        />
      )}
    </Box>
  );
};
