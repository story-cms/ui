import { useSecretStore } from '../../store';
import { HostService, AttachmentModel } from './types';
import { FieldSpec } from '../../Shared/interfaces';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export default class S3Service implements HostService {
  private field: FieldSpec;
  private endpoint: string;

  constructor(field: FieldSpec, endpoint: string) {
    this.field = field;
    this.endpoint = endpoint;
  }

  upload = async (
    file: File,
    // eslint-disable-next-line no-unused-vars
    onProgress: (progress: number | undefined) => void,
  ): Promise<AttachmentModel> => {
    console.log('uploading to s3');

    if (!this.field?.provider) {
      console.log(`No hosting provider specified for field ${this.field?.name}`);
      return { url: '' };
    }
    const secrets = useSecretStore();

    // const formData = new FormData();
    // formData.append('file', file);

    const client = new S3Client({
      endpoint: 'https://ams3.digitaloceanspaces.com',
      credentials: {
        accessKeyId: secrets.doAccessKeyId,
        secretAccessKey: secrets.doSecretAccessKey,
      },
      region: 'ams3',
    });

    const command = new PutObjectCommand({
      Bucket: secrets.doBucket,
      Key: file.name,
      Body: file,
    });

    try {
      const response = await client.send(command);
      console.log(response);
      return { url: `https://cmsplayground.ams3.digitaloceanspaces.com/${file.name}` };
    } catch (err) {
      console.error(err);
    }

    // const requestObj: AxiosRequestConfig = {
    //   url: `https://cmsplayground.ams3.digitaloceanspaces.com/${file.name}`,
    //   method: 'PUT',
    //   onUploadProgress: (progress) => onProgress(progress.progress),
    //   data: formData,
    //   headers: {
    //     Authorization: `Bearer ${secrets.doOauthToken}`,
    //     Origin: 'http://localhost:6006',
    //   },
    // };
    // const { default: axios } = await import('axios');
    // try {
    //   const response = await axios(requestObj);
    //   console.log(response.data);
    //   return { url: `https://cmsplayground.ams3.digitaloceanspaces.com/${file.name}` };
    // } catch (error) {
    //   console.log(error);
    // }

    return { url: '' };
  };
}
