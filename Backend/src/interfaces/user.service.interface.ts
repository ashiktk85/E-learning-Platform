import { ICleanedUser, ICourse, IEditUser, IRating, ITutorData, IWallet } from "./common.interfaces";


export default interface IUserService {
    signUp(userData: any) : Promise<boolean>;
    verifyLogin(email: string,password: string): Promise<{userInfo: ICleanedUser;accessToken: string; refreshToken: string;}>;
    otpVerify(email: string, inputOtp: string): Promise<boolean>;
    resendOtp(email: any): Promise<boolean>; 
    editUser(userId : string ,updateData : object): Promise<IEditUser>;
    saveProfile(profile: Express.Multer.File, userId: string) : Promise<boolean>;
    getProfile(email: string) : Promise<string>
    getCourses(category: string , page: number, limit: number , filter?: string) : Promise<{ courses: ICourse[], totalPages : number}>;
    getCourseDetail(id: string) : Promise<any>; 
    CoursePayment(amount: number,currency: string,email: string,courseId: string) : Promise<any>;
    saveCourse(courseId: string, email: string) : Promise<boolean>;
    checkEnrollement(courseId: string, email: string) : Promise<boolean>;
    MyCourses(userId: string, type: string) : Promise<any>;
    tutorData(id: string) : Promise<ITutorData>;
    addMoney(userId: string , data : any) : Promise<void>
    getOrders(userId: string) : Promise<any>;
    getTransactions(userId: string) : Promise<IWallet | null>;
    getRatings(courseId: string): Promise<IRating[]>
    addRating(newRating : object) : Promise<IRating> ;
}