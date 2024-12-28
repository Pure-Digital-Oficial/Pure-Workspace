import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Icon,
  IconButton,
  useTheme,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { LayoutBase } from '../../layout';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CrudType,
  DownloadContentFileDto,
  DownloadContentFileResponseDto,
  ErrorResponse,
  FileContentType,
  IconMenuItem,
} from '@pure-workspace/domain';
import {
  DownloadContentFileRequest,
  getItemLocalStorage,
} from '../../services';
import { useFileModal, useLoggedUser } from '../../contexts';
import {
  ContentFileCard,
  ContentFileModals,
  CreateDirectoryModal,
  EmptyListResponse,
  ListDirectory,
  ToolbarPureTV,
} from '../../components';
import axios, { AxiosError } from 'axios';
import { useListContentFilesData, useSnackbarAlert } from '../../hooks';
import { DownloadError } from '../../shared';
import { ValidationsError } from '../../shared/validations/utils';
import { ContainerCardList } from '../utils';

const onDownloadFile = async (input: DownloadContentFileResponseDto) => {
  try {
    const response = await fetch(input.url);
    if (!response.ok) {
      throw new Error('Failed to download file');
    }

    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = input.fileName;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    console.error('Erro ao baixar o arquivo:', error);
  }
};

export const ListContanteFilesContainer = () => {
  const [directoryId, setLocalDirectoryId] = useState('');
  const [createDirectoryPopUp, setCreateDirectoryPopUp] = useState(false);
  const [fileId, setFileId] = useState('');
  const [directoyPopUp, setDirectoryPopUp] = useState(false);
  const [popUpClosed, setPopUpClosed] = useState(false);
  const [openModal, setOpenModal] = useState({
    create: false,
    delete: false,
    edit: false,
    details: false,
    moveFile: false,
  });

  const theme = useTheme();
  const { loggedUser } = useLoggedUser();
  const { showSnackbarAlert, SnackbarAlert } = useSnackbarAlert();
  const { handleOpen, setDirectoryId, closed } = useFileModal();
  const hasLoadedUserData = useRef(false);

  const showAlert = useCallback(
    (message: string, success: boolean) => {
      showSnackbarAlert({
        message: message,
        severity: success ? 'success' : 'error',
      });
    },
    [showSnackbarAlert]
  );

  const { getListContentFilesData, listFiles, totalPage } =
    useListContentFilesData({
      showAlert,
      directoryId: directoryId,
      companyId: loggedUser?.selectedCompany.id ?? '',
      loggedUserId: loggedUser?.id ?? '',
    });

  useEffect(() => {
    if (closed && !popUpClosed) {
      const directoryId = getItemLocalStorage('di');
      if (directoryId) {
        getListContentFilesData('', directoryId);
        setLocalDirectoryId(directoryId);
        setPopUpClosed(true);
      }
    }
  }, [closed, getListContentFilesData, setLocalDirectoryId, popUpClosed]);

  const handlePopUpClose = async (type: FileContentType | 'add') => {
    setOpenModal((prev) => ({
      ...prev,
      [type]: false,
    }));
    getListContentFilesData();
  };

  const handlePopUpOpen = async (type: FileContentType, id?: string) => {
    setFileId(id ?? '');
    switch (type) {
      case 'create':
        setDirectoryId(directoryId);
        setPopUpClosed(false);
        handleOpen();
        break;
      case 'download':
        downloadFile(id ?? '');
        break;
      default:
        setOpenModal((prev) => ({
          ...prev,
          [type]: true,
        }));
        break;
    }
    getListContentFilesData();
  };

  const handleDirectoryPopUpOpen = (types: CrudType | 'changeDirectory') => {
    switch (types) {
      case 'create':
        setCreateDirectoryPopUp(true);
        break;
      case 'changeDirectory':
        setDirectoryPopUp(true);
        break;
    }
  };

  const handleDirectoryPopUpClose = (types: CrudType | 'changeDirectory') => {
    getListContentFilesData('', directoryId);
    switch (types) {
      case 'create':
        setCreateDirectoryPopUp(false);
        break;
      case 'changeDirectory':
        setDirectoryPopUp(false);
        break;
    }
  };

  const getDownloadFile = async (
    downloadContentFileDto: DownloadContentFileDto
  ) => {
    try {
      const result = await DownloadContentFileRequest(downloadContentFileDto);
      return result;
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        const errors = ValidationsError(axiosError, 'Download');
        if (errors) {
          showAlert(errors, false);
        }
      }
    }
  };

  const downloadFile = async (id: string) => {
    const dto: DownloadContentFileDto = {
      directoryId,
      idToDownload: id,
      loggedUserId: loggedUser?.id ?? '',
    };

    const url = await getDownloadFile(dto);

    if (url) {
      onDownloadFile(url);
    } else {
      showAlert(DownloadError('PT-BR'), true);
    }
  };

  const handleChange = async (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    getListContentFilesData('', directoryId, value);
  };

  const searchData = async (input: string) => {
    getListContentFilesData(input, directoryId);
  };

  useEffect(() => {
    if (!hasLoadedUserData.current) {
      const directoryId = getItemLocalStorage('di');
      if (directoryId) {
        getListContentFilesData('', directoryId);
        setLocalDirectoryId(directoryId);
      }
      hasLoadedUserData.current = true;
    }
  }, [getListContentFilesData, directoryId, setLocalDirectoryId, listFiles]);

  const rightClickMenuList: IconMenuItem[] = [
    {
      icon: <Icon>create_new_folder</Icon>,
      title: 'Novo Diretório',
      handleClick: async () => handleDirectoryPopUpOpen('create'),
    },
    {
      icon: <Icon>note_add</Icon>,
      title: 'Novo Arquivo',
      handleClick: async () => handlePopUpOpen('create'),
    },
  ];
  return (
    <>
      <ContentFileModals
        companyId={loggedUser?.selectedCompany.id ?? ''}
        directoryId={directoryId}
        handlePopUpClose={handlePopUpClose}
        loggedUserId={loggedUser?.id ?? ''}
        openModal={openModal}
        selectedId={fileId}
        showAlert={showAlert}
      />
      <CreateDirectoryModal
        open={createDirectoryPopUp}
        showAlert={showAlert}
        handlePopUpClose={() => handleDirectoryPopUpClose('create')}
        title="Criar Diretório"
      />
      <Dialog
        open={directoyPopUp}
        onClose={() => handleDirectoryPopUpClose('changeDirectory')}
      >
        <DialogTitle>
          Selecione um Diretório
          <IconButton
            aria-label="close"
            onClick={() => handleDirectoryPopUpClose('changeDirectory')}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Icon>close_icon</Icon>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <ListDirectory getDataInput={getListContentFilesData} />
        </DialogContent>
      </Dialog>
      <LayoutBase
        title="Listagem de Arquivos"
        iconMenuItemList={rightClickMenuList}
        toolBar={<ToolbarPureTV />}
      >
        <ContainerCardList
          search={{
            searchData: searchData,
            placeholder: 'Pesquisar Arquivo',
            createPopUp: () => handlePopUpOpen('create'),
          }}
          totalPage={totalPage}
          handleChange={handleChange}
          mobileBackButtom
          // changeDirectory
          handleDirectoryPopUpOpen={() =>
            handleDirectoryPopUpOpen('changeDirectory')
          }
        >
          {listFiles.length > 0 ? (
            <Grid justifyContent="center" container spacing={2}>
              {listFiles.map((file, index) => (
                <Grid item md={6} lg={4} xl={3} key={index}>
                  <ContentFileCard
                    deleteFile={() => handlePopUpOpen('delete', file.id)}
                    detailsFile={() => handlePopUpOpen('details', file.id)}
                    downloadFile={() => handlePopUpOpen('download', file.id)}
                    moveFile={() => handlePopUpOpen('moveFile', file.id)}
                    fileImage={
                      !file.format.startsWith('video/')
                        ? file.path ?? ''
                        : file.thumbnail ?? ''
                    }
                    fileImageName={file.originalName}
                    name={file.originalName}
                    key={file.id}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <EmptyListResponse
              message="Sem Arquivos"
              icon={
                <AttachFileIcon
                  sx={{
                    fontSize: theme.spacing(10),
                  }}
                />
              }
            />
          )}
        </ContainerCardList>
      </LayoutBase>
      {SnackbarAlert}
    </>
  );
};
