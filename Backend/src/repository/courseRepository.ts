import mongoose, { Types } from "mongoose";
import { Course, Section, Video } from "../models/courseModel";
import TutorProfile from "../models/tutorProfileModel";

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
      description: string;
      title: string;
      videoUrl: string;
    }[];
  }[];
  additionalDetail1: string;
  price: string;
  files: { type: string; url: string }[];
}

export class CouresRepository {
  static async getUserCourses(userId: string, type: string) {
    try {
      let query: any = { users: userId };

      if (type === "purchased") {
        query.price = { $ne: "Free" };
      } else if (type === "free") {
        query.price = "Free";
      }

      const courses = await Course.find(query).populate({
        path: "sections",
        populate: { path: "videos" },
      });

      if (!courses) {
        throw new Error("Cannot find course.");
      }

      return courses;
    } catch (error: any) {
      console.log("Error in getting course detail course repo", error.message);
      throw new Error(error.message);
    }
  }

  static async updateCourse(couresId: string, newData: any) {
    try {
      console.log("course" , couresId, newData);
      
      const updated = await Course.findOneAndUpdate(
        { courseId: couresId },
        {
          $set: {
            ...newData,
          },
        },
        { new: true, upsert: true }
      );
      

      return updated;
    } catch (error: any) {
      console.log("Error in updating course detail course repo", error.message);
      throw new Error(error.message);
    }
  }

  static async updateVid(_id : string, title : string , description : string) {
    try {
      const newData = {
        title ,
        description
      }
      
      const updated = await Video.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            ...newData,
          },
        },
        { new: true, upsert: true }
      );
      

      return updated;
    } catch (error: any) {
      console.log("Error in updating course detail course repo", error.message);
      throw new Error(error.message);
    }
  }

  static async deleteVideoRepo(videoId: string, courseId: string) {
    try {
    
      const video = await Video.findByIdAndDelete(videoId);
      
      return true;
    } catch (error: any) {
      console.log('Error in deleting video from course repo', error.message);
      throw new Error(error.message);
    }
  }
  


  

  
}
