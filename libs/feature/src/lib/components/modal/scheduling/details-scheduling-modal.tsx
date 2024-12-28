import { FC, useEffect, useRef } from 'react';
import PlaylistRemoveIcon from '@mui/icons-material/PlaylistRemove';
import { useLoggedUser } from '../../../contexts';
import { SimpleFormModal } from '../simple';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DetailsSchedulingCard } from '../../card';
import { EmptyListResponse, ListSimplePlaylist } from '../../list';
import {
  usePlaylistBySchedulingData,
  useFindSchedulingByIdData,
} from '../../../hooks';

interface DetailsSchedulingModalProps {
  open: boolean;
  title: string;
  handlePopUpClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  idToDetails: string;
  createByTitle?: string;
  createAtTitle?: string;
  startTimeTitle?: string;
  endTimeTitle?: string;
  loopingTitle?: string;
  priorityTitle?: string;
  listEmpty?: string;
}

export const DetailsSchedulingModal: FC<DetailsSchedulingModalProps> = ({
  handlePopUpClose,
  showAlert,
  open,
  title,
  idToDetails,
  createByTitle = 'Criado por: ',
  createAtTitle = 'Criado em: ',
  startTimeTitle = 'Início: ',
  endTimeTitle = 'Fim: ',
  loopingTitle = 'Repetir: ',
  priorityTitle = 'Prioridade: ',
  listEmpty = 'Sem Playlist',
}) => {
  const { loggedUser } = useLoggedUser();
  const { listPlaylist, totalPage, getPlayListBySchedulingData } =
    usePlaylistBySchedulingData({
      showAlert,
      loggedUserId: loggedUser?.id ?? '',
      schedulingId: idToDetails,
    });
  const { SchedulingById, getSchedulingByIdData } = useFindSchedulingByIdData({
    showAlert,
    findSchedulingByIdDto: {
      id: idToDetails,
      loggedUserId: loggedUser?.id ?? '',
    },
  });
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const hasLoadedUserData = useRef(false);

  useEffect(() => {
    if (open && idToDetails && !hasLoadedUserData.current) {
      getSchedulingByIdData();
      getPlayListBySchedulingData();
      hasLoadedUserData.current = true;
    }
  }, [
    loggedUser,
    idToDetails,
    open,
    getSchedulingByIdData,
    getPlayListBySchedulingData,
  ]);

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getPlayListBySchedulingData('', value);
  };

  const updatePlaylistList = async () => {
    getPlayListBySchedulingData();
  };

  return (
    <SimpleFormModal
      height={theme.spacing(70)}
      width={smDown ? '90%' : theme.spacing(80)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <DetailsSchedulingCard
        createAtTitle={createAtTitle}
        createByTitle={createByTitle}
        endTimeTitle={endTimeTitle}
        loopingTitle={loopingTitle}
        priorityTitle={priorityTitle}
        startTimeTitle={startTimeTitle}
        schedulingDetails={SchedulingById}
      />
      <Box>
        {listPlaylist.length > 0 ? (
          listPlaylist.length > 0 ? (
            <Box>
              <ListSimplePlaylist
                updatePlaylist={updatePlaylistList}
                schedulingId={idToDetails}
                showAlert={showAlert}
                playlists={listPlaylist}
                totalPages={totalPage}
                handleChange={handleChange}
              />
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h4">
                <strong>{listEmpty}</strong>
              </Typography>
            </Box>
          )
        ) : (
          <EmptyListResponse
            message="Sem Playlists"
            icon={
              <PlaylistRemoveIcon
                sx={{
                  fontSize: theme.spacing(10),
                }}
              />
            }
          />
        )}
      </Box>
    </SimpleFormModal>
  );
};
