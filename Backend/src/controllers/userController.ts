import { Request, Response } from "express";
import secret_key from "../config/jwtConfig";
import { UserService } from "../services/userServices";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      await this.userService.signUp(data);
      res.status(201).json({ status: true });
    } catch (error: any) {
      console.log("Error in create user controller", error);
      if (error.message === "Email already in use") {
        res.status(409).json({ message: error.message });
      } else {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
  }

  async otpVerification(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body;
      console.log("Received data:", data);

      await this.userService.otpVerify(data.email, data.otp);

      res.status(200).json({ message: "verified" });
    } catch (error: any) {
      console.error("Error during OTP verification:", error.message);

      if (error.message === "Wrong OTP") {
        res.status(409).json({ message: "Wrong OTP" });
      } else if (error.message === "OTP expired or not found") {
        console.log("otp expired");

        res.status(409).json({ message: "OTP expired or not found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  async verifyLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const result = await this.userService.verifyLogin(email, password);

      res.status(200).json({ message: "Login successful", result });
    } catch (error: any) {
      console.error(error.message);
      res.status(500).json({ message: error.message });
    }
  }

  async resendOtp (req: Request, res: Response) {
    try {
       const {email} = req.body
        console.log("resend getting here");
        console.log("controller email resend" , email);
        
        
        const result = await this.userService.resendOtp(email)
    } catch (error) {
        
    }
  }
}
