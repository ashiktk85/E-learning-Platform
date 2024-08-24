import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCredentials, clearCredentials } from '../slices/authSlice';
import userAxiosInstance from '../../config/axiosInstance/userInstance';
import { RootState } from '../store';

const url = "http://localhost:7000";

export const refreshAccessToken = createAsyncThunk(
  'auth/refreshAccessToken',
  async (_, { dispatch, getState }) => {
    const state = getState() as RootState; 
    const { userInfo } = state.auth;

    if (!userInfo) {
      dispatch(clearCredentials());
      throw new Error('User information is missing.');
    }

    try {
  
      const response = await userAxiosInstance.post(`${url}/refresh-token`, {}, {
        withCredentials: true, 
      });

      dispatch(setCredentials({
        accessToken: response.data.accessToken,
        userInfo: userInfo,
      }));
    } catch (error) {
      dispatch(clearCredentials());
      throw error;
    }
  }
);
