import { ICategory, ICleanedUser, ICourse, IReport, IReportData, ITutorApplication, IUser, IUserAggregationResult } from "./common.interfaces";

export interface IAdminServices {
    login(email : string, password : string) : {adminAccessToken : string, adminRefreshToken : string}
    getUsersList(page: number, limit: number) : Promise<{ users: ICleanedUser[]; total: number }>;
    getTutors(page: number, limit: number) : Promise<{ tutors: ICleanedUser[]; total: number }>;
    blockUser(email : string) : Promise<boolean>;
    unBlockUser(email : string) : Promise<boolean>;
    getApplications() : Promise <ITutorApplication[]>
    findApplication(id : string) : Promise<ITutorApplication>;
    acceptApplicaiton (id : string) : Promise<boolean>;
    checkTutorStatus(email : string) : Promise<boolean | undefined>;
    createCategory(categoryName : string, description :string) : Promise<boolean>;
    getCategories() : Promise<ICategory[]>;
    reportCourse(courseId: string,reason: string,additionalInfo: string) : Promise<boolean>;
    getReports(page: number, limit: number) : Promise<{reports : IReport[] , totalPages : number}>
    getCourses(page: number, limit: number) : Promise<{courses : any,  totalCourses : number }>;
    reportDetail(reportId : string) : Promise<IReportData>;
    blockCourse(courseId : string) : Promise<string>
    unBlockCourse(courseId : string): Promise<string>
    getDashboard() : Promise<{dashboard : any, barGraphData : any}>
    getDashboard () : Promise<{dashboard:{users : number, courses : number, tutors : number}, barGraphData:IUserAggregationResult[]}> 
    getTopTutors() : Promise<IUser[]>
    getTopCourses () : Promise<ICourse[]>;
}