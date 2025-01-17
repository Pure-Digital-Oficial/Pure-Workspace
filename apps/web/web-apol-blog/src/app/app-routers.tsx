import { Box } from '@mui/material';
import {
  ApolHomeContainer,
  ProtectedRoute,
  scrollTo,
  useDrawerContext,
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
      });
      hasLoadedUserData.current = true;
    }
  }, [setDrawerOptions]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <ApolHomeContainer
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
                  title: 'Notícias',
                  to: () => {
                    console.log(
                      'Voce clicou no Nossos trabalho, estou cansado chefe'
                    );
                  },
                },
                {
                  title: 'Contato',
                  to: () => {
                    console.log(
                      'Voce clicou no Nossos trabalho, estou cansado chefe'
                    );
                  },
                },
              ],
            }}
            company={{
              companyLogo: '/assets/images/Apol_Logo.svg',
            }}
            hero={{
              image: '/assets/images/Hero_Image.svg',
              title: 'Bem-vindo ao Futuro do Agronegócio em Londrina!',
              backgroundImage: '/assets/images/Hero_Background.svg',
              subTitle:
                'Unimos produtores, inovação e sustentabilidade para transformar o campoem um verdadeiro motor de progresso.',
            }}
            about={{
              aboutCtaButton: () => scrollTo('contact'),
              aboutTitle: 'Quem Somos',
              aboutDescription:
                'A Associação dos Produtores de Londrina é uma iniciativa que une esforços para fortalecer o agronegócio da região. Trabalhamos para oferecer suporte aos produtores, compartilhar conhecimento e promover iniciativas que transformam o campo em um lugar de oportunidades.',
              aboutImage: '/assets/images/About_Image.svg',
              aboutCtaButtonTitle: 'Entre em Contato',
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
