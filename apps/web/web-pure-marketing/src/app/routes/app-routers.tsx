import { Navigate, Route, Routes } from 'react-router-dom';
import { PreRegistrationContainer } from '@pure-workspace/feature';

export const AppRouters = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PreRegistrationContainer
            title="Nos Conte Sobre Sua Empresa e Objetivos"
            phone="44998494865"
          />
        }
      />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
