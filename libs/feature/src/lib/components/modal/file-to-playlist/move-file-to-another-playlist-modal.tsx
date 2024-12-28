import { FC, useCallback, useState } from 'react';
import { SimpleFormModal } from '../simple';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import {
  ComboBoxListResult,
  ErrorResponse,
  ListPlaylistDto,
} from '@pure-workspace/domain';
import {
  ListPlaylistRequest,
  MoveFilesToAnotherPlaylistRequest,
} from '../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';
import { useLoggedUser } from '../../../contexts';
import { SearchComboBox } from '../../input';

interface MoveFileToAnotherPlaylistModalProps {
  selectedFiles: Record<string, boolean>;
  oldPlaylist: string;
  open: boolean;
  handlePopUpClose: () => void;
  title: string;
  showAlert: (message: string, success: boolean) => void;
  buttonTitle?: string;
}

export const MoveFileToAnotherPlaylistModal: FC<
  MoveFileToAnotherPlaylistModalProps
> = ({
  selectedFiles,
  oldPlaylist,
  handlePopUpClose,
  open,
  title,
  showAlert,
  buttonTitle = 'Mover Arquivos',
}) => {
  const { loggedUser } = useLoggedUser();
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const [comboBoxListResult, setComboBoxListResult] =
    useState<ComboBoxListResult | null>(null);

  const handleData = useCallback(
    async (data: ListPlaylistDto) => {
      try {
        const result = await ListPlaylistRequest({
          loggedUserId: data.loggedUserId,
          companyId: data.companyId,
          userInput: data.userInput,
          skip: data.skip,
          take: data.take,
        });
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

  const handleList = async (
    searchTerm: string,
    page: number,
    pageSize: number
  ) => {
    const result = await handleData({
      userInput: searchTerm,
      loggedUserId: loggedUser?.id ?? '',
      companyId: loggedUser?.selectedCompany.id ?? '',
      skip: (page - 1) * pageSize,
      take: pageSize,
    });
    return (
      result?.playlists.map((playlist) => {
        return {
          id: playlist.id,
          key: playlist.name,
        };
      }) ?? []
    );
  };

  const getResult = (item: ComboBoxListResult | null) => {
    setComboBoxListResult(item);
  };

  const moveFiles = async () => {
    try {
      await MoveFilesToAnotherPlaylistRequest({
        filesId: Object.keys(selectedFiles),
        loggedUserId: loggedUser?.id ?? '',
        oldPlaylistId: oldPlaylist,
        newPlaylistId: comboBoxListResult?.id ?? '',
      });

      showAlert('Arquivos movidos com sucesso', true);
      handlePopUpClose();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Move Files');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  return (
    <SimpleFormModal
      height={smDown ? theme.spacing(55) : theme.spacing(36)}
      width={smDown ? '90%' : theme.spacing(80)}
      open={open}
      handlePopUpClose={handlePopUpClose}
      title={title}
    >
      <Box>
        <SearchComboBox
          onList={handleList}
          onItemSelected={getResult}
          pageSize={6}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: theme.spacing(2),
        }}
      >
        <Button variant="contained" onClick={moveFiles}>
          {buttonTitle}
        </Button>
      </Box>
    </SimpleFormModal>
  );
};
