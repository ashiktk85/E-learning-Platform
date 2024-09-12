import TutorApplication, {
  ITutorApplication,
} from "../models/applicationModel";
import { Course , Section , Video } from "../models/courseModel";
import TutorProfile from "../models/tutorProfileModel";

import userModel from "../models/userModel";

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
    videos: {
      name: string;
      description: string; title: string; videoUrl: string 
}[];
  }[];
  additionalDetail1: string;
  price: string;
  files: { type: string; url: string }[];
}

export class TutorRepositary {


 
  static async saveApplication(data: any): Promise<void> {
    try {
      console.log("final data before db application", data);

      const formattedData = {
        ...data,
        socialLinks: typeof data.socialLinks === 'string' ? JSON.parse(data.socialLinks) : data.socialLinks
      };

      const user = await userModel.findOne({email : data.email})

       
      if (!user) {
        throw new Error('User not found');
      }

      const updateData = {
        userId: user._id, 
        bio: data.subjectsOfExpertise,
        education: data.degree, 
        experience: data.experience,
        email : user.email,
        role : data.tutorRole
      };

      const profileCreation =  new TutorProfile(updateData)
      profileCreation.save()
  
      const tutorApplication = new TutorApplication(formattedData);

      await tutorApplication.save();
      console.log("Tutor application saved successfully.");
    } catch (error) {
      console.error("Error saving tutor application:", error);
      throw error;
    }
  }
  
  static async getApplicationsRepo() : Promise<any | void> {
    try {

      const applications = await TutorApplication.find({}
        , {
          _id : 0,
          applicationId : 1,
          email : 1,
          tutorRole : 1,
          age : 1,
          gender : 1,
          phone : 1,
          degree : 1,
          fieldOfStudy : 1,
          institution : 1,
          graduationYear : 1,
          status : 1
        }
      )

      // console.log(applications , "in repo");
      

      return applications;
      
    } catch (error) {
      console.error("Error getting tutor applications repo:", error);
      throw error;
    }
  }

  static async getOneApplication(id : string) : Promise<any | void> {
    try {
      const applicant = await TutorApplication.findOne({applicationId : id}, {_id : 0})

      console.log(applicant , "applicatn");
      

      return applicant
      
    } catch (error : any) {
      console.error("Error getting one tutor applications repo:", error);
      throw error;
    }
  }

  static async editProfileRepo(data : any) {
    try {
      const { email, values } = data;

      const user = await userModel.findOne({ email: email });
      
      if (!user) {
        throw new Error('User not found');
      }
  
      const updateData = {
        userId: user._id, 
        bio: values.bio,
        education: values.degree, 
        country: values.country,
        language: values.language,
        experience: values.experience,
        email : email,
        role : values.role
      };
  
     
      const updatedProfile = await TutorProfile.findOneAndUpdate(
        { userId: user._id }, 
        { $set: updateData }, 
        { new: true, upsert: true } 
      );
      console.log('Profile updated or created:', updatedProfile);
      return updatedProfile;
      
      
    } catch (error : any) {
      console.error("Error editing tutor profile repo:", error);
      throw error;
    }
  }

  static async saveCourse(data: CourseData, email: string) : Promise<boolean> {
    try {
     
      const videoFiles = data.files.filter((file) => file.type === 'video');
      const thumbnail = data.files.find((file) => file.type === 'thumbnail')?.url || '';

      // console.log(data.sections , "sections");
      
      const sections = await Promise.all(
        data.sections.map(async (sectionData, sectionIndex) => {
          const videos = await Promise.all(
            sectionData.videos.map(async (video, videoIndex) => {
              
              const videoDoc = new Video({
                title: video.name || `Video ${videoIndex + 1}`, 
                description: sectionData.description,
                videoUrl: videoFiles[videoIndex]?.url || '', 
              });
              await videoDoc.save();
              return videoDoc._id;
            })
          );

          const section = new Section({
            title: sectionData.name,
            description: sectionData.description,
            videos: videos,
          });
          await section.save();
          return section._id;
        })
      );

      
      const newCourse = new Course({
        courseId: data.courseId,
        email: email,
        name: data.courseName,
        description: data.description,
        price : data.price,
        sections: sections,
        tags: data.tags,
        language: data.language,
        thumbnail: thumbnail,
        category : data.selectedCategory
      });

      await newCourse.save();
      return true;
    } catch (error: any) {
      console.error("Error creating course:", error);
      throw error;
    }
  }

  static async getCoursesByTutor(email: string) {
    try {
      const courses = await Course.find({ email },{isBlocked : false}).populate({
        path: 'sections',
        populate: { path: 'videos' }  
      });
      return courses;
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }

  static async uploadProfileRepo(email : string , profileName :string) {
    try {
      const profile = await TutorProfile.findOneAndUpdate({email : email}, 
        {
          $set : {
            profilePhotoUrl : profileName
          }
        }
      )

      return true
    } catch (error) {
      console.error('Error uploading profile pic tutor repo:', error);
      throw error;
    }
  }

  static async findVideo(videoId : string) {
    try {
      const video = await Video.findById({_id : videoId})
      console.log(video, "video");

      return video;
      
    } catch (error : any) {
      console.log("Error in getting video  in tutor repo", error.message); 
      throw new Error(error.message);
    }
  }
}

