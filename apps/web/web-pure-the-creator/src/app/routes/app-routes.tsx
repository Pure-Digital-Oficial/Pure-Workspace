import {
  ListAllCompaniesContainer,
  ListProductContainer,
  ListUserContainer,
  TestContainer,
  TheCreatorHomeContainer,
  useLoading,
  useLoadUserPureTheCreatorData,
  useLoggedUser,
} from '@pure-workspace/feature';
import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';

export const AppRouters = () => {
  const { loggedUser } = useLoggedUser();
  const loadedData = useLoadUserPureTheCreatorData();
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
      <Route path="/" element={<TheCreatorHomeContainer />} />
      <Route path="/auth/user" element={<ListUserContainer toolbar={null} />} />
      <Route
        path="/auth/company"
        element={<ListAllCompaniesContainer toolbar={null} />}
      />
      <Route path="product" element={<ListProductContainer />} />
    </Routes>
  );
};
