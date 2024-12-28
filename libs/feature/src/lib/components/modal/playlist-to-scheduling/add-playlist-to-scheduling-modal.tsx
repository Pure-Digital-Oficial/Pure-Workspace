import { FC, useCallback, useEffect, useState } from 'react';
import { useLoggedUser } from '../../../contexts';
import {
  Box,
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  AddPlaylistsToSchedulingDto,
  ErrorResponse,
  ListPlaylistBySchedulingIdDto,
  ListPlaylistDto,
  Playlist,
} from '@pure-workspace/domain';
import {
  AddPlaylistToSchedulingRequest,
  ListPlaylistBySchedulingIdRequest,
  ListPlaylistRequest,
} from '../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { SimpleFormModal } from '../simple';
import { FormButton } from '../../form';
import { ScrollBox } from '../../scroll';

interface AddPlaylistToSchedulingModalProps {
  open: boolean;
  title: string;
  idScheduling: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  playlistTitle?: string;
  successMessage?: string;
}

export const AddPlaylistToSchedulingModal: FC<
  AddPlaylistToSchedulingModalProps
> = ({
  handlePopUpClose,
  showAlert,
  title,
  open,
  idScheduling,
  playlistTitle = 'Selecione as Playlists',
  successMessage = 'Playlists Adicionada com Sucesso',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [dataLoaded, setDataLoaded] = useState(false);
  const [listPlaylist, setListPlaylist] = useState<Playlist[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [totalPage, setTotalPage] = useState<number>(1);

  useEffect(() => {
    if (!open) {
      setDataLoaded(false);
    }
  }, [open]);

  const compareLists = (list1: Playlist[], list2: Playlist[]) => {
    return list2.filter((playlist) => !list1.some((p) => p.id === playlist.id));
  };

  const getPlaylists = useCallback(
    async (input: ListPlaylistDto) => {
      try {
        const result = await ListPlaylistRequest(input);
        return result;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Playlist');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  const getPlaylistByScheduling = useCallback(
    async (input: ListPlaylistBySchedulingIdDto) => {
      try {
        const result = await ListPlaylistBySchedulingIdRequest(input);
        return result;
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Playlist');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  const getFilteredPlaylist = useCallback(async () => {
    const allPlaylist = await getPlaylists({
      loggedUserId: loggedUser?.id ?? '',
      companyId: loggedUser?.selectedCompany.id ?? '',
      userInput: '',
      take: 5,
    });
    const playlistInScheduling = await getPlaylistByScheduling({
      id: idScheduling,
      loggedUserId: loggedUser?.id ?? '',
      filter: '',
      take: 5,
    });
    const mappedPlaylist = compareLists(
      playlistInScheduling?.playlists ?? [],
      allPlaylist?.playlists ?? []
    );
    setListPlaylist(mappedPlaylist);
    setTotalPage(allPlaylist?.totalPages ?? 1);
    setDataLoaded(true);
  }, [idScheduling, getPlaylistByScheduling, getPlaylists, loggedUser]);

  useEffect(() => {
    if (open && idScheduling && !dataLoaded) {
      getFilteredPlaylist();
    }
  }, [open, idScheduling, dataLoaded, getFilteredPlaylist, loggedUser]);

  const handlePlaylistToggle = (playlistId: string) => {
    const currentIndex = selectedPlaylists.indexOf(playlistId);
    const newChecked = [...selectedPlaylists];

    if (currentIndex === -1) {
      newChecked.push(playlistId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedPlaylists(newChecked);
  };

  const addPlaylistToScheduling = async (data: AddPlaylistsToSchedulingDto) => {
    try {
      const result = await AddPlaylistToSchedulingRequest(data);

      if (result) {
        setLoading(false);
        setSuccess(true);
        showAlert(successMessage, true);
        handlePopUpClose();
        setSuccess(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setSuccess(false);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Playlist ou Agendamento');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleAddPlaylist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSuccess(false);
    setLoading(true);
    await addPlaylistToScheduling({
      loggedUserId: loggedUser?.id ?? '',
      schedulingId: idScheduling,
      playlistIds: selectedPlaylists,
    });
  };

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    const result = await ListPlaylistRequest({
      loggedUserId: loggedUser?.id ?? '',
      companyId: loggedUser?.selectedCompany.id ?? '',
      userInput: '',
      skip: (value - 1) * 5,
      take: 5,
    });

    if (result) {
      setListPlaylist(result.playlists);
      setTotalPage(result.totalPages);
    }
  };

  return (
    <SimpleFormModal
      height={smDown ? theme.spacing(73) : theme.spacing(72)}
      width={smDown ? '90%' : theme.spacing(80)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <Box component="form" onSubmit={handleAddPlaylist}>
        <Box>
          {listPlaylist.length > 0 ? (
            <>
              <Typography mt={theme.spacing(0.5)} variant="h6">
                {playlistTitle}
              </Typography>
              <ScrollBox>
                <List>
                  {listPlaylist.map((playlist) => (
                    <ListItem key={playlist.id}>
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={
                            selectedPlaylists.indexOf(playlist.id) !== -1
                          }
                          onChange={() => handlePlaylistToggle(playlist.id)}
                        />
                      </ListItemIcon>

                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          width: '100%',
                        }}
                      >
                        <ListItemText primary={playlist.name} />
                        <Chip
                          sx={{
                            marginTop: theme.spacing(0.5),
                            fontSize: theme.spacing(2),
                          }}
                          component="span"
                          label={playlist.category}
                          color="secondary"
                          variant="filled"
                        />
                      </Box>
                    </ListItem>
                  ))}
                </List>
              </ScrollBox>
              <Box
                sx={{
                  marginTop: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  width: '100%',
                }}
              >
                <Pagination
                  count={totalPage}
                  color="primary"
                  onChange={handleChange}
                />
              </Box>
            </>
          ) : (
            <Box>Sem Playlists</Box>
          )}
        </Box>
        <Box
          sx={{
            marginTop: theme.spacing(1),
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <Box width={smDown ? '95%' : '60%'}>
            <FormButton
              buttonTitle="Adicionar Playlists"
              loading={loading}
              success={success}
            />
          </Box>
        </Box>
      </Box>
    </SimpleFormModal>
  );
};
