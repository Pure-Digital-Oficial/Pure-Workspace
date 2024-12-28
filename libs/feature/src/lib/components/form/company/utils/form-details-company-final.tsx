import { StepItem } from '@pure-workspace/domain';
import { FC, useEffect, useState } from 'react';
import { useLoggedUser } from '../../../../contexts';
import {
  useFindCompanyAdressByIdData,
  useFindCompanyResponsibleByIdData,
} from '../../../../hooks';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { NavigationButton } from '../../../buttom';
import { formatBrDate, formatValueMask } from '../../../../shared';

interface FormDetailsCompanyFinalProps {
  showAlert: (message: string, success: boolean) => void;
  buttonLeft: () => void;
  buttonRight: () => void;
  companyAddressId: string;
  companyResponsibleId: string;
  step: StepItem;
  companyCityTitle?: string;
  companyCountryTitle?: string;
  companyStateTitle?: string;
  companyDistrictTitle?: string;
  companyStreetTitle?: string;
  companyNumberTitle?: string;
  companyZipCodeTitle?: string;
  companyComplementTitle?: string;
  companyResponsibleTitle?: string;
  companyResponsibleEmailTitle?: string;
  companyResponsiblePhoneTitle?: string;
  companyResponsibleBithDateTitle?: string;
}

export const FormDetailsCompanyFinal: FC<FormDetailsCompanyFinalProps> = ({
  buttonLeft,
  buttonRight,
  showAlert,
  companyAddressId,
  companyResponsibleId,
  companyCityTitle = 'Cidade',
  companyCountryTitle = 'País',
  companyStateTitle = 'Estado',
  companyDistrictTitle = 'Bairro',
  companyStreetTitle = 'Rua',
  companyNumberTitle = 'Número',
  companyZipCodeTitle = 'CEP',
  companyComplementTitle = 'Complemento',
  companyResponsibleTitle = 'Responsável Nome',
  companyResponsibleEmailTitle = 'Email Responsável',
  companyResponsiblePhoneTitle = 'Telefone',
  companyResponsibleBithDateTitle = 'Data Nascimento',
  step: { stepPosition = 2, totalPositions },
}) => {
  const { loggedUser } = useLoggedUser();
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    if (companyAddressId && companyResponsibleId) {
      setDataLoaded(false);
    }
  }, [companyAddressId, companyResponsibleId]);

  const { companyAddressById, getCompanyAddress } =
    useFindCompanyAdressByIdData({
      companyAddressId,
      loggedUserId: loggedUser?.id ?? '',
      showAlert,
    });

  const { companyResponsibleById, getCompanyResponsibleData } =
    useFindCompanyResponsibleByIdData({
      companyResponsibleId,
      loggedUserId: loggedUser?.id ?? '',
      showAlert,
    });

  useEffect(() => {
    if (companyAddressId && companyResponsibleId && !dataLoaded) {
      getCompanyAddress();
      getCompanyResponsibleData();
    }
  }, [loggedUser, companyAddressId, companyResponsibleId, dataLoaded]);

  return (
    <Box sx={{ mt: 2 }}>
      <Card variant="outlined" sx={{ p: 2 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyCountryTitle}: </strong>
                {companyAddressById.country ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyCityTitle}: </strong>
                {companyAddressById.city ?? ''}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyStateTitle}: </strong>
                {companyAddressById.state ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyDistrictTitle}: </strong>
                {companyAddressById.district ?? ''}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyStreetTitle}: </strong>
                {companyAddressById.street ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyNumberTitle}: </strong>
                {companyAddressById.number ?? ''}
              </Typography>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyZipCodeTitle}: </strong>
                {companyAddressById.zipcode ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyComplementTitle}: </strong>
                {companyAddressById.complement ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyResponsibleTitle}: </strong>
                {companyResponsibleById.name ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyResponsibleEmailTitle}: </strong>
                {companyResponsibleById.email ?? ''}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyResponsiblePhoneTitle}: </strong>
                {formatValueMask(companyResponsibleById.phone ?? '', 'phone')}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1">
                <strong>{companyResponsibleBithDateTitle}: </strong>
                {companyResponsibleById.birthdate &&
                  formatBrDate(
                    new Date(companyResponsibleById.birthdate),
                    false
                  )}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Box mt="2rem" display="flex" justifyContent="center">
        <NavigationButton
          step={stepPosition}
          totalSteps={totalPositions}
          buttonLeft={buttonLeft}
          buttonRight={buttonRight}
        />
      </Box>
    </Box>
  );
};
