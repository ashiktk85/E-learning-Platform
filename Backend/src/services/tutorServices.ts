
import { TutorRepositary } from "../repository/tutorRepositary";
import { v4 as uuidv4 } from "uuid";
import { S3Client, PutObjectCommand , GetObjectCommand, DeleteObjectCommand, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand, AbortMultipartUploadCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { AwsConfig } from "../config/awsFileConfigs";


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
    profilePhotoUrl?: string;
  }
  




const aws = new AwsConfig()

export class TutorServices {
    private awsConfig = new AwsConfig();
    
    async tutorApplicationService(files: any, data: any): Promise<void> {
        const bucketName = "learn-sphere";

        const fileUrls: { type: string, url: string }[] = [];

        if (files.idProof) {
            const url = await this.awsConfig.uploadFileToS3(bucketName, 'tutorApplication/idProofs/', files.idProof[0]);
            fileUrls.push({ type: 'idProof', url });
        }

        if (files.resume) {
            const url = await this.awsConfig.uploadFileToS3(bucketName, 'tutorApplication/resume/', files.resume[0]);
            fileUrls.push({ type: 'resume', url });
        }

        if (files.certifications) {
            for (const certificate of files.certifications) {
                const url = await this.awsConfig.uploadFileToS3(bucketName, 'tutorApplication/certifications/', certificate);
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
             
    
                    const folderPath = `${tutorFolderPath}videos/`;
                    
                    console.log(`Uploading video to ${folderPath}`);
                    const url = await this.awsConfig.uploadFileToS3(bucketName, folderPath, file);
                    fileUrls.push({ type: 'video', url });
                } else if (file.fieldname === 'thumbnail') {
                    const folderPath = `${tutorFolderPath}thumbnail/`;
    
                    console.log(`Uploading thumbnail to ${folderPath}`);
                    const url = await this.awsConfig.uploadFileToS3(bucketName, folderPath, file);
                    fileUrls.push({ type: 'thumbnail', url });
                }
            }
    
            console.log('All files uploaded. File URLs:', fileUrls);
    
           
            const combinedData = {
                courseId,
                ...courseData,
                files: fileUrls,
            };

            // console.log("vidd",combinedData.sections[0].video,"com");
            
    
           
            const res = await TutorRepositary.saveCourse(combinedData as any, email as string);
            console.log('Course saved successfully:', res);
            return res;
        } catch (error) {
            console.error('Error creating course:', error);
            throw error; 
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

            if(response?.profilePhotoUrl) {
                console.log(typeof(response?.profilePhotoUrl));
                
                const profileUrl = await this.awsConfig.getfile(response?.profilePhotoUrl ,`tutorProfile/profileImgs/` )
                return {...response , profileUrl};
                
                
            }

            

           

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
      
    //   async uploadProfile(email : string , file :  any) {
    //     try {

    //         const bucketName = "learn-sphere";
    //         const profileKey = `tutorProfile/profileImgs/${file.originalname}`;
            
            
    //         const uploadResult = await this.awsConfig.uploadFileToS3(bucketName, profileKey, file);
      
    //         const res = await TutorRepositary.uploadProfileRepo(email as string, uploadResult)

    //         return res;
    //     } catch (error) {
    //         console.error('Error in uploding profile in tutor service:', error);
    //         throw error;
    //     }
    //   }

    
}

