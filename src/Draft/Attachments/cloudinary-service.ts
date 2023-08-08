import type { AxiosRequestConfig } from 'axios';
import { useSecretStore, useWidgetsStore } from '../../store';
import { HostService, AttachmentModel } from './types';
import { FieldSpec } from '../../Shared/interfaces';

const timestamp = Math.round(new Date().getTime() / 1000);

export default class CloudinaryService implements HostService {
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
    const provider = useWidgetsStore().imageProvider();

    if (!provider.cloudName || !provider.defaultPreset) {
      console.log(`Check your env for CLOUDINARY_CLOUD_NAME and CLOUDINARY_PRESET`);
      return { url: '' };
    }

    const { default: axios } = await import('axios');

    const uploadPreset = this.field.uploadPreset ?? provider.defaultPreset ?? '';
    const secrets = useSecretStore();
    const secretToSign =
      'tags=browser-upload&timestamp=' +
      timestamp +
      '&upload_preset=' +
      uploadPreset +
      secrets.cloudinarySecret;
    const buffer = new TextEncoder().encode(secretToSign);
    const sha = await crypto.subtle.digest('SHA-1', buffer);
    const encryptedSecret = Array.from(new Uint8Array(sha))
      .map((x) => x.toString(16).padStart(2, '0'))
      .join('');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('tags', 'browser-upload');
    formData.append('api_key', secrets.cloudinaryApiKey);
    formData.append('api_secret', secrets.cloudinarySecret);
    formData.append('timestamp', timestamp.toString());
    formData.append('signature', encryptedSecret);
    if (this.endpoint.includes('raw')) {
      formData.append('resource_type', 'raw');
    }

    const requestObj: AxiosRequestConfig = {
      url: 'https://api.cloudinary.com/v1_1/' + provider.cloudName + this.endpoint,
      method: 'POST',
      onUploadProgress: (progress) => onProgress(progress.progress),
      data: formData,
    };

    try {
      const response = await axios(requestObj);
      return { url: response.data.secure_url };
    } catch (error) {
      console.log(error);
    }

    return { url: '' };
  };
}
