import {
  Box,
  Button,
  Card,
  CardActions,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { LayoutBase } from '../../layout';
import { FilesUpload } from '../../components';
import {
  CreateContenVideoRequest,
  getItemLocalStorage,
  removeItemLocalStorage,
} from '../../services';
import { useLoggedUser } from '../../contexts';
import { useCallback, useState } from 'react';
import {
  ErrorResponse,
  FileConfigs,
  FileWithProgress,
} from '@pure-workspace/domain';
import { useSnackbarAlert } from '../../hooks';
import axios, { AxiosError } from 'axios';
import {
  ConnectionError,
  EntityNotAllowed,
  EntityNotCreated,
  EntityNotEmpty,
} from '../../shared';

export const FilesContainer = () => {
  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const { loggedUser } = useLoggedUser();
  const { showSnackbarAlert, SnackbarAlert } = useSnackbarAlert();
  const [filesToUpload, setFilesToUpload] = useState<FileWithProgress[]>([]);
  const [progress, setProgress] = useState<number>(0);

  const handleFileUpload = (files: FileWithProgress[]) => {
    setFilesToUpload((prevFiles) => {
      const newFiles = files.filter(
        (file) =>
          !prevFiles.some((prevFile) => prevFile.file.name === file.file.name)
      );
      const updatedFiles = [...prevFiles, ...newFiles];

      return updatedFiles;
    });
  };

  const handleFileToDelete = (fileToRemove: string) => {
    setFilesToUpload((prevFiles) => {
      const updatedFiles = prevFiles.filter(
        (file) => file.file.name !== fileToRemove
      );
      return updatedFiles;
    });
  };

  const updateProgress = useCallback((progress: number) => {
    setProgress(progress);
  }, []);

  const onFinish = async (
    data: FileConfigs,
    updateProgress: (progress: number) => void
  ) => {
    try {
      const result = await CreateContenVideoRequest(data, updateProgress);
      setFilesToUpload([]);
      removeItemLocalStorage('files');

      return result;
    } catch (error) {
      console.error(error);
      console.error((error as { message: string }).message);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        switch (axiosError.response?.data.error.name) {
          case 'EntityNotEmpty':
            showErrorAlert(EntityNotEmpty('Arquivos', 'PT-BR'));
            break;

          case 'EntityNotCreated':
            showErrorAlert(EntityNotCreated('Arquivos', 'PT-BR'));
            break;

          case 'FileNotAllowed':
            showErrorAlert(EntityNotAllowed('Arquivos', 'PT-BR'));
            break;

          default:
            showErrorAlert(ConnectionError('PT-BR'));
            break;
        }
      }
    }
  };

  const showErrorAlert = (message: string) => {
    showSnackbarAlert({
      message: message,
      severity: 'error',
    });
  };

  const uploadFiles = useCallback(async () => {
    const loggedUserId = loggedUser?.id ?? '';
    const directoryId = getItemLocalStorage('di');

    const result = await onFinish(
      {
        directoryId: directoryId,
        loggedUserId: loggedUserId,
        filesToUpload: filesToUpload,
      },
      updateProgress
    );
    if (result) {
      showSnackbarAlert({
        message: 'Arquivos Salvos com sucesso',
        severity: 'success',
      });
    }
  }, [onFinish]);

  const handleUploadClick = () => {
    uploadFiles();
  };

  return (
    <>
      <LayoutBase title="Arquivos">
        <Box display="flex" justifyContent="center">
          <Card
            component="span"
            sx={{
              height: theme.spacing(65),
              width: smDown
                ? theme.spacing(45)
                : mdDown
                ? theme.spacing(65)
                : theme.spacing(100),
            }}
          >
            <FilesUpload
              onFileDelete={handleFileToDelete}
              progress={progress}
              onFileUpload={handleFileUpload}
              width={
                smDown
                  ? theme.spacing(45)
                  : mdDown
                  ? theme.spacing(65)
                  : theme.spacing(100)
              }
              height={theme.spacing(28)}
            />
            <CardActions disableSpacing>
              <Box sx={{ flexGrow: 1 }} />
              <Button onClick={handleUploadClick} variant="contained">
                Enviar
              </Button>
            </CardActions>
          </Card>
        </Box>
      </LayoutBase>
      {SnackbarAlert}
    </>
  );
};
