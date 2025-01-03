import { GoogleUserInfoDto } from '@pure-workspace/domain';
import axios from 'axios';

export async function FindUserInfoRequest(token: string) {
  const userInfoResponse = await axios.get<GoogleUserInfoDto>(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return userInfoResponse.data;
}
