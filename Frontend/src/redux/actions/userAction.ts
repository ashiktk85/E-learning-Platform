import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from '../../Types/user';
import userAxiosInstance from '../../config/axiosInstance/userInstance';

const url = 'http://localhost:7000';

interface UpdateUserInfoPayload {
  userId: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}



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
export const login = createAsyncThunk<{ accessToken: string; userInfo: User }, { email: string; password: string }>(
  'user/authLogin',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/verifyLogin`, { email, password });
      return response.data.cred;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

export const resendOtp = createAsyncThunk<boolean>(
  'user/resendOtp',
  async (_, { rejectWithValue }) => {
    try {
      const email = localStorage.getItem('userEmail');
      if (!email) throw new Error('No email found in localStorage');

      const response = await axios.post(`${url}/resendOtp`, { email });
      return response.status === 200;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to resend OTP');
    }
  }
);

export const updateUserInfo = createAsyncThunk<User | 'no change', UpdateUserInfoPayload>(
  'user/updateUserInfo',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await userAxiosInstance.put(`${url}/edituser`, userData);
      if (response.data.message === 'No changes found') {
        return 'no change';
      }
      return response.data.data as User;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Update failed');
    }
  }
);
