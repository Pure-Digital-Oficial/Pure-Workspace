import {
  ProtectedRoute,
  PureDigitalHomeContainer,
  useDrawerContext,
  scrollTo,
  navigateToUrl,
} from '@pure-workspace/feature';
import { useEffect, useRef } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const AppRouters = () => {
  const { setDrawerOptions } = useDrawerContext();
  const hasLoadedUserData = useRef(false);

  useEffect(() => {
    if (!hasLoadedUserData.current) {
      setDrawerOptions({
        Inicio: [{ label: 'Inicio', icon: 'home', path: 'home' }],
        About: [{ label: 'Sobre nós', icon: 'badge', path: 'about-section' }],
        Posts: [
          {
            label: 'Postagens',
            icon: 'markunread_mailbox',
            path: 'posts-section',
          },
        ],
        Contact: [
          {
            label: 'Contato',
            icon: 'phone_callback',
            path: 'contact-us-section',
          },
        ],
      });
      hasLoadedUserData.current = true;
    }
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <PureDigitalHomeContainer
            header={{
              headerListButtons: [
                {
                  title: 'Inicio',
                  to: () => scrollTo('home'),
                },
                {
                  title: 'Sobre nós',
                  to: () => scrollTo('about-section'),
                },
                {
                  title: 'Nossos trabalhos',
                  to: () => {
                    console.log(
                      'Voce clicou no Nossos trabalho, estou cansado chefe'
                    );
                  },
                },
              ],
            }}
            company={{
              companyLogo: '/assets/images/logos/PdLogo.svg',
            }}
            cta={{
              ctaButton: () =>
                navigateToUrl(
                  'https://wa.me/44998494865?text=Olá estou interessado em saber mais sobre os planos da Pure Digital, Poderia me ajudar?'
                ),
            }}
          />
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <div>A Criar</div>
          </ProtectedRoute>
        }
      />

      <Route path="/login" element={<div>tela de login</div>} />

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
