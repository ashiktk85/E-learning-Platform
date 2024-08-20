import TutorApplication, {
  ITutorApplication,
} from "../models/applicationModel";
import TutorProfile from "../models/tutorProfileModel";

import userModel from "../models/userModel";

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
      return true;
      
      
    } catch (error : any) {
      console.error("Error editing tutor profile repo:", error);
      throw error;
    }
  }
}
