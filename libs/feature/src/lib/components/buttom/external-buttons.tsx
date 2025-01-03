import {
  AccessToken,
  ErrorResponse,
  ExternalAuthDto,
} from '@pure-workspace/domain';
import {
  ExternalAuthRequest,
  FindUserInfoRequest,
  setUserLocalStorage,
} from '../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';
import { useGoogleLogin } from '@react-oauth/google';
import { FC } from 'react';
import { Box, useTheme } from '@mui/material';
import { ImageButton } from './image-button';

interface ExternalButtonsProps {
  setLocalUserId: (email: string) => Promise<void>;
  showAlert: (message: string, success: boolean) => void;
  externalButton?: {
    imageSrc?: string;
    imageTitle?: string;
    imageAltText?: string;
  };
}

export const ExternalButtons: FC<ExternalButtonsProps> = ({
  setLocalUserId,
  showAlert,
  externalButton,
}) => {
  const theme = useTheme();

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const userInfo = await FindUserInfoRequest(response.access_token);
        const auth = await externalAuth({
          appId: process.env['NX_PUBLIC_PURE_TV_ID'] || '',
          body: {
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture,
          },
          externalId: userInfo.sub,
        });

        if (auth) {
          setUserLocalStorage({
            email: userInfo.email,
            token: auth.token,
          });
          await setLocalUserId(userInfo.email);
          window.location.reload();
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    scope: 'email profile',
  });

  const externalAuth = async (
    input: ExternalAuthDto
  ): Promise<AccessToken | undefined> => {
    try {
      const result = await ExternalAuthRequest(input);
      return result;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Autenticacao');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleGoogleLogin = () => {
    googleLogin();
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        mt: theme.spacing(1),
      }}
    >
      <ImageButton
        size="large"
        title={externalButton?.imageTitle ?? ''}
        imageSrc={externalButton?.imageSrc ?? ''}
        altText={externalButton?.imageAltText ?? ''}
        onClick={handleGoogleLogin}
      />
    </Box>
  );
};
