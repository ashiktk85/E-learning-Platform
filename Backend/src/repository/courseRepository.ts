import { Course , Section , Video } from "../models/courseModel";
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
        description: string; title: string; videoUrl: string 
  }[];
    }[];
    additionalDetail1: string;
    price: string;
    files: { type: string; url: string }[];
  }

 

export class CouresRepository {

    static async getUserCourses(userId : string , type : string) {
        try {

            let query: any = { users: userId }; 

      
            if (type === 'purchased') {
                query.price = { $ne: 'Free' };
            } else if (type === 'free') {
                query.price = 'Free'; 
            }
    
            const courses = await Course.find(query).populate({
                path: 'sections',
                populate: { path: 'videos' }  
              });

              if(!courses) {
                throw new Error("Cannot find course.")
              }
      
            
            return courses;
           
        } catch (error : any) {
            console.log("Error in getting course detail course repo", error.message); 
            throw new Error(error.message);
        }
    }
}
  