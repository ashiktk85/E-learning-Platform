// userThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:7000';

export const registerUser = (userData: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}) => {
  return async () => {
    try {
      const response = await axios.post(`${url}/signUp`, userData);
      console.log(response, "this is response");
      if (response.data.status === true) {
        localStorage.setItem('userEmail' , userData.email)
        return true;
      }
    
      return response;
    } catch (error : any) {
      if (error.response.status === 409) {
        console.error("Email already in use");
        return false; 
      }  else {
        throw error;
      }
      
    }
  };
};

export const verifyOtp = (otp : string) => {
  return async () => {
    try {
      const email = localStorage.getItem('userEmail')
      const response = await axios.post(`${url}/otpVerification` , {email ,otp})   
      if(response.data.message === "verified") {
        localStorage.clear()
        return true;
      }
    } catch (error : any) {
      console.log("eror", error);
      
      if(error.response.data.message === "Wrong OTP") {
        console.log("wrong otp");
        return "wrong" 
      } else if (error.response.data.message === "OTP expired or not found") {
        return "expired"
      }
    }
  } 
}

export const login = createAsyncThunk(
  'user/authLogin',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/verifyLogin`, { email, password });
      console.log("ressss",response.data)
      return response.data.result; 
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response.data); 
    }
  }
);
   


