import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect, FC, useCallback } from 'react';
import { PostCard } from '../item';

interface Post {
  id: string;
  title: string;
  description: string;
  image: string;
}

interface ListPostsProps {
  imageContent?: number;
  manualButton?: boolean;
  title?: string;
  emptyTitle?: string;
}

export const ListPosts: FC<ListPostsProps> = ({
  imageContent = 6,
  manualButton = true,
  title = 'Últimas Postagens',
  emptyTitle = 'Nenhuma postagem disponível.',
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const visiblePostsCount = Math.max(
    smDown ? 1 : lgDown ? 2 : Math.min(imageContent, posts.length),
    1
  );

  const getVisiblePost = (index: number) =>
    posts.length > 0 ? posts[index % posts.length] : undefined;

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  }, [posts.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  }, [posts.length]);

  useEffect(() => {
    // Simulação de dados
    setPosts([
      {
        id: '1',
        title: 'Post 1',
        description: 'Descrição do post 1',
        image: '/assets/images/Apol_Logo.svg',
      },
      {
        id: '2',
        title: 'Post 2',
        description: 'Descrição do post 2',
        image: '/assets/images/Apol_Logo.svg',
      },
      {
        id: '3',
        title: 'Post 3',
        description: 'Descrição do post 3',
        image: '/assets/images/Apol_Logo.svg',
      },
      {
        id: '4',
        title: 'Post 4',
        description: 'Descrição do post 4',
        image: '/assets/images/Apol_Logo.svg',
      },
      {
        id: '5',
        title: 'Post 5',
        description: 'Descrição do post 5',
        image: '/assets/images/Apol_Logo.svg',
      },
      {
        id: '6',
        title: 'Post 6',
        description: 'Descrição do post 6',
        image: '/assets/images/Apol_Logo.svg',
      },
    ]);
  }, []);

  if (posts.length === 0) {
    return (
      <Typography
        variant="h6"
        sx={{
          textAlign: 'center',
          margin: theme.spacing(4, 0),
        }}
      >
        {emptyTitle}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        position: 'relative',
        width: smDown ? '100%' : '90%',
        maxWidth: lgDown ? '98%' : 1300,
        margin: 'auto',
        overflow: 'hidden',
        padding: 0,
        height: 'auto',
      }}
    >
      <Box
        component="header"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingBottom: theme.spacing(2),
          marginBottom: smDown ? 'auto' : theme.spacing(6),
        }}
      >
        <Typography
          variant={smDown ? 'h6' : 'h5'}
          sx={{
            fontWeight: smDown ? 700 : 900,
            maxWidth: theme.spacing(50),
            fontSize: smDown ? theme.spacing(2.2) : 'auto',
          }}
        >
          {title}
        </Typography>

        {manualButton && (
          <Box component="nav" aria-label="carousel navigation">
            <IconButton onClick={handlePrevious} aria-label="Anterior">
              <ArrowBackIosNewIcon
                sx={{ height: theme.spacing(3), width: theme.spacing(3) }}
              />
            </IconButton>

            <IconButton onClick={handleNext} aria-label="Próximo">
              <ArrowForwardIosIcon
                sx={{ height: theme.spacing(3), width: theme.spacing(3) }}
              />
            </IconButton>
          </Box>
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          transition: 'transform 0.5s ease',
          transform: `translateX(-${
            (currentIndex % posts.length) * (100 / visiblePostsCount)
          }%)`,
        }}
      >
        {Array.from({ length: visiblePostsCount }).map((_, index) => {
          const postIndex = (currentIndex + index) % posts.length;
          const post = getVisiblePost(postIndex);

          return (
            <Box
              key={`${post?.id}-${index}`}
              sx={{
                flex: `0 0 calc(100% / ${visiblePostsCount})`,
                boxSizing: 'border-box',
              }}
            >
              {post && (
                <PostCard
                  title={post.title}
                  description={post.description}
                  image={post.image}
                />
              )}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
