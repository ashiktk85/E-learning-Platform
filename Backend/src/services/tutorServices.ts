
import { TutorRepositary } from "../repository/tutorRepositary";
import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand , GetObjectCommand, DeleteObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { AwsConfig } from "../config/awsFileConfigs";

import * as crypto from 'crypto';
import { UserRepositary } from "../repository/userRepository";
import { ICourse, ISection, IVideo } from "../models/courseModel";
import compressVideo from "../helper/videoCompression";

require('dotenv').config();

interface CourseData {
    courseId: string;
    courseName: string;
    description: string;
    language: string;
    tags: string[];
    selectedCategory: string;
    sections: {
      name: string;
      description: string;
      videos: { title: string; videoUrl: string }[];
    }[];
    additionalDetail1: string;
    price: string;
    files: { type: string; url: string }[];
  }
  


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
    
            courseData = Object.assign({}, courseData);
    
           
            console.log('Course Data:', courseData);
            console.log('Files:', files);
    
            courseId = courseId + `-${courseData.courseName}`;
            const tutorFolderPath = `tutors/${email}/courses/${courseId}/`;
    
           
            for (const file of files) {
                console.log('Processing File:', file);
    
                if (file.fieldname.startsWith('sections')) {
                    let sectionIndex = file.fieldname.match(/sections\[(\d+)\]/)?.[1];
                    const videoIndex = file.fieldname.match(/videos\[(\d+)\]/)?.[1];
    
                    const folderPath = `${tutorFolderPath}sections/${sectionIndex}/videos/`;
                    
                    console.log(`Uploading video to ${folderPath}`);
                    const url = await this.uploadFileToS3(bucketName, folderPath, file);
                    fileUrls.push({ type: 'video', url });
                } else if (file.fieldname === 'thumbnail') {
                    const folderPath = `${tutorFolderPath}thumbnail/`;
    
                    console.log(`Uploading thumbnail to ${folderPath}`);
                    const url = await this.uploadFileToS3(bucketName, folderPath, file);
                    fileUrls.push({ type: 'thumbnail', url });
                }
            }
    
            console.log('All files uploaded. File URLs:', fileUrls);
    
           
            const combinedData = {
                courseId,
                ...courseData,
                files: fileUrls,
            };
    
           
            const res = await TutorRepositary.saveCourse(combinedData as any, email as string);
            console.log('Course saved successfully:', res);
            return res;
        } catch (error) {
            console.error('Error creating course:', error);
            throw error; 
        }
    }
    
    
    
    
    

    private async uploadFileToS3(bucketName: string, folderPath: string, file: Express.Multer.File): Promise<string> {
        try {
            let fileBuffer = file.buffer;
    
            // if (file.mimetype.startsWith('video/')) {
            //     console.log('Compressing video...');
            //     fileBuffer = await compressVideo(file);
            // }
    
            const uniqueName = crypto.randomBytes(16).toString('hex') + '-' + file.originalname;
    
            const params = {
                Bucket: bucketName,
                Key: `${folderPath}${uniqueName}`,
                Body: fileBuffer,
                ContentType: file.mimetype,
            };
    
            const command = new PutObjectCommand(params);
            const sent = await s3Client.send(command);
    
            if (sent && sent.$metadata.httpStatusCode === 200) {
                const fileUrl = uniqueName;
                return fileUrl;
            } else {
                throw new Error('File upload failed');
            }
        } catch (error: any) {
            console.error('Error uploading file to S3:', error.message);
            throw new Error(`Failed to upload file to S3: ${error.message}`);
        }
    }
    

    private async uploadFileToS3Multipart(bucketName: string, folderPath: string, file: Express.Multer.File): Promise<string> {
        const uniqueName = crypto.randomBytes(16).toString('hex') + '-' + file.originalname;
        const partSize = 5 * 1024 * 1024; 
        const totalParts = Math.ceil(file.buffer.length / partSize);
        const uploadId = await s3Client.send(new CreateMultipartUploadCommand({
            Bucket: bucketName,
            Key: `${folderPath}${uniqueName}`,
            ContentType: file.mimetype,
        }));
    
        const uploadParts = [];
        
        try {
            // Upload parts
            for (let part = 0; part < totalParts; part++) {
                const start = part * partSize;
                const end = Math.min(file.buffer.length, start + partSize);
                const partBuffer = file.buffer.slice(start, end);
    
                const uploadPartCommand = new UploadPartCommand({
                    Bucket: bucketName,
                    Key: `${folderPath}${uniqueName}`,
                    PartNumber: part + 1,
                    UploadId: uploadId.UploadId,
                    Body: partBuffer,
                    ContentLength: partBuffer.length,
                });
    
                const uploadedPart = await s3Client.send(uploadPartCommand);
                uploadParts.push({
                    ETag: uploadedPart.ETag,
                    PartNumber: part + 1,
                });
            }
    
         
            const completeMultipartUploadCommand = new CompleteMultipartUploadCommand({
                Bucket: bucketName,
                Key: `${folderPath}${uniqueName}`,
                UploadId: uploadId.UploadId,
                MultipartUpload: { Parts: uploadParts },
            });
    
            await s3Client.send(completeMultipartUploadCommand);
            console.log('Multipart upload completed successfully');
    
            return uniqueName;
        } catch (error: any) {
           
            await s3Client.send(new AbortMultipartUploadCommand({
                Bucket: bucketName,
                Key: `${folderPath}${uniqueName}`,
                UploadId: uploadId.UploadId,
            }));
    
            console.error('Error with multipart upload:', error);
            throw new Error(`Multipart upload failed: ${error.message}`);
        }
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

    async getCoursesWithSignedUrls(email: string) {
        try {
          
          const courses = await TutorRepositary.getCoursesByTutor(email)
      
          const awsConfig = new AwsConfig();
          const coursesWithUrls = await Promise.all(
            courses.map(async (course: ICourse) => {
              const thumbnailUrl = course.thumbnail 
                ? await awsConfig.getfile(course.thumbnail, `tutors/${email}/courses/${course.courseId}/thumbnail`) 
                : null;
              
              const sectionsWithUrls = await Promise.all(
                course.sections.map(async (section: any) => {
                  const videosWithUrls = await Promise.all(
                    section.videos.map(async (video: any) => {
                      const videoUrl = await awsConfig.getfile(video.videoUrl, `tutors/${email}/courses/${course.courseId}/sections/${section._id}/videos`);
                      return { ...video.toObject(), url: videoUrl };
                    })
                  );
                  return { ...section.toObject(), videos: videosWithUrls };
                })
              );
          
              return { ...course.toObject(), thumbnail: thumbnailUrl, sections: sectionsWithUrls };
            })
          );
      
          return coursesWithUrls;
        } catch (error) {
          console.error('Error fetching courses with signed URLs:', error);
          throw error;
        }
      }
      
      

    
}

