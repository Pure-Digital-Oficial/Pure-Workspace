import {
  Box,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useEffect, FC, useRef } from 'react';
import { PostCard } from '../item';
import { useListPostsData } from '../../../hooks';
import { useAppIdContext } from '../../../contexts';
import { CarouselButton } from '../../buttom';

interface ListPostsProps {
  imageContent?: number;
  manualButton?: boolean;
  title?: string;
  emptyTitle?: string;
  showAlert: (message: string, success: boolean) => void;
}

export const ListPosts: FC<ListPostsProps> = ({
  showAlert,
  imageContent = 6,
  manualButton = true,
  title = 'Últimas Postagens',
  emptyTitle = 'Nenhuma postagem disponível.',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const { appId } = useAppIdContext();
  const hasLoadedUserData = useRef(false);

  const theme = useTheme();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery(theme.breakpoints.down('md'));
  const lgDown = useMediaQuery(theme.breakpoints.down('lg'));

  const { listPosts, getListPostsData, totalPage } = useListPostsData({
    showAlert,
    appId,
  });

  const visiblePostsCount = smDown ? 1 : lgDown ? 2 : Math.min(imageContent, 3);

  useEffect(() => {
    if (!hasLoadedUserData.current) {
      getListPostsData();
      hasLoadedUserData.current = true;
    }
  }, [getListPostsData]);

  const handleNext = () => {
    if (animating) return;

    setAnimating(true);
    setCurrentIndex(
      (prevIndex) => (prevIndex + visiblePostsCount) % listPosts.length
    );

    setTimeout(() => setAnimating(false), 500);
  };

  const handlePrevious = () => {
    if (animating) return;

    setAnimating(true);
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - visiblePostsCount + listPosts.length) % listPosts.length
    );

    setTimeout(() => setAnimating(false), 500);
  };

  const getVisiblePosts = () => {
    const visibleCount = Math.min(visiblePostsCount, listPosts.length);

    return Array.from({ length: visibleCount }).map((_, index) => {
      const postIndex = (currentIndex + index) % listPosts.length;
      return listPosts[postIndex];
    });
  };

  if (listPosts.length === 0) {
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
        maxWidth: lgDown ? '100%' : 1300,
        margin: 'auto',
        overflow: 'hidden',
        padding: 0,
      }}
    >
      <Box
        component="header"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: theme.spacing(2),
          marginBottom: smDown ? 'auto' : theme.spacing(6),
        }}
      >
        <Typography
          variant={smDown ? 'h6' : 'h5'}
          sx={{
            fontWeight: 700,
            maxWidth: theme.spacing(50),
            fontSize: theme.spacing(5),
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
        }}
      >
        {manualButton && (
          <CarouselButton
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            itemsListCount={listPosts.length}
          />
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: mdDown ? 'center' : 'space-between',
          overflow: 'hidden',
          transition: 'transform 0.5s ease',
        }}
      >
        {getVisiblePosts().map((post, index) => (
          <Box
            key={`${post.id}-${index}`}
            sx={{
              flex: `0 0 calc(100% / ${visiblePostsCount})`,
              boxSizing: 'border-box',
              padding: mdDown ? 0 : theme.spacing(1),
            }}
          >
            <PostCard
              title={post.title}
              description={post.description}
              image={post.coverImage}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};
