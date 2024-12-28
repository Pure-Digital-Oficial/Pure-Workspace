import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrawerContext, useLoggedUser } from '../../contexts';
import { useLoading } from '../../contexts';
import { DrawerOption } from '@pure-workspace/domain';

export const useLoadUserPureTvData = () => {
  const { loggedUser } = useLoggedUser();
  const { setDrawerOptions } = useDrawerContext();
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  const getLoadUserData = useCallback(() => {
    if (!loggedUser) {
      setLoading(false);
      return;
    }

    if (loggedUser?.status === 'BLOCKED') {
      setLoading(false);

      navigate('/unauthorized-access');
      return;
    } else {
      const baseDrawerOptions: Record<string, DrawerOption[]> = {
        'Página Inicial': [
          { label: 'Página Inicial', icon: 'home', path: '/' },
        ],
        Diretórios: [
          { label: 'Diretórios', icon: 'folder', path: '/directory' },
        ],
        Playlists: [
          { label: 'Playlists', icon: 'playlist_add', path: '/playlist' },
          { label: 'Categorias', icon: 'category', path: '/playlist-category' },
        ],
        Agendamentos: [
          {
            label: 'Agendamentos',
            icon: 'event_upcoming',
            path: '/scheduling',
          },
        ],
        Dispositivos: [
          { label: 'Dispositivos', icon: 'important_devices', path: '/device' },
        ],
      };

      if (loggedUser.type === 'DEFAULT_ADMIN') {
        setDrawerOptions({
          ...baseDrawerOptions,
          Empresa: [
            { label: 'Empresas', icon: 'add_business', path: '/company' },
          ],
        });
      } else if (loggedUser.type === 'ADMIN') {
        setDrawerOptions({
          ...baseDrawerOptions,
          Empresa: [
            { label: 'Empresas', icon: 'add_business', path: '/auth/company' },
          ],
          Usuários: [
            { label: 'Usuários', icon: 'manage_accounts', path: '/auth/user' },
          ],
        });
      } else {
        setDrawerOptions(baseDrawerOptions);
      }
      setLoading(false);
    }
  }, [setLoading, loggedUser, navigate, setDrawerOptions]);

  return getLoadUserData;
};
