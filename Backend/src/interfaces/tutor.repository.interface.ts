import { ICourse, ICourseData, IMonthlyEnrollment, IMonthlyRevenue, ITutorProfile, IVideo } from "./common.interfaces";

  
  
  export default interface ITutorRepository {
    saveApplication(data: any): Promise<void>;
    editProfile(data : any) : Promise<ITutorProfile>;
    saveCourse(data: ICourseData, email: string) : Promise<boolean> ;
    getCoursesByTutor(email: string) : Promise<ICourse[]>
    saveKyc (userId : string, data : any) : Promise<boolean> 
    getTutorDetail(email : string) : Promise<ITutorProfile>  
    addVideo (name : string, description : string , newVideo : string, sectionId : string , courseId : string) : Promise<IVideo>
    getMonthlyUserEnrollments (year : number) : Promise<IMonthlyEnrollment[]>;
    getMonthlyRevenue (year: number) : Promise<IMonthlyRevenue[]>;
  }