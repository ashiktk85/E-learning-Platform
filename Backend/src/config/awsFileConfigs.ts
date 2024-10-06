// import {
//     S3Client,
//     PutObjectCommand,
//     GetObjectCommand,
//     DeleteObjectCommand,
//     CreateMultipartUploadCommand,
//     UploadPartCommand,
//     CompleteMultipartUploadCommand,
//     AbortMultipartUploadCommand,
// } from '@aws-sdk/client-s3';
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
// require('dotenv').config();
// import * as crypto from 'crypto';
// import ffmpeg from 'fluent-ffmpeg';
// import fs from 'fs';
// import path from 'path';
// import { promisify } from 'util';
// import stream from 'stream';

// const writeFile = promisify(fs.writeFile);
// const unlink = promisify(fs.unlink);


// export class AwsConfig {
//     bucketName: string;
//     region: string;
//     s3client: S3Client;

//     constructor() {
//         this.bucketName = process.env.AWS_BUCKET_NAME!;
//         this.region = process.env.AWS_REGION!;
//         this.s3client = new S3Client({
//             credentials: {
//                 accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
//                 secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
//             },
//             region: this.region,
//         });
//     }

//     async getfile(fileName: string, folder: string): Promise<string> {
//         try {
//             const options = {
//                 Bucket: this.bucketName,
//                 Key: `${folder}/${fileName}`,
//             };
//             const getCommand = new GetObjectCommand(options);
//             const url = await getSignedUrl(this.s3client, getCommand, { expiresIn: 60 * 60 });
//             return url;
//         } catch (error) {
//             console.error("Error generating signed URL:", error);
//             throw error;
//         }
//     }

//     // async uploadFileToS3(folderPath: string, file: Express.Multer.File): Promise<string> {
//     //     try {
//     //         const fileBuffer = file.buffer; 

//     //         const uniqueName = crypto.randomBytes(16).toString('hex');

//     //         const params = {
//     //             Bucket: this.bucketName,
//     //             Key: `${folderPath}${uniqueName}`,
//     //             Body: fileBuffer,
//     //             ContentType: file.mimetype,
//     //         };

//     //         const command = new PutObjectCommand(params);
//     //         const sent = await this.s3client.send(command); 

//     //         if (sent && sent.$metadata.httpStatusCode === 200) {
//     //             const fileUrl = `${uniqueName}`; 
//     //             return fileUrl;
//     //         } else {
//     //             throw new Error('File upload failed');
//     //         }
//     //     } catch (error: any) {
//     //         console.error('Error uploading file to S3:', error.message);
//     //         throw new Error(`Failed to upload file to S3: ${error.message}`);
//     //     }
//     // }

//     async uploadFileToS3(folderPath: string, file: Express.Multer.File): Promise<string> {
//         try {
//             const uniqueName = crypto.randomBytes(16).toString('hex');
        
//             // Compress the video in memory
//             const compressedBuffer = await this.compressVideo(file.buffer);
    
//             const params = {
//                             Bucket: this.bucketName,
//                             Key: `${folderPath}${uniqueName}`,
//                             Body: compressedBuffer,
//                             ContentType: file.mimetype,
//                         };
    
//             const command = new PutObjectCommand(params);
//             const sent = await this.s3client.send(command);
    
//             if (sent && sent.$metadata.httpStatusCode === 200) {
//                 const fileUrl = `${uniqueName}`;
//                 return fileUrl;
//             } else {
//                 throw new Error('File upload failed');
//             }
//         } catch (error: any) {
//             console.error('Error uploading file to S3:', error.message);
//             throw new Error(`Failed to upload file to S3: ${error.message}`);
//         }
//     }

//     private compressVideo(inputBuffer: Buffer): Promise<Buffer> {
//         return new Promise((resolve, reject) => {
//             const bufferStream = new stream.PassThrough();
//             bufferStream.end(inputBuffer);
    
//             const chunks: any[] = [];
            
//             ffmpeg(bufferStream)
//                 .videoCodec('libx264')
//                 .size('50%')
//                 .format('mp4')
//                 .on('end', () => {
//                     console.log('Compression completed!');
//                     const outputBuffer = Buffer.concat(chunks);
//                     resolve(outputBuffer);
//                 })
//                 .on('error', (err) => {
//                     console.error('Compression failed:', err);
//                     reject(err);
//                 })
//                 .on('data', (chunk: any) => {
//                     chunks.push(chunk);
//                 })
//                 .pipe(new stream.PassThrough());
//         });
//     }
   
// }


import {
    S3Client,
    PutObjectCommand,
    GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import * as crypto from 'crypto';
import ffmpeg from 'fluent-ffmpeg';
import stream from 'stream';

export class AwsConfig {
    private bucketName: string;
    private region: string;
    private s3client: S3Client;

    constructor() {
        this.bucketName = process.env.AWS_BUCKET_NAME!;
        this.region = process.env.AWS_REGION!;
        this.s3client = new S3Client({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
            },
            region: this.region,
        });
    }

    async getfile(fileName: string, folder: string): Promise<string> {
        try {
            const options = {
                Bucket: this.bucketName,
                Key: `${folder}/${fileName}`,
            };
            const getCommand = new GetObjectCommand(options);
            const url = await getSignedUrl(this.s3client, getCommand, { expiresIn: 60 * 60 });
            return url;
        } catch (error) {
            console.error("Error generating signed URL:", error);
            throw error;
        }
    }

    async uploadFileToS3(folderPath: string, file: Express.Multer.File): Promise<string> {
        try {
            const uniqueName = crypto.randomBytes(16).toString('hex');
            let fileBuffer: Buffer;
            let contentType: string;

            console.log(`File mimetype: ${file.mimetype}`);

            if (file.mimetype.startsWith('video/')) {
                console.log('Processing video file...');
                fileBuffer = await this.compressVideo(file.buffer, {
                    codec: 'libx264',
                    size: '50%',
                    format: 'mp4'
                });
                contentType = 'video/mp4';
            } else {
                console.log('Uploading non-video file without compression...');
                fileBuffer = file.buffer;
                contentType = file.mimetype;
            }
    
            const params = {
                Bucket: this.bucketName,
                Key: `${folderPath}${uniqueName}`,
                Body: fileBuffer,
                ContentType: contentType,
            };
    
            const command = new PutObjectCommand(params);
            const sent = await this.s3client.send(command);
    
            if (sent && sent.$metadata.httpStatusCode === 200) {
                return uniqueName;
            } else {
                throw new Error('File upload failed');
            }
        } catch (error: any) {
            console.error('Error processing and uploading file to S3:', error);
            throw new Error(`Failed to process and upload file to S3: ${error.message}`);
        }
    }

    private compressVideo(inputBuffer: Buffer, options: {
        codec: string,
        size: string,
        format: string
    }): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            const bufferStream = new stream.PassThrough();
            bufferStream.end(inputBuffer);
    
            const chunks: Buffer[] = [];
            
            ffmpeg(bufferStream)
                .videoCodec(options.codec)
                .size(options.size)
                .format(options.format)
                .on('end', () => {
                    console.log('Compression completed!');
                    const outputBuffer = Buffer.concat(chunks);
                    resolve(outputBuffer);
                })
                .on('error', (err: Error) => {
                    console.error('Compression failed:', err);
                    reject(new Error(`Video compression failed: ${err.message}`));
                })
                .outputOptions('-movflags frag_keyframe+empty_moov')
                .pipe()
                .on('data', (chunk: Buffer) => {
                    chunks.push(chunk);
                })
                .on('end', () => {
                    console.log('Output stream ended');
                });
        });
    }
}
