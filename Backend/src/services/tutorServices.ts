import { TutorRepositary } from "../repository/tutorRepositary";
import { v4 as uuidv4 } from "uuid";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  CreateMultipartUploadCommand,
  UploadPartCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { AwsConfig } from "../config/awsFileConfigs";

import { UserRepositary } from "../repository/userRepository";
import { ICourse, ISection, IVideo } from "../models/courseModel";
import compressVideo from "../helper/videoCompression";
import { CouresRepository } from "../repository/courseRepository";
import { String } from "aws-sdk/clients/batch";

require("dotenv").config();

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

const aws = new AwsConfig();

export class TutorServices {
  private awsConfig = new AwsConfig();

  async tutorApplicationService(files: any, data: any): Promise<void> {
    const bucketName = "learn-sphere";

    const fileUrls: { type: string; url: string }[] = [];

    if (files.idProof) {
      const url = await this.awsConfig.uploadFileToS3(
        "tutorApplication/idProofs/",
        files.idProof[0]
      );
      fileUrls.push({ type: "idProof", url });
    }

    if (files.resume) {
      const url = await this.awsConfig.uploadFileToS3(
        "tutorApplication/resume/",
        files.resume[0]
      );
      fileUrls.push({ type: "resume", url });
    }

    if (files.certifications) {
      for (const certificate of files.certifications) {
        const url = await this.awsConfig.uploadFileToS3(
          "tutorApplication/certifications/",
          certificate
        );
        fileUrls.push({ type: "certification", url });
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
      const fileUrls: { type: string; url: string }[] = [];
      let courseId = uuidv4();

      courseData = Object.assign({}, courseData);

      console.log("Course Data:", courseData);
      console.log("Files:", files);

      courseId = courseId + `-${courseData.courseName}`;
      const tutorFolderPath = `tutors/${email}/courses/${courseId}/`;

      for (const file of files) {
        console.log("Processing File:", file);

        if (file.fieldname.startsWith("sections")) {
          const folderPath = `${tutorFolderPath}videos/`;

          console.log(`Uploading video to ${folderPath}`);
          const url = await this.awsConfig.uploadFileToS3(folderPath, file);
          fileUrls.push({ type: "video", url });
        } else if (file.fieldname === "thumbnail") {
          const folderPath = `${tutorFolderPath}thumbnail/`;

          console.log(`Uploading thumbnail to ${folderPath}`);
          const url = await this.awsConfig.uploadFileToS3(folderPath, file);
          fileUrls.push({ type: "thumbnail", url });
        }
      }

      console.log("All files uploaded. File URLs:", fileUrls);

      const combinedData = {
        courseId,
        ...courseData,
        files: fileUrls,
      };
      // console.log("vidd",combinedData.sections[0].video,"com");
      const res = await TutorRepositary.saveCourse(
        combinedData as any,
        email as string
      );
      console.log("Course saved successfully:", res);
      return res;
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  }

  async verifyLoginService(
    applicationId: string,
    passcode: string
  ): Promise<any | void> {
    try {
      const response = await UserRepositary.verifyTutor(
        applicationId,
        passcode
      );

      return response;
    } catch (error: any) {
      console.error("Error verifying tutor login in services", error.message);
      throw new Error(error.message);
    }
  }

  async getApplicationDataService(email: string): Promise<any> {
    try {
      const response = await UserRepositary.getApplicantDataRepo(
        email as string
      );

      if (response?.profilePhotoUrl) {
        console.log(typeof response?.profilePhotoUrl);

        const profileUrl = await this.awsConfig.getfile(
          response?.profilePhotoUrl,
          `tutorProfile/profileImgs/`
        );
        return { ...response, profileUrl };
      }
      return response;
    } catch (error: any) {
      console.error(
        "Error getting applicant data for tutor profile in services",
        error.message
      );
      throw new Error(error.message);
    }
  }

  async editProfileService(data: any) {
    try {
      const res = await TutorRepositary.editProfileRepo(data as any);
      return res;
    } catch (error: any) {
      console.error(
        "Error getting applicant data for tutor profile in services",
        error.message
      );
      throw new Error(error.message);
    }
  }

  async getCoursesWithSignedUrls(email: string) {
    try {
      const courses = await TutorRepositary.getCoursesByTutor(email);

      const awsConfig = new AwsConfig();
      const coursesWithUrls = await Promise.all(
        courses.map(async (course: ICourse) => {
          const thumbnailUrl = course.thumbnail
            ? await awsConfig.getfile(
                course.thumbnail,
                `tutors/${email}/courses/${course.courseId}/thumbnail`
              )
            : null;

          const sectionsWithUrls = await Promise.all(
            course.sections.map(async (section: any) => {
              const videosWithUrls = await Promise.all(
                section.videos.map(async (video: any) => {
                  const videoUrl = await awsConfig.getfile(
                    video.videoUrl,
                    `tutors/${email}/courses/${course.courseId}/sections/${section._id}/videos`
                  );
                  return { ...video.toObject(), url: videoUrl };
                })
              );
              return { ...section.toObject(), videos: videosWithUrls };
            })
          );

          return {
            ...course.toObject(),
            thumbnail: thumbnailUrl,
            sections: sectionsWithUrls,
          };
        })
      );

      return coursesWithUrls;
    } catch (error) {
      console.error("Error fetching courses with signed URLs:", error);
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
  async updateCourseService(courseId: string, newData: any) {
    try {
      const update = await CouresRepository.updateCourse(
        courseId as string,
        newData
      );

      const newCourseDetail = {
        name: update?.name,
        category: update?.category,
        language: update?.language,
        description: update?.description,
      };
      return newCourseDetail;
    } catch (error) {
      console.error("Error fetching courses with signed URLs:", error);
      throw error;
    }
  }

  async updateThumbnail(courseId: string, thumbnail: any) {
    try {
      const course = await UserRepositary.getCourse(courseId as String);
      const thumbnailUrl = await aws.uploadFileToS3(
        `tutors/${course?.email}/courses/${course.courseId}/thumbnail`,
        thumbnail
      );
      const update = await CouresRepository.updateCourse(
        courseId as string,
        thumbnailUrl
      );

      const signedUrl = await aws.getfile(
        thumbnailUrl,
        `tutors/${course?.email}/courses/${course.courseId}/thumbnail`
      );
      return signedUrl;
    } catch (error) {
      console.error("Error fetching courses with signed URLs:", error);
      throw error;
    }
  }

  async getDashboard(email: string) {
    try {
      const awsConfig = new AwsConfig();
      const userTutor = await UserRepositary.existUser(email);
      if (!userTutor) throw new Error("Tutor dosent exist.");

      const totalIncome = await UserRepositary.incomeWallet(userTutor?.userId);

      const tutorProfile = await TutorRepositary.getTutorDetail(email);
      if (!tutorProfile) throw new Error("TutorProfile dosent exist.");

      const profileUrl = await awsConfig.getfile(
        userTutor?.profile as string,
        `users/profile/${userTutor?.userId}`
      );

      const courses = await TutorRepositary.getCoursesByTutor(email);

      const totalCourses = courses.length;

      const uniqueStudents = new Set();
      courses.forEach((course) => {
        course.users?.forEach((user) => uniqueStudents.add(user));
      });

      const totalStudents = uniqueStudents.size;

      const dashboardData = {
        name: userTutor?.firstName + " " + userTutor?.lastName,
        profileUrl,
        followers: userTutor?.followers.length,
        role: tutorProfile?.role,
        students: totalStudents,
        totalCourses,
        income: totalIncome,
      };
      //    console.log(dashboardData);

      return dashboardData;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  }

  async getMonthlyData(year: number) {
    try {
      const userEnrollments = await TutorRepositary.getMonthlyUserEnrollments(year);
      const revenue = await TutorRepositary.getMonthlyRevenue(year);

      return {
        enrollments : userEnrollments,
        revenue
      }
      
    } catch (error) {
      console.error("Error fetching monthly  data:", error);
      throw error;
    }
  }

  async updateVideo(_id : string, title : string , description : string) {
    try {
     
        const updatedVideo = await CouresRepository.updateVid(_id as string, title as string , description as string)
      return updatedVideo;
      
    } catch (error) {
      console.error("Error fetching monthly  data:", error);
      throw error;
    }
  }

  async deleteVideo(videoId : string, courseId : string ) {
    try {
     
        const response = await CouresRepository.deleteVideoRepo(videoId as string, courseId as string )
      return response;
      
    } catch (error) {
      console.error("Error fetching monthly  data:", error);
      throw error;
    }
  }

  

  async addVideoService(name : string, description : string , newVideo : any, sectionId : string , courseId : string) {
    try {
      const { tutorEmail } = await UserRepositary.getCourse(courseId)
      const tutorFolderPath = `tutors/${tutorEmail}/courses/${courseId}/videos/`
       const url = await this.awsConfig.uploadFileToS3(tutorFolderPath , newVideo)

       const update = await TutorRepositary.addVideo(name , description , url, sectionId ,courseId)
       return update
      
    } catch (error) {
      console.error("Error fetching monthly  data:", error);
      throw error;
    }
  }
}
