import { useAuth } from '../../hooks';
import { NotificationCardComponent } from '../../components';
import { useNavigate } from 'react-router-dom';

export const ProtectedLayout = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const redirectLogin = () => {
    navigate('/login');
  };

  if (!auth.email) {
    return (
      <NotificationCardComponent
        title="Você não tem acesso a esta página"
        buttonText="Fazer Login"
        imageUrl="/assets/svg/denied-access.svg"
        onClick={redirectLogin}
      />
    );
  }

  return children;
};
