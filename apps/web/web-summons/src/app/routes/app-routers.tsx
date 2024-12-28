import { Navigate, Route, Routes } from 'react-router-dom';
import {
  ListUserContainer,
  TestContainer,
  useDrawerContext,
} from '@pure-workspace/feature';
import { useEffect } from 'react';

export const AppRouters = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions({
      'Página Inicial': [
        {
          label: 'Página Inicial',
          icon: 'home',
          path: '/home',
        },
      ],
    });
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route path="/home" element={<TestContainer />} />
      <Route path="list-user" element={<ListUserContainer />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
