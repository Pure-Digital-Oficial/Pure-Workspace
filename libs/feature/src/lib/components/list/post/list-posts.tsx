import { Box } from '@mui/material';
import { PostResponseDto } from '@pure-workspace/domain';
import { useEffect, useState } from 'react';
import { PostCard } from '../item';

export const ListPosts = () => {
  const [posts, setPosts] = useState<PostResponseDto[]>();
  useEffect(() => {
    setPosts([
      {
        content: 'test content',
        createdAt: new Date(),
        createdBy: 'teste createdBy',
        description: 'test description',
        id: 'test id',
        status: 'ACTIVE',
        subTitle: 'test subTitle',
        title: 'test title',
        updatedAt: new Date(),
        updatedBy: 'test updatedBy',
      },
    ]);
  }, []);
  return (
    <Box>
      {posts &&
        posts.map((post) => (
          <PostCard
            title={post.title}
            description={post.description}
            image={'/assets/images/Apol_Logo.svg'}
          />
        ))}
    </Box>
  );
};
