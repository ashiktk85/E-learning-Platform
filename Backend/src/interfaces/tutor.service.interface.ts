import INewCourseDetails, { ICourse, IMonthlyEnrollment, IMonthlyRevenue, ITutorDashBoard, ITutorInfo, ITutorProfile, IVideo } from "./common.interfaces";

export default interface ITutorService {
    tutorApplication(files: any, data: any): Promise<void>;
    verifyLogin(applicationId: string,passcode: string): Promise<ITutorInfo>;
    getApplicationData(email: string): Promise<any>;
    createCourse( files: any, courseData: any, email: string) : Promise<boolean>;
    editProfile(data: any) : Promise<ITutorProfile>;
    getCoursesWithSignedUrls(email: string) : Promise<ICourse[]>
    kycVerify(email : string, data : any) : Promise<boolean>
    kycStatusCheck(email : string) : Promise<boolean> 
    updateCourse(courseId: string, newData: any) : Promise<INewCourseDetails>
    getDashboard(email: string) : Promise<ITutorDashBoard> 
    updateVideo(_id : string, title : string , description : string) : Promise<IVideo>
    deleteVideo(videoId : string, courseId : string ) : Promise<boolean | null>
    addVideo(name : string, description : string , newVideo : any, sectionId : string , courseId : string) : Promise<IVideo>
    getMonthlyData(year: number) :  Promise<{enrollments : IMonthlyEnrollment[] ,revenue :IMonthlyRevenue[] }>
}