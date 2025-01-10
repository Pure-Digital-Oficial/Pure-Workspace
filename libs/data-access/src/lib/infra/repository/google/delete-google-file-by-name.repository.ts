import { Storage } from '@google-cloud/storage';
import { DeleteFileByNameRepository } from '@pure-workspace/domain';

export class DeleteGoogleFileByNameRepositoryImpl
  implements DeleteFileByNameRepository
{
  async delete(name: string): Promise<void> {
    const credentials = JSON.parse(
      process.env['NX_PUBLIC_CLOUD_CREDENTIALS'] || '{}'
    );
    const storage = new Storage({ credentials });

    await storage
      .bucket(process.env['NX_PUBLIC_STORAGE_BUCKET'] ?? '')
      .file(name)
      .delete();
  }
}
