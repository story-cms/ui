import { useSecretStore } from '../../store';
import { HostService, AttachmentModel } from './types';
import { FieldSpec } from '../../Shared/interfaces';
import { S3Client, CompleteMultipartUploadCommandOutput } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';

export default class S3Service implements HostService {
  private field: FieldSpec;

  constructor(field: FieldSpec) {
    this.field = field;
  }

  upload = async (
    file: File,
    // eslint-disable-next-line no-unused-vars
    onProgress: (progress: number | undefined) => void,
  ): Promise<AttachmentModel> => {
    if (!this.field?.provider) {
      console.log(`No hosting provider specified for field ${this.field?.name}`);
      return { url: '' };
    }
    const secrets = useSecretStore();

    const client = new S3Client({
      region: secrets.s3Region,
      endpoint: secrets.s3Endpoint,
      credentials: {
        accessKeyId: secrets.s3AccessKeyId,
        secretAccessKey: secrets.s3SecretAccessKey,
      },
    });

    const params = {
      Bucket: secrets.s3Bucket,
      Key: file.name,
      Body: file,
      ContentType: file.type,
      ACL: 'public-read',
    };

    try {
      const upload = new Upload({
        client,
        params,
        queueSize: 4,
        partSize: 1024 * 1024 * 5,
      });

      upload.on('httpUploadProgress', ({ loaded, total }) => {
        onProgress((loaded ?? 0) / (total ?? 1));
      });

      const response = (await upload.done()) as CompleteMultipartUploadCommandOutput;

      const url = response?.Location as string;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return { url: 'https://' + url };
      }
      return { url };
    } catch (error) {
      console.error(error);
    } finally {
      if (client) {
        client.destroy();
      }
    }
    return { url: '' };
  };
}
