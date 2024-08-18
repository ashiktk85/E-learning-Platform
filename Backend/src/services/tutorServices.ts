
import { TutorRepositary } from "../repository/tutorRepositary";
import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand , GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { AwsConfig } from "../config/awsFileConfigs";

import * as crypto from 'crypto';
import { UserRepositary } from "../repository/userRepository";

require('dotenv').config();


const s3Client = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const aws = new AwsConfig()

export class TutorServices {
    
    async tutorApplicationService(files: any, data: any): Promise<void> {
        const bucketName = "learn-sphere";

        const fileUrls: { type: string, url: string }[] = [];

        if (files.idProof) {
            const url = await this.uploadFileToS3(bucketName, 'tutorApplication/idProofs/', files.idProof[0]);
            fileUrls.push({ type: 'idProof', url });
        }

        if (files.resume) {
            const url = await this.uploadFileToS3(bucketName, 'tutorApplication/resume/', files.resume[0]);
            fileUrls.push({ type: 'resume', url });
        }

        if (files.certifications) {
            for (const certificate of files.certifications) {
                const url = await this.uploadFileToS3(bucketName, 'tutorApplication/certifications/', certificate);
                fileUrls.push({ type: 'certification', url });
            }
        }

        // if (files.profilePhoto) {
        //     const url = await this.uploadFileToS3(bucketName, 'tutorApplication/profilePhoto/', files.profilePhoto[0]);
        //     fileUrls.push({ type: 'profilePhoto', url });
        // }

        const applicationId = uuidv4();
        const combinedData = {
            applicationId,
            ...data,
            files: fileUrls,
        };

        await TutorRepositary.saveApplication(combinedData as any);
    }

    private async uploadFileToS3(bucketName: string, folderPath: string, file: Express.Multer.File): Promise<string> {
        
        const uniqueName = crypto.randomBytes(16).toString('hex') + '-' + file.originalname;

        const params = {
            Bucket: bucketName,
            Key: `${folderPath}${uniqueName}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const fileUrl = uniqueName;
        return fileUrl;
    }

    async verifyLoginService(applicationId : string , passcode : string) : Promise<any | void> {
        try {
            
            const response = await UserRepositary.verifyTutor(applicationId , passcode)

           return response;

        } catch (error : any) {
            console.error("Error verifying tutor login in services", error.message);
            throw new Error(error.message);
        }
    }
}

