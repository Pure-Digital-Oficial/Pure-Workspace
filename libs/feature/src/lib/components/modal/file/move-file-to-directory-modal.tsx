import {
  Box,
  Button,
  Fade,
  IconButton,
  MenuItem,
  Modal,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { FC, useEffect, useState } from 'react';
import {
  ErrorResponse,
  ListDirectoryNameResponseDto,
} from '@pure-workspace/domain';
import {
  ListContentFilesRequest,
  ListDirectoryRequest,
  MoveFileToDirectoryRequest,
} from '../../../services';
import axios, { AxiosError } from 'axios';
import { ValidationsError } from '../../../shared';

interface MoveFileToDirectoryModalProps {
  open: boolean;
  onClose: () => void;
  showAlert: (message: string, success: boolean) => void;
  idToMove: string;
  loggedUserId: string;
  companyId: string;
  title: string;
  buttonTitle: string;
  fieldLabel?: string;
  successMessage?: string;
  moveAllFiles?: boolean;
}

export const MoveFileToDirectoryModal: FC<MoveFileToDirectoryModalProps> = ({
  open,
  onClose,
  showAlert,
  idToMove,
  loggedUserId,
  companyId,
  title,
  buttonTitle,
  fieldLabel = 'Diretório',
  successMessage = 'Arquivo Movido com Sucesso!',
  moveAllFiles = false,
}) => {
  const [directoryList, setDirectoryList] = useState<
    ListDirectoryNameResponseDto[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await ListDirectoryRequest({
          userInput: '',
          loggedUserId,
          companyId,
        });
        if (moveAllFiles) {
          result.directories = result.directories.filter(
            (directory) => directory.id !== idToMove
          );
        }
        setDirectoryList(result.directories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [idToMove, loggedUserId]);

  const [selectedDirectoryId, setSelectedDirectoryId] = useState<string>('');

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const handleMoveFileData = async () => {
    try {
      if (moveAllFiles) {
        await handleMoveAllFilesData();
        showAlert(successMessage, true);
        onClose();
        return;
      }
      await MoveFileToDirectoryRequest({
        idToMove,
        idToMoveDirectory: selectedDirectoryId,
        loggedUserId,
      });
      showAlert(successMessage, true);
      onClose();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'arquivo ou diretório');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const handleMoveAllFilesData = async () => {
    try {
      let filesInDirectory = await ListContentFilesRequest({
        userInput: '',
        loggedUserId,
        companyId,
        directoryId: idToMove,
      });

      while (filesInDirectory.files.length > 0) {
        const moveFilePromises = filesInDirectory.files.map((file) =>
          MoveFileToDirectoryRequest({
            idToMove: file.id,
            idToMoveDirectory: selectedDirectoryId,
            loggedUserId,
          })
        );

        await Promise.all(moveFilePromises);

        filesInDirectory = await ListContentFilesRequest({
          userInput: '',
          loggedUserId,
          companyId,
          directoryId: idToMove,
        });
      }
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'arquivo ou diretório');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };
  const handleChangeMoveFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDirectoryId(event.target.value);
  };

  return (
    <Modal open={open} onClose={onClose} closeAfterTransition>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            height: theme.spacing(35),
            width: smDown ? '95%' : theme.spacing(50),
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100%',
            }}
            component="form"
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 2,
                p: 2,
                borderRadius: 1,
              }}
            >
              <Typography
                marginRight={theme.spacing(10)}
                noWrap
                textOverflow="ellipsis"
                overflow="hidden"
                variant="h5"
              >
                <strong>{title}</strong>
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '80%',
                width: '100%',
              }}
            >
              <TextField
                fullWidth
                select
                label={fieldLabel}
                value={selectedDirectoryId}
                id="id"
                onChange={handleChangeMoveFile}
              >
                {directoryList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Box
              sx={{
                marginTop: 'auto',
              }}
            >
              <Button onClick={handleMoveFileData} variant="contained">
                {buttonTitle}
              </Button>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};
