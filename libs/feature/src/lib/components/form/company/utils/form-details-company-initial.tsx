import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import { StepItem } from '@pure-workspace/domain';
import { FC, useEffect, useState } from 'react';
import { useLoggedUser } from '../../../../contexts';
import {
  useFindCompanyDataByIdData,
  useFindSimpleCompanyByIdData,
} from '../../../../hooks';
import { NavigationButton } from '../../../buttom';
import { formatBrDate, formatValueMask } from '../../../../shared';

interface FormDetailsCompanyInitialProps {
  showAlert: (message: string, success: boolean) => void;
  buttonRight: () => void;
  buttonLeft: () => void;
  companySimpleId: string;
  companyDataId: string;
  step: StepItem;
  companyIdTitle?: string;
  companyCnpjTitle?: string;
  companyFantasyNameTitle?: string;
  companySocialReasonTitle?: string;
  companylegalNatureTitle?: string;
  companyOpeningTitle?: string;
  companyPhoneTitle?: string;
  companyPortTitle?: string;
  companyResponsibleEmailTitle?: string;
  companySituationTitle?: string;
}

export const FormDetailsCompanyInitial: FC<FormDetailsCompanyInitialProps> = ({
  showAlert,
  buttonRight,
  buttonLeft,
  companySimpleId,
  companyDataId,
  companyIdTitle = 'ID',
  companyCnpjTitle = 'CNPJ',
  companyFantasyNameTitle = 'Nome Fantasia',
  companySocialReasonTitle = 'Razão Social',
  companylegalNatureTitle = 'Natureza Juridica',
  companyOpeningTitle = 'Abertura',
  companyPhoneTitle = 'Telefone',
  companyPortTitle = 'Porte',
  companyResponsibleEmailTitle = 'Email',
  companySituationTitle = 'Situação',
  step: { stepPosition = 1, totalPositions },
}) => {
  const { loggedUser } = useLoggedUser();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (companySimpleId && companyDataId) {
      setDataLoaded(false);
    }
  }, [companySimpleId]);

  const { companyById, getSimpleCompanyData } = useFindSimpleCompanyByIdData({
    companyId: companySimpleId,
    loggedUserId: loggedUser?.id ?? '',
    showAlert,
  });

  const { companyDataById, getCompanyData } = useFindCompanyDataByIdData({
    companyDataId: companyDataId,
    loggedUserId: loggedUser?.id ?? '',
    showAlert,
  });

  useEffect(() => {
    if (companySimpleId && companyDataId && !dataLoaded) {
      getSimpleCompanyData();
      getCompanyData();
    }
  }, [loggedUser, companySimpleId, companyDataId, dataLoaded]);

  return (
    <Box sx={{ mt: 2 }}>
      <Card variant="outlined" sx={{ p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyIdTitle}: </strong>
                {companyById.id ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyCnpjTitle}: </strong>
                {companyById.cnpj ?? ''}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companySocialReasonTitle}: </strong>
                {companyById.socialReason ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyFantasyNameTitle}: </strong>
                {companyById.fantasyName ?? ''}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companylegalNatureTitle}: </strong>
                {companyDataById.legalNature ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyOpeningTitle}: </strong>
                {companyDataById.opening &&
                  formatBrDate(new Date(companyDataById.opening), false)}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyPhoneTitle}: </strong>
                {formatValueMask(companyDataById.phone ?? '', 'phone')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyPortTitle}: </strong>
                {companyDataById.port ?? ''}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyResponsibleEmailTitle}: </strong>
                {companyDataById.responsibleEmail ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companySituationTitle}: </strong>
                {companyDataById.situation ?? ''}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box mt="2rem" display="flex" justifyContent="center">
        <NavigationButton
          step={stepPosition}
          totalSteps={totalPositions}
          buttonRight={buttonRight}
          buttonLeft={buttonLeft}
        />
      </Box>
    </Box>
  );
};
