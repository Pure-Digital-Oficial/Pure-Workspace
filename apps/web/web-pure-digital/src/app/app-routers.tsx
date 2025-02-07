import TaskAltIcon from '@mui/icons-material/TaskAlt';
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
            hero={{
              image: '/assets/images/MenHeroSection.svg',
              title:
                'Impulsione suas vendas com landing pages que convertem! Criamos páginas otimizadas para capturar leads e aumentar suas ofertas.',
              subTitle:
                'Landing pages personalizadas e focadas em resultados para fazer seu negócio crescer.',
              backgroundColor:
                'linear-gradient(35deg, #040405 21%, #040406, #0c0c0f, #101015, #111116, #050506, #060607, #060608)',
            }}
            detailsFeature={{
              detailsFeatureImage: '/assets/images/Product.svg',
              detailsFeatureTitle:
                'Landing Pages que geram resultados concretos e impulsionam suas vendas!',
              listFeatures: [
                {
                  icon: <TaskAltIcon sx={{ color: '#9c1b1f' }} />,
                  title:
                    'Landing Pages otimizadas para transformar visitantes em clientes e aumentar sua taxa de conversão.',
                },
                {
                  icon: <TaskAltIcon sx={{ color: '#9c1b1f' }} />,
                  title: 'Páginas personalizadas e pensadas para o seu nicho.',
                },
                {
                  icon: <TaskAltIcon sx={{ color: '#9c1b1f' }} />,
                  title:
                    'Design focado na experiência do usuário, garantindo mais engajamento e resultados.',
                },
              ],
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
