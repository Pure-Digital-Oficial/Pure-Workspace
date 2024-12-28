import {
  AjustListsDto,
  CityResponseDto,
  CompanyAddressResponseDto,
  CompanyBodyAddressDto,
  ConsultZipcodeDto,
  CreateCompanyAddressDto,
  ErrorResponse,
  ListSimpleCityDto,
  ListSimpleCountryDto,
  ListSimpleCountryResponseDto,
  ListSimpleStateDto,
  ListSimpleStateResponseDto,
  StepItem,
} from '@pure-workspace/domain';
import SearchIcon from '@mui/icons-material/Search';
import { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLoggedUser } from '../../../../contexts';
import {
  ConsultZipcodeRequest,
  CreateCompanyAddressRequest,
  ListSimpleCityRequest,
} from '../../../../services';
import {
  Box,
  IconButton,
  InputAdornment,
  MenuItem,
  TextField,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../../shared';
import { FormButton } from '../../form-button.component';
import {
  ListSimpleCountryRequest,
  ListSimpleStateRequest,
} from '../../../../services';

interface FormCreateCompanyAddressProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  step: StepItem;
  companyId: string;
  totalPosition: number;
  companyAddress: CompanyAddressResponseDto;
  buttonTitle?: string;
  successMessage?: string;
  zipcodeLabel?: string;
  streetLabel?: string;
  districtLabel?: string;
  complementLabel?: string;
  numberLabel?: string;
  cityLabel?: string;
  countryLabel?: string;
  stateLabel?: string;
}

export const FormCreateCompanyAddress: FC<FormCreateCompanyAddressProps> = ({
  showAlert,
  handlePopUpClose,
  companyId,
  companyAddress,
  step: { stepPosition = 4, stepTitle = 'Etapa' },
  totalPosition,
  successMessage = 'Endereço criado com sucesso',
  zipcodeLabel = 'CEP',
  streetLabel = 'Rua',
  districtLabel = 'Bairro',
  complementLabel = 'Complemento',
  numberLabel = 'Número',
  cityLabel = 'Cidade',
  countryLabel = 'País',
  stateLabel = 'Estado',
  buttonTitle = 'Adicionar Endereço',
}) => {
  const { loggedUser } = useLoggedUser();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [listCoutry, setListCountry] = useState<ListSimpleCountryResponseDto[]>(
    []
  );
  const [listState, setListState] = useState<ListSimpleStateResponseDto[]>([]);
  const [listCity, setListCity] = useState<CityResponseDto[]>([]);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CompanyBodyAddressDto>({
    mode: 'all',
    criteriaMode: 'all',
    defaultValues: {
      cityId: '',
      countryId: '',
      stateId: '',
      complement: companyAddress.complement,
      district: companyAddress.district,
      number: companyAddress.number,
      street: companyAddress.street,
      zipcode: companyAddress.zipcode,
    },
  });

  const getCountry = useCallback(
    async (data: ListSimpleCountryDto) => {
      try {
        const result = await ListSimpleCountryRequest(data);
        setDataLoaded(true);
        setListCountry(result);
        return result;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'País');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  const getState = useCallback(
    async (data: ListSimpleStateDto) => {
      try {
        const result = await ListSimpleStateRequest(data);
        setListState(result);
        return result;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Estado');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  const getCity = useCallback(
    async (data: ListSimpleCityDto) => {
      try {
        const result = await ListSimpleCityRequest(data);
        setListCity(result);
        return result;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Cidade');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  const ajustLists = useCallback(
    async (input: AjustListsDto) => {
      getCountry({
        loggedUserId: loggedUser?.id ?? '',
      }).then((country) => {
        const filteredCountry = country?.filter(
          (item) => item.name === input.country.toUpperCase()
        )[0];
        getState({
          loggedUserId: loggedUser?.id ?? '',
          countryId: filteredCountry?.id ?? '',
        }).then((state) => {
          const filteredState = state?.filter(
            (item) => item.uf === input.state.toUpperCase()
          )[0];
          getCity({
            loggedUserId: loggedUser?.id ?? '',
            stateId: filteredState?.id ?? '',
          }).then((city) => {
            const filteredCity = city?.filter(
              (item) => item.name === input.city.toUpperCase()
            )[0];

            setCountry(filteredCountry?.name.toUpperCase() ?? '');
            setState(filteredState?.uf.toUpperCase() ?? '');
            setCity(filteredCity?.name.toUpperCase() ?? '');
          });
        });
      });
    },
    [getCity, getCountry, getState, loggedUser]
  );

  const getZipcode = useCallback(
    async (data: ConsultZipcodeDto) => {
      try {
        const result = await ConsultZipcodeRequest(data);
        return result;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Endereço');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  useEffect(() => {
    if (!dataLoaded) {
      ajustLists({
        city: companyAddress.city,
        country: companyAddress.country,
        state: companyAddress.state,
      });
    }
  }, [stepPosition, loggedUser, dataLoaded, ajustLists, companyAddress]);

  const createCompanyAddress = async (input: CreateCompanyAddressDto) => {
    try {
      input.body.zipcode = input.body.zipcode.replace(/[^\d]+/g, '');
      const result = await CreateCompanyAddressRequest(input);
      return result;
    } catch (error) {
      setLoading(false);
      setSuccess(false);
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Endereço da Empresa');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleCompanyData = async (data: CompanyBodyAddressDto) => {
    setLoading(true);
    setSuccess(false);
    const result = await createCompanyAddress({
      body: {
        ...data,
        cityId: listCity?.filter((item) => item.name === city)[0]?.id ?? '',
        stateId: listState?.filter((item) => item.uf === state)[0]?.id ?? '',
        countryId:
          listCoutry?.filter((item) => item.name === country)[0]?.id ?? '',
      },
      loggedUserId: loggedUser?.id ?? '',
      companyId,
    });
    if (result) {
      setLoading(false);
      setSuccess(true);
      setSuccess(false);
      reset({
        cityId: '',
        countryId: '',
        stateId: '',
        complement: '',
        district: '',
        number: '',
        street: '',
        zipcode: '',
      });
      showAlert(successMessage, true);
      handlePopUpClose();
    }
  };

  const handleChange =
    (
      setter: React.Dispatch<React.SetStateAction<string>>,
      field: 'country' | 'state' | 'city'
    ) =>
    (event: React.ChangeEvent<{ value: string }>) => {
      let filteredCountry;
      let filteredState;
      switch (field) {
        case 'country':
          filteredCountry = listCoutry?.filter(
            (item) => item.name === event.target.value
          )[0];
          setState('');
          getState({
            loggedUserId: loggedUser?.id ?? '',
            countryId: filteredCountry?.id ?? '',
          });

          setter(event.target.value);
          break;
        case 'state':
          filteredState = listState?.filter(
            (item) => item.uf === event.target.value
          )[0];
          setter(event.target.value);
          setCity('');
          getCity({
            loggedUserId: loggedUser?.id ?? '',
            stateId: filteredState?.id ?? '',
          });
          break;
        case 'city':
          setter(event.target.value);
          break;
      }
    };

  const consultZipCode = () => {
    getZipcode({
      loggedUserId: loggedUser?.id ?? '',
      zipcode,
    }).then((result) => {
      ajustLists({
        city: result?.city ?? '',
        country: result?.country ?? '',
        state: result?.state ?? '',
      });

      reset({
        cityId: '',
        countryId: '',
        stateId: '',
        complement: '',
        district: result?.district ?? '',
        number: '',
        street: result?.street ?? '',
        zipcode: result?.zipcode ?? '',
      });
    });
  };

  return (
    <Box
      sx={{ mt: 2 }}
      component="form"
      onSubmit={handleSubmit(handleCompanyData)}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        error={!!errors.zipcode}
        helperText={errors.zipcode ? errors.zipcode.message : ''}
        id="zipcode"
        disabled={loading}
        label={zipcodeLabel}
        autoComplete="zipcode"
        autoFocus
        {...register('zipcode', {
          onChange(event) {
            setZipcode(event.target.value);
          },
        })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={consultZipCode}>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Box display="flex" justifyContent="space-between">
        <Box sx={{ width: '48%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            error={!!errors.district}
            helperText={errors.district ? errors.district.message : ''}
            id="district"
            disabled={loading}
            label={districtLabel}
            autoComplete="district"
            {...register('district')}
          />
        </Box>
        <Box sx={{ width: '48%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            error={!!errors.number}
            helperText={errors.number ? errors.number.message : ''}
            id="number"
            disabled={loading}
            label={numberLabel}
            autoComplete="number"
            {...register('number')}
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Box sx={{ width: '48%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            error={!!errors.street}
            helperText={errors.street ? errors.street.message : ''}
            id="street"
            disabled={loading}
            label={streetLabel}
            autoComplete="street"
            {...register('street')}
          />
        </Box>

        <Box sx={{ width: '48%' }}>
          <TextField
            margin="normal"
            fullWidth
            error={!!errors.complement}
            helperText={errors.complement ? errors.complement.message : ''}
            id="complement"
            disabled={loading}
            label={complementLabel}
            autoComplete="complement"
            {...register('complement')}
          />
        </Box>
      </Box>

      <Box display="flex" justifyContent="space-between">
        <Box sx={{ width: '48%' }}>
          <TextField
            fullWidth
            select
            value={country}
            margin="normal"
            error={!!errors.countryId}
            helperText={errors.countryId?.message}
            id="countryId"
            label={countryLabel}
            {...register('countryId', {
              onChange: handleChange(setCountry, 'country'),
            })}
          >
            {listCoutry.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ width: '48%' }}>
          <TextField
            fullWidth
            select
            value={state}
            margin="normal"
            error={!!errors.stateId}
            helperText={errors.stateId ? errors.stateId.message : ''}
            id="stateId"
            disabled={listState.length > 0 ? false : true}
            label={stateLabel}
            {...register('stateId', {
              onChange: handleChange(setState, 'state'),
            })}
          >
            {listState.map((item) => (
              <MenuItem key={item.id} value={item.uf}>
                {item.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Box>
      <TextField
        fullWidth
        select
        value={city}
        margin="normal"
        error={!!errors.cityId}
        helperText={errors.cityId ? errors.cityId.message : ''}
        id="cityId"
        disabled={listCity.length > 0 ? false : true}
        label={cityLabel}
        {...register('cityId', {
          onChange: handleChange(setCity, 'city'),
        })}
      >
        {listCity.map((item) => (
          <MenuItem key={item.id} value={item.name}>
            {item.name}
          </MenuItem>
        ))}
      </TextField>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 1.5,
        }}
      >
        <Box width="80%">
          <FormButton
            buttonTitle={`${buttonTitle} (${stepTitle} - ${stepPosition}/${totalPosition})`}
            loading={loading}
            success={success}
          />
        </Box>
      </Box>
    </Box>
  );
};
