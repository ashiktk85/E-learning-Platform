// userThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const url = 'http://localhost:7000';

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${url}/signUp`, userData);
      return response.data;
    } catch (error) {
      
    }
  }
);
