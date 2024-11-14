import { ICleanedUser, ICourse, ICourseDetail, IOrder, IRating, ITutorInfo, ITutorProfile, IUser, IWallet } from "./common.interfaces";


export interface IUserRepository {
    findUser(email : string) : Promise<IUser | null>;
    findUserById(userId: string): Promise<IUser>
    getCourse(id: string): Promise<ICourse>;
    validateLoginUser(email: string,password: string): Promise<ICleanedUser>;
    createUser(userData: any): Promise<IUser>;
    editUser(userid: string,newUserInfo: object): Promise<IUser | null>;
    saveProfile(userId: string, profileUrl: string) : Promise<boolean>;
    getCourses(category: string, page: number, limit: number , filter?: string) : Promise<{courses :ICourse[],totalPages : number }>;
    courseDeatils(id: string) : Promise<any>; 
    coursePaymentWallet(userId: string,amount: any,courseName: string) : Promise<any>;
    saveOder(orderData: any) : Promise<boolean>;
    saveCourse(courseId: string, email: string) : Promise<boolean>;
    getApplicantData(email: string) : Promise<any>;
    newPayment(userId: string, data: { amount: number }) : Promise <IWallet>
    transactions(userId: string) :Promise<IWallet | null>;
    ratings(courseId: string) : Promise<IRating[]>
    orders(userId: string)  : Promise<IOrder[]>;
    verifyTutor(email: string, passcode: string) : Promise<ITutorInfo>;
    incomeWallet(userId: string) : Promise<number> 
    addRating(newRating : object) : Promise<IRating> 
}