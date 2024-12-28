import { FC, useCallback, useEffect, useState } from 'react';
import { SimpleFormModal } from '../simple';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import {
  ErrorResponse,
  ListDirectoryNameResponseDto,
  ListSimpleDirectoryDto,
} from '@pure-workspace/domain';
import { ListSimpleDirectoryRequest } from '../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { useLoggedUser } from '../../../contexts';
import { ListSimpleDirectory } from '../../list';
import { AddFileToPlaylistRequest } from '../../../services/http/file-to-playlist/add-file-to-playlist';
import { useListDirectoryData } from '../../../hooks';

interface AddFileToPlaylistModalProps {
  showAlert: (message: string, success: boolean) => void;
  handlePopUpClose: () => void;
  title: string;
  idPlaylist: string;
  open: boolean;
  successMessage?: string;
}

export const AddFileToPlaylistModal: FC<AddFileToPlaylistModalProps> = ({
  handlePopUpClose,
  showAlert,
  idPlaylist,
  title,
  open,
  successMessage = 'Arquivo(s) Adicionado(s) com Sucesso!',
}) => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const { loggedUser } = useLoggedUser();

  const { listDirectory, getListDeviceData } = useListDirectoryData({
    showAlert,
    loggedUserId: loggedUser?.id ?? '',
    companyId: loggedUser?.selectedCompany.id ?? '',
  });

  useEffect(() => {
    if (!open) {
      setDataLoaded(false);
    }
  }, [open]);

  useEffect(() => {
    if (open && idPlaylist && !dataLoaded) {
      getListDeviceData();
    }
  }, [dataLoaded, idPlaylist, open, getListDeviceData, loggedUser]);

  const addFileToPlaylist = async (data: string[]) => {
    if (data.length > 0) {
      try {
        const result = await AddFileToPlaylistRequest({
          loggedUserId: loggedUser?.id ?? '',
          filesId: data,
          playlistId: idPlaylist,
        });

        if (result) {
          showAlert(successMessage, true);
          handlePopUpClose();
        }
      } catch (error) {
        console.error(error);
        if (axios.isAxiosError(error)) {
          const axiosError = error as AxiosError<ErrorResponse>;
          const errors = ValidationsError(axiosError, 'Arquivo(s)');
          if (errors) {
            showAlert(errors, false);
          }
        }
      }
    }
  };

  return (
    <SimpleFormModal
      height={smDown ? theme.spacing(55) : theme.spacing(70)}
      width={smDown ? '90%' : theme.spacing(80)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <Box>
        <ListSimpleDirectory
          listDirectories={listDirectory}
          showAlert={showAlert}
          addFileToPlaylist={addFileToPlaylist}
        />
      </Box>
    </SimpleFormModal>
  );
};
