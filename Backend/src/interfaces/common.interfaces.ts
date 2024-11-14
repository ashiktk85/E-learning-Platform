import mongoose, { Document, Types } from 'mongoose'

export interface IUser extends Document {
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    passwordHash: string;
    createdAt: Date;
    lastLogin: Date;
    tutor?: boolean;
    kyc: "Pending" | "verified" | "rejected";
    subscriptionId?: string;
    following: string[];
    followers: string[];
    referral?: string;
    isBlocked: boolean;
    tutorCredentials?: {
      email?: string;
      passwordHash?: string;
    };
    courses?: [];
    profile?: string;
  }
  export interface IEditUser  {
    firstName: string | undefined;
     lastName: string | undefined; 
     phone: string | undefined;
  }

  export interface IUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    userId: string; 
    phone?: string; 
    isBlocked: boolean;
    tutor: boolean;
    kyc?: any; 
  }


  export interface ICleanedUser {
    userId : string
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    tutor : boolean | undefined;
    isBlocked: boolean;
    profileUrl : string | ""

}


  export interface IAdminTransaction extends Document {
    transactionId: string;
    amount: number;
    timestamp: Date;
    course: {
      courseId: string;
      courseName: string;
      tutor: {
        tutorId: string;
        tutorName: string;
      };
      price: number;
    };
    status: 'pending' | 'completed' | 'failed';
  }

  export interface FileUrl extends Document{
    type: string;
    url: string;
    signedUrl?: string; 
  }
  
  export interface ITutorApplication  extends Document {
    applicationId: string;
    email: string;
    tutorRole: string;
    age: string;
    birthday: Date;
    gender: string;
    phone: string;
    degree: string;
    fieldOfStudy: string;
    institution: string;
    graduationYear: string;
    teachingExperience: string;
    subjectsOfExpertise: string;
    socialLinks: Map<string, string>;
    files: FileUrl[];
    status: 'pending' | 'accepted' | 'rejected'; 
  }

  export interface ICategory extends Document {
    name: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IVideo  extends Document {
    title: string;
    description?: string;
    videoUrl: string;
  }

  export interface ISection  extends Document {
    title: string;
    description?: string;
    videos: Types.ObjectId[]; 
  }
  
  export interface ICourse extends Document  {
    courseId: string;
    email: string;
    name: string;
    description: string;
    price : number | string;
    category: string;
    sections: Types.ObjectId[]; 
    tags: string[];
    language: string;
    ratings?: Types.ObjectId[]; 
    comments?: Types.ObjectId[];
    thumbnail?: string;
    isBlocked : boolean;
    createdAt : Date;
    users ?: [];
    averageRating ?: number ;
    totalRatings ?: number;
  }

  export interface  ICourseDetail {
    id: string | unknown;                     
    name: string;
    description: string;
    Category: string;              
    sections: ISection[];          
    tags: string[];
    language: string;
    ratings?: number[];          
    comments?: Comment[];         
    thumbnail: string;
    tutorName: string;
    tutorBio: string;
    tutorEmail?: string;
    tutorProfile?: string;
    tutorId?: string;
    education?: string;
    certifications?: string[];
    email: string;
    courseId: string;
    price: number;
    uploadedDate: Date;
    users?: number;
}

  export interface IMessage extends Document{
    userId: string;
    message: string;
    timestamp: Date;
    courseId: string;
    deleted?: boolean;
  }
  
  export interface IGroup  extends Document {
    courseId: string;
    messages: IMessage[];
    createdAt: Date;
  }

  export interface IKyc extends Document {
    userId: string;
    accountHolderName: string;
    bankName: string;
    accountNumber: string;
    accountType: 'savings' | 'current';
    ifscCode: string;
    branchName?: string;
    currency: string;
    panCard?: string;
  }

  export interface IOrder extends Document  {
    userId: string;
    courseId: string;
    totalAmount: number;
    currency: string;
    paymentId: string;
    orderId: string;
    paymentStatus: 'Pending' | 'Completed' | 'Failed';
    createdAt: Date;
    updatedAt: Date;
  }

  export interface IRating extends Document {
    courseId: string; 
    userId: string;   
    ratingValue: number;       
    review: string;          
    createdAt: Date;           
  }

 export interface IReport extends Document  {
    reportId : string;
    courseId: string;               
    reason: string;         
    additionalInfo?: string;  
    status: 'pending' | 'resolved'; 
    createdAt: Date;          
    updatedAt: Date;    
    tutorName : string;
    courseName : string;      
  }

  export interface ICleanedReport {
      reportId: string;
      courseId: string;
      reason?: string;
      additionalInfo?: string;
      status?: string;
      createdAt?: Date;
  }

  export interface IReportData {
    thumbnailUrl: string;
    tutorName: string;
    courseName: string;
    courseDescription: string;
    tutorEmail: string;
    users?: string[]; 
    report: ICleanedReport;
}


  export interface ITutorProfile extends Document  {
    userId: mongoose.Types.ObjectId; 
    email : string;
    profilePhotoUrl ?: string;
    role : string;
    country ?: string;
    language ?: String;
    bio: string;
    education : string;
    experience: string;
    socialLinks ?: {
      youtube?: string;
      instagram?: string;
      linkedin?: string;
      twitter?: string;
    };
    certifications?: {
      title: string;
      issuer: string;
      date: Date;
      certificateUrl: string;
    }[];
    createdAt: Date;
    updatedAt: Date;
  }

  export interface ITransaction  {
    amount: number;
    transactionId : string;
    transactionType: 'credit' | 'course payment';
    date?: Date;
    course?: string;
  }
  
  export interface IWallet extends Document {
    userId: string;
    balance: number;
    transactions: ITransaction[];
    createdAt?: Date;
    updatedAt?: Date;
  }

 export interface IUserAggregationResult {
    _id: {
        year: number;
        month: number;
    };
    totalUsers: number;
    totalTutors: number;
}

export interface ICourseData {
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
      name : string;
      description: string;
      title: string;
      videoUrl: string;
    }[];
  }[];
  additionalDetail1: string;
  price: string;
  files: { type: string; url: string }[];
}

export interface ITutorData {
  name: string,
  email: string,
  profileUrl: string,
  bio: string,
}

export interface ITutorInfo {
    firstName: string;
    lastName: string;
    email: string;
    userId: string;
    phone: string;
    isBlocked: boolean;
    tutor: boolean | undefined;
    tutorCredential: object,
}

export default interface INewCourseDetails {
  name ?: string;
  category ?: string;
  language ?: string;
  description ?: string;
}

export interface ITutorDashBoard {
  name: string
  profileUrl : string,
  followers: number,
  role:string,
  students: number,
  totalCourses : number,
  income: number,
}

export interface IMonthlyEnrollment  {
  _id: {
    year: number;
    month: number;
  };
  totalUsers: number;
};

export interface IMonthlyRevenue  {
  _id: {
    year: number;
    month: number;
  };
  totalRevenue: number;
};



  
  