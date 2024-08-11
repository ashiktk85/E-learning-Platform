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
}
