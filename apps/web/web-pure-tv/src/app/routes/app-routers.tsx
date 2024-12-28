import { Navigate, Route, Routes } from 'react-router-dom';
import {
  ListUserContainer,
  TestContainer,
  ListContanteFilesContainer,
  ListPlaylistContainer,
  ListPlaylistCategoryContainer,
  ListDirectoryContainer,
  ListSchedulesContainer,
  ListDeviceContainer,
  ListCompanyContainer,
  UnauthorizedUserContainer,
  useLoggedUser,
  useLoadUserPureTvData,
  useLoading,
  ListAllCompaniesContainer,
} from '@pure-workspace/feature';
import { useEffect, useRef } from 'react';

export const AppRouters = () => {
  const { loggedUser } = useLoggedUser();
  const loadedData = useLoadUserPureTvData();
  const hasLoadedUserData = useRef(false);
  const { setLoading } = useLoading();

  useEffect(() => {
    if (loggedUser?.status && !hasLoadedUserData.current) {
      setLoading(true);
      if (loggedUser?.status) {
        loadedData();
        hasLoadedUserData.current = true;
      }
    }
  }, [loggedUser?.status, loadedData, setLoading]);

  return (
    <Routes>
      <Route path="/" element={<TestContainer />} />
      <Route path="/auth/user" element={<ListUserContainer />} />
      <Route path="/files" element={<ListContanteFilesContainer />} />
      <Route path="/directory" element={<ListDirectoryContainer />} />
      <Route path="playlist" element={<ListPlaylistContainer />} />
      <Route
        path="playlist-category"
        element={<ListPlaylistCategoryContainer />}
      />
      <Route path="scheduling" element={<ListSchedulesContainer />} />
      <Route path="device" element={<ListDeviceContainer />} />
      <Route path="company" element={<ListCompanyContainer />} />
      <Route path="/auth/company" element={<ListAllCompaniesContainer />} />
      <Route
        path="unauthorized-access"
        element={<UnauthorizedUserContainer />}
      />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
