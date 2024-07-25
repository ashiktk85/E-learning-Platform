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
        return true;
      }
      return response;
    } catch (error) {
      throw error;
    }
  };
};

