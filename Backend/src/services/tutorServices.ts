// import { TutorRepositary } from "../repository/tutorRepositary";
import { v4 as uuidv4 } from "uuid";
// import {
//   S3Client,
//   PutObjectCommand,
//   GetObjectCommand,
//   DeleteObjectCommand,
//   CreateMultipartUploadCommand,
//   UploadPartCommand,
//   CompleteMultipartUploadCommand,
//   AbortMultipartUploadCommand,
// } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


import { AwsConfig } from "../config/awsFileConfigs";
import { IUserRepository } from "../interfaces/user.repository.interface";
import { IAdminRepository } from "../interfaces/admin.repository.interface";
import ICourseRepository from "../interfaces/course.repository.interface";
import ITutorRepository from "../interfaces/tutor.repository.interface";
import INewCourseDetails, { ICourse, IMonthlyEnrollment, IMonthlyRevenue, ITutorDashBoard, ITutorInfo, ITutorProfile, IVideo } from "../interfaces/common.interfaces";

// import { UserRepositary } from "../repository/userRepository";
// import { ICourse, ISection, IVideo } from "../models/courseModel";

// import { CouresRepository } from "../repository/courseRepository";
// import { String } from "aws-sdk/clients/batch";
// import { compressVideo } from "../helper/videoCompression";
// import fs from 'fs';
// import userModel from "../models/userModel";

// require("dotenv").config();

// interface CourseData {
//   courseId: string;
//   courseName: string;
//   description: string;
//   language: string;
//   tags: string[];
//   selectedCategory: string;
//   sections: {
//     name: string;
//     description: string;
//     videos: { title: string; videoUrl: string }[];
//   }[];
//   additionalDetail1: string;
//   price: string;
//   files: { type: string; url: string }[];
//   profilePhotoUrl?: string;
// }

// const aws = new AwsConfig();

 class TutorService {
    private userRepository : IUserRepository;
    private adminRepository : IAdminRepository;
    private courseRepository : ICourseRepository;
    private tutorRepository : ITutorRepository;

    constructor(
      userRepository : IUserRepository,
      adminRepository : IAdminRepository,
      courseRepository : ICourseRepository,
      tutorRepository : ITutorRepository
    ) {
      this.userRepository = userRepository,
      this.adminRepository = adminRepository,
      this.courseRepository = courseRepository,
      this.tutorRepository = tutorRepository
    }

  private awsConfig = new AwsConfig();

  async tutorApplication(files: any, data: any): Promise<void> {
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
    await this.tutorRepository.saveApplication(combinedData as any);
  }

    async verifyLogin(applicationId: string,passcode: string): Promise<ITutorInfo> {
    try {
      return await this.userRepository.verifyTutor(
        applicationId,
        passcode
      );
    } catch (error: any) {
      console.error("Error verifying tutor login in services", error.message);
      throw new Error(error.message);
    }
  }

  getApplicationData = async(email: string): Promise<any> => {
    try {
      const response = await this.userRepository.getApplicantData(
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

    editProfile = async(data: any) : Promise<ITutorProfile> => {
    try {
      return await this.tutorRepository.editProfile(data as any);
    } catch (error: any) {
      console.error(
        "Error getting applicant data for tutor profile in services",
        error.message
      );
      throw new Error(error.message);
    }
  }

   createCourse = async( files: any, courseData: any, email: string) : Promise<boolean> => {
    try {
      const fileUrls: { type: string; url: string }[] = [];
      let courseId = uuidv4();
      courseData = Object.assign({}, courseData);
      courseId = courseId + `-${courseData.courseName.split('').join('')}`;
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
      console.log("All files uploaded. File URLs:");
      const combinedData = {
        courseId,
        ...courseData,
        files: fileUrls,
      };
      console.log("Course saved successfully:");
      return await this.tutorRepository.saveCourse(
        combinedData,
        email
      );
    } catch (error) {
      console.error("Error creating course:", error);
      throw error;
    }
  }
  
   getCoursesWithSignedUrls = async(email: string) : Promise<ICourse[]> => {
    try {
      const courses = await this.tutorRepository.getCoursesByTutor(email);
      const coursesWithUrls = await Promise.all(
        courses.map(async (course: ICourse) => {
          const thumbnailUrl = course.thumbnail
            ? await this.awsConfig.getfile(
                course.thumbnail,
                `tutors/${email}/courses/${course.courseId}/thumbnail`
              )
            : null;
          const sectionsWithUrls = await Promise.all(
            course.sections.map(async (section: any) => {
              const videosWithUrls = await Promise.all(
                section.videos.map(async (video: any) => {
                  const videoUrl = await this.awsConfig.getfile(
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

   kycVerify = async(email : string, data : any) : Promise<boolean> => {
    try {  
      const userTutor = await this.userRepository.findUser(email as any)
      if(!userTutor) throw new Error("No user found")
      return await this.tutorRepository.saveKyc(userTutor?.userId , data)
    } catch (error) {
      console.error("Error in saving kyc service:", error);
      throw error;
    }
  }

  kycStatusCheck = async(email : string) : Promise<boolean> =>  {
    try {
      const user = await this.userRepository.findUser(email as string)
      let boolean = false;
      if(user?.kyc) user?.kyc === 'verified' ? boolean = true : boolean = false; 
      return boolean
    } catch (error) {
      console.error("Error in saving kyc service:", error);
      throw error;
    }
  }

   updateCourse = async(courseId: string, newData: any) : Promise<INewCourseDetails> =>   {
    try {
      const update = await this.courseRepository.updateCourse(
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



   getDashboard = async(email: string) : Promise<ITutorDashBoard> => {
    try {
      const userTutor = await this.userRepository.findUser(email);
      if (!userTutor) throw new Error("Tutor dosent exist.");
      const totalIncome = await this.userRepository.incomeWallet(userTutor?.userId);
      const tutorProfile = await this.tutorRepository.getTutorDetail(email);
      if (!tutorProfile) throw new Error("TutorProfile dosent exist.");
      let profileUrl = ""
      if(userTutor?.profile) {
          profileUrl = await this.awsConfig.getfile(
          userTutor?.profile as string,
          `users/profile/${userTutor?.userId}`
        );
      }       
      const courses = await this.tutorRepository.getCoursesByTutor(email);
      const totalCourses = courses.length;
      const uniqueStudents = new Set();
      courses.forEach((course : ICourse) => {
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
      return dashboardData;
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      throw error;
    }
  }

    updateVideo = async(_id : string, title : string , description : string) : Promise<IVideo> =>{
    try {
      return await this.courseRepository.updateVid(_id as string, title as string , description as string)
    } catch (error) {
      console.error("Error fetching monthly  data:", error);
      throw error;
    }
  }

  
   deleteVideo = async(videoId : string, courseId : string ) : Promise<boolean | null> => {
    try {
        return await this.courseRepository.deleteVideo(videoId as string, courseId as string )
    } catch (error) {
      console.error("Error fetching monthly  data:", error);
      throw error;
    }
  }

   getMonthlyData = async(year: number) :  Promise<{enrollments : IMonthlyEnrollment[] ,revenue :IMonthlyRevenue[] }> => {
    try {
      const userEnrollments = await this.tutorRepository.getMonthlyUserEnrollments(year);
      const revenue = await this.tutorRepository.getMonthlyRevenue(year);
      return {
        enrollments : userEnrollments,
        revenue
      }
    } catch (error) {
      console.error("Error fetching monthly  data:", error);
      throw error;
    }
  }

  async addVideo(name : string, description : string , newVideo : any, sectionId : string , courseId : string) : Promise<IVideo> {
    try {
      const { email } = await this.userRepository.getCourse(courseId)
      const tutorFolderPath = `tutors/${email}/courses/${courseId}/videos/`
       const url = await this.awsConfig.uploadFileToS3(tutorFolderPath , newVideo)
       return  await this.tutorRepository.addVideo(name , description , url, sectionId ,courseId)
    } catch (error) {
      console.error("Error fetching monthly  data:", error);
      throw error;
    }
  }

 }


export default TutorService;