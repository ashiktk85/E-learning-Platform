
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

    async createCourseService(files: any, courseData: any, email: string) {
        try {
            const bucketName = "learn-sphere";
            const fileUrls: { type: string, url: string }[] = [];
            let courseId = uuidv4();
    
            // Convert courseData to a regular JavaScript object
            courseData = Object.assign({}, courseData);
    
            console.log(courseData, "course");
    
            courseId = courseId + `-${courseData.courseName}`;
    
            // Generate folder path using the tutor's email
            const tutorFolderPath = `tutors/${email}/courses/${courseId}/`;
    
            // Upload videos for each section
            for (const file of files) {
                if (file.fieldname.startsWith('sections')) {
                    let sectionIndex = file.fieldname.match(/sections\[(\d+)\]/)?.[1];
                    sectionIndex = sectionIndex + `-${file.originalname}`;
                    const videoIndex = file.fieldname.match(/videos\[(\d+)\]/)?.[1];
    
                    const folderPath = `${tutorFolderPath}sections/${sectionIndex}/videos/`;
    
                    const url = await this.uploadFileToS3(bucketName, folderPath, file);
                    fileUrls.push({ type: 'video', url });
                } else if (file.fieldname === 'thumbnail') {
                    const folderPath = `${tutorFolderPath}thumbnail/`;
    
                    const url = await this.uploadFileToS3(bucketName, folderPath, file);
                    fileUrls.push({ type: 'thumbnail', url });
                }
            }
    
            // Add the file URLs to course data and save the course
            const combinedData = {
                courseId,
                ...courseData,
                files: fileUrls,
            };
    
            // Save the course data to the repository
            const res = await TutorRepositary.saveCourse(combinedData as any, email as string);
            return  res;
        } catch (error) {
            console.error('Error creating course:', error);
        }
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

    async getApplicationDataService(email : string) : Promise<any> {
        try {

            const response = await UserRepositary.getApplicantDataRepo(email as string)

            return response;
            
        } catch (error : any) {
            console.error("Error getting applicant data for tutor profile in services", error.message);
            throw new Error(error.message);
        }
    }

    async editProfileService(data : any) {
        try {
            const res = await TutorRepositary.editProfileRepo(data as any)
            return res;
        } catch (error :any) {
            console.error("Error getting applicant data for tutor profile in services", error.message);
            throw new Error(error.message);
        }
    }

    async getCoursesSerice (email : string) {
        try {

            const user =  await UserRepositary.existUser(email)

            if(!user) {
                throw new Error("User doesn't exist");
            }

            const tutorCourses = await TutorRepositary.getTutorCourses(email)
            
        } catch (error : any) {
            console.error("Error getting all tutor courses in services", error.message);
            throw new Error(error.message);
        }
    }

    
}

