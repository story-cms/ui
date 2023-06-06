export interface AttachmentModel {
  url: string;
}

export type UploadFile = (
  file: File,
  onProgress: (percentage: number | undefined) => void,
) => Promise<AttachmentModel>;

export interface HostService {
  upload: UploadFile;
}

export interface Audio {
  url: string;
  length: number;
}
