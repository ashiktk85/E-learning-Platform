import { IUser, ICourse, ICategory, ITutorApplication, IReport, ICleanedReport, IUserAggregationResult } from './common.interfaces';

export interface IAdminRepository {
  getUsers(page: number, limit: number): Promise<{ users: IUser[]; total: number }>;
  getTutors(page: number, limit: number): Promise<{ tutors: IUser[]; total: number }>
  blockUser(email: string): Promise<boolean>;
  unBlockUser(email: string): Promise<boolean>;
  getApplications(): Promise<ITutorApplication[]>;
  findApplication(id : string) : Promise<ITutorApplication | null>;
  addTutorCredential(email : string , passcode : string) : Promise<boolean >;
  createCategory (categoryName: string, description: string): Promise<boolean>;
  getCategories(): Promise<ICategory[]>;
  saveReport(reportData : object) : Promise<boolean>;
  getReports(skip: number, limit: number) : Promise <IReport[]>;
  countReports() : Promise<number>;
  getCourses(skip: number, limit: number) : Promise<{courses :ICourse[] , totalCourses : number}>; 
  blockCourse(courseId: string) : Promise<string>
  unBlockCourse(courseId: string) : Promise<string> 
  reportDetail(reportId: string) : Promise<ICleanedReport>
  getDasboard() : Promise<{users : number, courses : number, tutors : number}>
  getUserAndTutorStatsByMonth(): Promise<IUserAggregationResult[]>;
  getTopTutors() : Promise<any>;
  getTopCourses(): Promise<any>
  adminPaymentWallet(adminShare : any, data :any) : Promise<any> 
}
