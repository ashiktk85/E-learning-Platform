import TutorApplication, {
  ITutorApplication,
} from "../models/applicationModel";

export class TutorRepositary {


 
  static async saveApplication(data: any): Promise<void> {
    try {
      console.log("final data before db application", data);

      const formattedData = {
        ...data,
        socialLinks: typeof data.socialLinks === 'string' ? JSON.parse(data.socialLinks) : data.socialLinks
      };
  
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
          graduationYear : 1
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
}
