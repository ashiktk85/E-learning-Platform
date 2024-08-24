import ffmpeg from 'fluent-ffmpeg';
import * as fs from 'fs';
import * as path from 'path';
import { PassThrough } from 'stream';

async function compressVideo(file: Express.Multer.File): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const tempFilePath = path.join(__dirname, 'temp', file.originalname);

      
        const bufferStream = new PassThrough();
        bufferStream.end(file.buffer);

        const command = ffmpeg(bufferStream)
            .outputOptions('-preset', 'fast') 
            .outputOptions('-crf', '28') 
            .outputOptions('-movflags', 'faststart') 
            .save(tempFilePath)
            .on('end', () => {
                fs.readFile(tempFilePath, (err, data) => {
                    if (err) {
                        reject(err);
                    } else {
                        fs.unlinkSync(tempFilePath); 
                        resolve(data);
                    }
                });
            })
            .on('error', (err: any) => {
                reject(err);
            });
    });
}

export default compressVideo;
