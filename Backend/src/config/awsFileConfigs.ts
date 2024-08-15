import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
require('dotenv').config();

export class AwsConfig {
    bucketName: string;
    region: string;
    s3client: S3Client;

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
}
