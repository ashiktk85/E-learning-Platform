import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { clearAdmin } from '../slices/adminSlice'

const url = 'http://localhost:7000';

export const adminLogin = createAsyncThunk(
  'admin/authlogin',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${url}/admin/adminlogin`, { email, password });
      console.log("Admin login response: ", response.data.data);

      return response.data.data;
    } catch (error: any) {
      console.error("Admin login thunk error:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);


export const updateUserBlockStatus = createAsyncThunk(
    'user/updateUserBlockStatus',
    async ({ email, isBlocked }: { email: string; isBlocked: boolean }, thunkAPI) => {
      try {
        const response = await axios.patch(`${url}/admin/${isBlocked ? 'block' : 'unblock'}user/${email}`);
        console.log(`User ${isBlocked ? 'blocked' : 'unblocked'} response: `, response.data);
  
        return { email, isBlocked };
      } catch (error: any) {
        console.error(`Update user block status thunk error:`, error.response?.data || error.message);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  export const logout = createAsyncThunk<void, void>(
    'admin/logout',
    async (_, { dispatch }) => {
      dispatch(clearAdmin());
     
    }
  );




