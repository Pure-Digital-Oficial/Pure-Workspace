import ffmpeg from 'fluent-ffmpeg';
import ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { PassThrough } from 'stream';
import {
  GenerateThumbnailDto,
  GenerateThumbnailRepository,
} from '@pure-workspace/domain';

export class GenerateThumbnailRepositoryImpl
  implements GenerateThumbnailRepository
{
  async generate(input: GenerateThumbnailDto): Promise<Buffer> {
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);

    return new Promise((resolve, reject) => {
      const thumbnailStream = new PassThrough();
      const buffers: Buffer[] = [];

      thumbnailStream.on('data', (chunk) => buffers.push(chunk));
      thumbnailStream.on('end', () => resolve(Buffer.concat(buffers)));
      thumbnailStream.on('error', (err) => reject(err));

      ffmpeg(input.file)
        .outputOptions(['-vf', 'thumbnail', '-frames:v 1'])
        .outputFormat('image2')
        .on('end', () => thumbnailStream.end())
        .on('error', (err) => reject(err))
        .pipe(thumbnailStream, { end: true });
    });
  }
}
