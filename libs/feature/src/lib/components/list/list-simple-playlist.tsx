import {
  Avatar,
  Box,
  Collapse,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Pagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import {
  ContentFile,
  CrudType,
  ErrorResponse,
  FindFilesByPlaylistDto,
  Playlist,
} from '@pure-workspace/domain';
import { FC, useCallback, useState } from 'react';
import { useLoggedUser } from '../../contexts';
import { FindFilesByPlaylistRequest } from '../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../shared';
import { ScrollBox } from '../scroll';
import { ButtonFileMenu } from '../menu';
import { DeletePlaylistToSchedulingModal } from '../modal';
import { EmptyListResponse } from './simple';

interface PlaylistItemProps {
  schedulingId: string;
  playlists: Playlist[];
  totalPages: number;
  showAlert: (message: string, success: boolean) => void;
  handleChange: (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => Promise<void>;
  updatePlaylist: () => void;
}

export const ListSimplePlaylist: FC<PlaylistItemProps> = ({
  playlists,
  schedulingId,
  totalPages,
  showAlert,
  handleChange,
  updatePlaylist,
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const [deletePlaylistPopUp, setDeletePlaylistPopUp] = useState(false);
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [listFiles, setListFiles] = useState<Record<string, ContentFile[]>>({});
  const [openSubItems, setOpenSubItems] = useState<Record<string, boolean>>({});
  const [selectedId, setSelectedId] = useState('');

  const handlePopUpOpen = (types: CrudType, id?: string) => {
    switch (types) {
      case 'delete':
        setSelectedId(id ?? '');
        setDeletePlaylistPopUp(true);
        break;
    }
  };

  const getFilesByPlaylist = useCallback(
    async (input: FindFilesByPlaylistDto) => {
      try {
        const result = await FindFilesByPlaylistRequest(input);
        setListFiles((prevListFiles) => ({
          ...prevListFiles,
          [input.idPlaylist]: result.files,
        }));
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Arquivos');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    },
    [showAlert]
  );

  const handleToggleSubItems = async (id: string) => {
    if (!openSubItems[id]) {
      getFilesByPlaylist({
        idPlaylist: id,
        loggedUserId: loggedUser?.id ?? '',
      });
    }
    setOpenSubItems((prevOpenSubItems) => ({
      ...prevOpenSubItems,
      [id]: !prevOpenSubItems[id],
    }));
  };

  return (
    <div>
      <DeletePlaylistToSchedulingModal
        updatePlaylist={updatePlaylist}
        open={deletePlaylistPopUp}
        handlePopUpClose={() => setDeletePlaylistPopUp(false)}
        idPlaylist={selectedId}
        idScheduling={schedulingId}
        showAlert={showAlert}
        title="Deletar Playlist"
        subTitle="Deseja realmente deletar a playlist?"
      />
      <ScrollBox maxHeight={theme.spacing(32)}>
        <List>
          {playlists.length > 0 ? (
            playlists.map((playlist) => (
              <div key={playlist.id}>
                <ListItem>
                  <ListItemButton
                    onClick={() => handleToggleSubItems(playlist.id)}
                  >
                    <ListItemButton
                      sx={{
                        padding: 0,
                      }}
                      key={playlist.id}
                    >
                      <ListItemText primary={playlist.name} />
                      {openSubItems[playlist.id] ? (
                        <ExpandLess />
                      ) : (
                        <ExpandMore />
                      )}
                    </ListItemButton>
                  </ListItemButton>
                  <ButtonFileMenu
                    iconMenuItemList={[
                      {
                        icon: <DeleteIcon />,
                        title: 'Deletar',
                        handleClick: async () =>
                          handlePopUpOpen('delete', playlist.id),
                      },
                    ]}
                  />
                </ListItem>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Collapse
                    sx={{
                      width: '90%',
                    }}
                    in={openSubItems[playlist.id]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List key={playlist.id} component="div" disablePadding>
                      {listFiles[playlist.id]?.map((file) => (
                        <div key={file.id}>
                          <ListItem
                            sx={{
                              width: '100%',
                            }}
                            key={file.id}
                          >
                            <ListItemAvatar
                              sx={{
                                marginRight: smDown
                                  ? theme.spacing(1)
                                  : theme.spacing(3),
                              }}
                            >
                              <Avatar
                                sx={{
                                  width: theme.spacing(6),
                                  height: theme.spacing(6),
                                  '& img': {
                                    objectFit: 'contain',
                                    objectPosition: 'center',
                                    maxHeight: '100%',
                                    maxWidth: '100%',
                                  },
                                }}
                                src={file.path}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              sx={{
                                overflow: 'hidden',
                                fontSize: smDown ? '8px' : '12px',
                                textOverflow: 'ellipsis',
                              }}
                              primary={file.originalName}
                            />
                          </ListItem>
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'center',
                            }}
                          >
                            <Divider
                              sx={{
                                width: '95%',
                              }}
                            />
                          </Box>
                        </div>
                      ))}
                    </List>
                  </Collapse>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <Divider
                    sx={{
                      width: '90%',
                    }}
                  />
                </Box>
              </div>
            ))
          ) : (
            <EmptyListResponse
              message="Sem Playlist"
              icon={
                <LocalHotelIcon
                  sx={{
                    fontSize: theme.spacing(10),
                  }}
                />
              }
            />
          )}
        </List>
      </ScrollBox>
      <Box
        width={'100%'}
        display="flex"
        justifyContent="center"
        marginTop={theme.spacing(2)}
      >
        <Pagination
          count={totalPages}
          color="primary"
          onChange={handleChange}
        />
      </Box>
    </div>
  );
};
