import { Request, Response } from "express";
import { TutorServices } from "../services/tutorServices";
import HTTP_statusCode from "../Enums/httpStatusCode";

export class TutorContoller {
  private tutorServices: TutorServices;

  constructor(tutorServices: TutorServices) {
    this.tutorServices = tutorServices;
  }

  async tutorApplication(req: Request, res: Response): Promise<void | boolean> {
    try {
      console.log("Inside Tutor Application Controller");

      const files = (req as any).files as {
        [fieldname: string]: Express.Multer.File[];
      };

      if (files) {
        console.log("Uploaded files:", files);
      } else {
        console.log("No files uploaded.");
      }

      console.log("Form data:", req.body);

      const data = req.body;

      await this.tutorServices.tutorApplicationService(files, data);

      res.status(200).send({ success: true, message: "Application received" });
    } catch (err: any) {
      console.error("Error in tutor application controller:", err);
      res
        .status(HTTP_statusCode.InternalServerError)
        .send({ success: false, message: "Internal Server Error" });
    }
  }

  async verifyLogin(req: Request, res: Response): Promise<any | void> {
    try {
      const { applicationId, passcode } = req.body;

      console.log(applicationId, passcode);
      const response = await this.tutorServices.verifyLoginService(
        applicationId as string,
        passcode as string
      );

      if (response) {
        res.status(200).json(response);
      }
    } catch (error: any) {
      console.error(error.message);
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async getTutorDetails(req: Request, res: Response): Promise<any> {
    try {
      const { email } = req.params;
      const response = await this.tutorServices.getApplicationDataService(
        email as string
      );

      console.log(response);

      res.status(200).json(response);
    } catch (error: any) {
      console.error(error.message);
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async editProfile(req: Request, res: Response): Promise<any | void> {
    try {
      const data = req.body;
      console.log(data);

      const response = await this.tutorServices.editProfileService(data as any);
      console.log(response, "usssss");

      res.status(200).json(response);
    } catch (error: any) {
      console.error(error.message);
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async createCourse(req: Request, res: Response) {
    try {
      const courseData = req.body;

      const { email } = req.params;

      const files = req.files as Express.Multer.File[];
      // files.forEach((file) => {
      //   console.log(file.originalname, file.buffer);
      // });

      const response = await this.tutorServices.createCourseService(
        files as any,
        courseData as any,
        email as string
      );

      res.status(200).json(response);
    } catch (error: any) {
      console.error(error.message, "dsfsdf");
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async getCourses(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const response = await this.tutorServices.getCoursesWithSignedUrls(email);

      // console.log(response, "res");

      res.status(200).json(response);
    } catch (error: any) {
      console.error(error.message, "dsfsdf");
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  // async uploadProfile(req: Request, res: Response) {
  //   try {
  //     const { email } = req.body;
  //     const file  = req.file ;
  //     console.log(email, file);

  //     if (!email || !file) {
  //       return res.status(400).json({ message: "Email and file are required." });
  //     }

  //     const response = await this.tutorServices.uploadProfile(email, file as any);

  //     res.status(201).json(response);
  //   } catch (error : any) {
  //     console.error(error.message);
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  async updateCourse(req: Request, res: Response) {
    try {
      const { courseId } = req.params;
      // console.log(req.body);
      const newData = req.body;

      const updatedCourses = await this.tutorServices.updateCourseService(
        courseId as string,
        newData
      );
      return res.status(HTTP_statusCode.updated).json(updatedCourses);
    } catch (error: any) {
      console.error(error.message, "dsfsdf");
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async updateThumbnail(req: Request, res: Response) {
    try {
      const courseId = req.body.couresId;
      const newThumbnail = req.file;

      const updateThumbnail = await this.tutorServices.updateThumbnail(
        courseId as string,
        newThumbnail
      );
      // return res.status(HTTP_statusCode.updated).json(updatedCourses)
    } catch (error: any) {
      console.error(error.message, "dsfsdf");
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async getDashboard(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const getDashboardData = await this.tutorServices.getDashboard(
        email as string
      );
      return res.status(HTTP_statusCode.OK).json(getDashboardData);
    } catch (error: any) {
      console.error(error.message, "dsfsdf");
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async ChartData(req: Request, res: Response) {
    try {
      const year =
        parseInt(req.query.year as string) || new Date().getFullYear();
      const chartdata = await this.tutorServices.getMonthlyData(year as number);
      res.status(HTTP_statusCode.OK).json(chartdata);
    } catch (error: any) {
      console.error(error.message);
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async editVideo(req: Request, res: Response) {
    try {
      const { _id, title, description } = req.body;

      const updateVieo = await this.tutorServices.updateVideo(
        _id,
        title,
        description
      );
      res.status(HTTP_statusCode.OK).json(updateVieo);
    } catch (error: any) {
      console.error(error.message);
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async deleteVideo(req: Request, res: Response) {
    try {
      const { videoId, courseId } = req.body;
      // console.log(req.body , req.body.data);

      const deleted = await this.tutorServices.deleteVideo(videoId, courseId);
      res.status(HTTP_statusCode.OK).json(deleted);
    } catch (error: any) {
      console.error(error.message);
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async addVideo(req: Request, res: Response) {
    try {
      const { sectionId } = req.params;
      const { name, description, courseId } = req.body;
      console.log(req.file);

      const newVideo = req.file;

      const added = await this.tutorServices.addVideoService(
        name,
        description,
        newVideo,
        sectionId,
        courseId
      );
      res.status(HTTP_statusCode.updated).json(added);
    } catch (error: any) {
      console.error(error.message);
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async kycVerification(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const data = req.body;
      const response = await this.tutorServices.kycVerify(
        email as string,
        data as any
      );
      res.status(HTTP_statusCode.updated).json(response);
    } catch (error: any) {
      console.error(error.message);
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }

  async checkKyc(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const response = await this.tutorServices.kycStatusCheck(email)
      console.log(response);
      
      res.status(HTTP_statusCode.updated).json(response);
    } catch (error: any) {
      console.error(error.message);
      res
        .status(HTTP_statusCode.InternalServerError)
        .json({ message: error.message });
    }
  }
}
