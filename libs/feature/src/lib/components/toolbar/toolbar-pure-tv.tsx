import { Stack } from '@mui/material';
import { useFileModal, useLoggedUser } from '../../contexts';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import GroupIcon from '@mui/icons-material/Group';
import { ListUnauthorizedUsersPopper } from '../popper';
import { FC, useCallback, useEffect, useState } from 'react';
import {
  useFindUnauthorizedUsersByCompanyIdData,
  useSnackbarAlert,
} from '../../hooks';
import { ToolbarButtom } from '../buttom';

interface ToolbarPureTVProps {
  uploadFileTitle?: string;
  listUserTitle?: string;
}

export const ToolbarPureTV: FC<ToolbarPureTVProps> = ({
  uploadFileTitle = 'Fazer Upload',
  listUserTitle = 'Autorizar Usuários',
}) => {
  const { loggedUser } = useLoggedUser();
  const [listUsersPopper, setListUsersPopper] = useState(false);
  const { handleOpen } = useFileModal();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { SnackbarAlert, showSnackbarAlert } = useSnackbarAlert();
  const [dataLoaded, setDataLoaded] = useState(false);
  const [moved, setMoved] = useState(false);

  const showAlert = useCallback(
    (message: string, success: boolean) => {
      showSnackbarAlert({
        message: message,
        severity: success ? 'success' : 'error',
      });
    },
    [showSnackbarAlert]
  );

  const handleMoveListUsers = (move: boolean) => {
    setMoved(move);
  };

  const { getUnauthorizedUsersByCompanyIdData, totalUsers } =
    useFindUnauthorizedUsersByCompanyIdData({
      showAlert,
      companyId: loggedUser?.selectedCompany?.id ?? '',
      loggedUserId: loggedUser?.id ?? '',
    });

  useEffect(() => {
    if (!loggedUser?.id) {
      setDataLoaded(false);
    }
  }, [loggedUser?.id]);

  useEffect(() => {
    if (loggedUser?.id && !dataLoaded) {
      getUnauthorizedUsersByCompanyIdData();
      setDataLoaded(true);
    }
  }, [loggedUser?.id, dataLoaded, getUnauthorizedUsersByCompanyIdData]);

  useEffect(() => {
    if (moved) {
      getUnauthorizedUsersByCompanyIdData();
      setMoved(false);
    }
  }, [moved, getUnauthorizedUsersByCompanyIdData]);

  const handleListUsersOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setListUsersPopper(!listUsersPopper);
  };

  return (
    <>
      <ListUnauthorizedUsersPopper
        id="list-unauthorized-users"
        open={listUsersPopper}
        anchorEl={anchorEl}
        showAlert={showAlert}
        onMove={handleMoveListUsers}
      />
      <Stack spacing={1} direction="row" sx={{ color: 'action.active' }}>
        <ToolbarButtom
          handleOpen={handleOpen}
          icon={<CloudUploadIcon fontSize="large" color="primary" />}
          title={uploadFileTitle}
        />

        {loggedUser?.type !== 'DEFAULT' && (
          <ToolbarButtom
            handleOpen={handleListUsersOpen}
            icon={<GroupIcon fontSize="large" color="primary" />}
            title={listUserTitle}
            badgeContent={totalUsers}
          />
        )}
      </Stack>
      {SnackbarAlert}
    </>
  );
};
