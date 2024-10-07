import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { PassThrough } from 'stream';

export const compressVideo = async (file: any): Promise<Buffer> => {
  if (!file || !file.buffer) {
    throw new Error('No file provided or file buffer is missing');
  }

  const inputBuffer = file.buffer;
  const outputStream = new PassThrough();
  ffmpeg.setFfmpegPath(ffmpegStatic as any);

  const chunks: Buffer[] = [];

  try {
    return await new Promise<Buffer>((resolve, reject) => {
      ffmpeg()
        .input(inputBuffer)
        .inputFormat(file.mimetype.split('/')[1]) 
        .videoCodec('libx264')
        .outputOptions(['-preset fast', '-crf 28'])
        .format('mp4')
        .pipe(outputStream, { end: true });

      outputStream.on('data', (chunk) => chunks.push(chunk));
      outputStream.on('end', () => {
        const compressedBuffer = Buffer.concat(chunks);
        resolve(compressedBuffer);
      });

      outputStream.on('error', (err) => {
        reject(new Error('Compression failed: ' + err.message));
      });
    });
  } catch (error : any) {
    throw new Error(`Compression failed: ${error.message}`);
  }
};

