import cloudinary, {
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

/**
 * Uploads a file to Cloudinary.
 *
 * @param file - The path to the file to be uploaded.
 * @param public_id - The desired public ID for the uploaded file.
 * @param overwrite - A boolean indicating whether to overwrite an existing file with the same public ID.
 * @returns A promise that resolves with the upload response or an error response.
 */
export async function upload(
  file: string,
  public_id: string,
  overwrite: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  try {
    const result = await cloudinary.v2.uploader.upload(file, {
      public_id,
      overwrite,
    });
    return result;
  } catch (error) {
    return error as UploadApiErrorResponse;
  }
}

/**
 * Uploads a video file to Cloudinary.
 *
 * @param file - The path to the file to be uploaded.
 * @param public_id - The desired public ID for the uploaded file.
 * @param overwrite - A boolean indicating whether to overwrite an existing file with the same public ID.
 * @returns A promise that resolves with the upload response or an error response.
 */
export async function uploadVideo(
  file: string,
  public_id: string,
  overwrite: boolean
): Promise<UploadApiResponse | UploadApiErrorResponse | undefined> {
  try {
    const result = await cloudinary.v2.uploader.upload(file, {
      public_id,
      overwrite,
      chunk_size: 5000000,
      resource_type: 'video',
    });
    return result;
  } catch (error) {
    return error as UploadApiErrorResponse;
  }
}
