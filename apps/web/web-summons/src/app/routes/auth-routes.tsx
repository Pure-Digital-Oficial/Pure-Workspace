import { CreateUser, LoginContainer } from '@pure-workspace/feature';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AuthRouters = () => {
  return (
    <Routes>
      <Route
        path="/register"
        element={
          <CreateUser
            cardImage="/assets/svg/create-user.svg"
            logo="/assets/png/summons-image.png"
          />
        }
      />

      <Route
        path="/login"
        element={
          <LoginContainer
            cardImage="/assets/svg/login-image.svg"
            logo="/assets/png/summons-image.png"
          />
        }
      />
    </Routes>
  );
};
