import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { TutorRepositary } from "../repository/tutorRepositary";
import { v4 as uuidv4 } from "uuid";


const s3Client = new S3Client({
    region: 'eu-north-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS!,
        secretAccessKey: process.env.AWS_SECRET!,
    },
});

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

        if (files.profilePhoto) {
            const url = await this.uploadFileToS3(bucketName, 'tutorApplication/profilePhoto/', files.profilePhoto[0]);
            fileUrls.push({ type: 'profilePhoto', url });
        }

        const applicationId = uuidv4()
        const combinedData = {
            applicationId,
            ...data,
            files: fileUrls,
        };

        await TutorRepositary.saveApplication(combinedData as any)
        
    }

    private async uploadFileToS3(bucketName: string, folderPath: string, file: Express.Multer.File): Promise<string> {
        const params = {
            Bucket: bucketName,
            Key: `${folderPath}${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(params);
        await s3Client.send(command);

        const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${folderPath}${file.originalname}`;
        return fileUrl;
    }
}
