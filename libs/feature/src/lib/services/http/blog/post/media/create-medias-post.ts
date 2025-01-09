import { MediaPostDto } from '@pure-workspace/domain';
import { pureBlogApi } from '../../../axios-config';

export async function CreateMediasPostRequest(
  data: MediaPostDto,
  onUploadProgress: (progress: number) => void
) {
  const formData = new FormData();

  let totalSize = 0;
  data.files.forEach((file) => {
    formData.append('files', file);
    totalSize += file.size;
  });

  let totalLoaded = 0;

  const response = await pureBlogApi.post('/create-medias-posts', formData, {
    params: {
      loggedUserId: data.loggedUserId,
      postId: data.postId,
    },
    onUploadProgress: (progressEvent) => {
      if (progressEvent) {
        totalLoaded = progressEvent.loaded;
        const progress = Math.round((totalLoaded * 100) / totalSize);
        onUploadProgress(progress);
      }
    },
  });
  return response.data;
}
