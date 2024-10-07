import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { clearAdmin } from '../slices/adminSlice'
import { Base_URL } from '../../credentials';



export const adminLogin = createAsyncThunk(
  'admin/authlogin',
  async ({ email, password }: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axios.post(`${Base_URL}/admin/adminlogin`, { email, password });
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
        const response = await axios.patch(`${Base_URL}/admin/${isBlocked ? 'block' : 'unblock'}user/${email}`);
        console.log(`User ${isBlocked ? 'blocked' : 'unblocked'} response: `, response.data);
  
        return { email, isBlocked };
      } catch (error: any) {
        console.error(`Update user block status thunk error:`, error.response?.data || error.message);
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
      }
    }
  );

  export const acceptApplicaitonThunk = createAsyncThunk(
    'user/tutorIsTrue',
    async (applicationId: any, thunkAPI) => {
      try {
        
        
        const response = await axios.post(`${Base_URL}/admin/acceptapplication/${applicationId}`);
        console.log("thunk ", response.data);
        
        return response.data;
      } catch (err: any) {
        console.error(err);
        return thunkAPI.rejectWithValue(err.response?.data || "Something went wrong");
      }
    }
  );

  export const logout = createAsyncThunk<void, void>(
    'admin/logout',
    async (_, { dispatch }) => {
      dispatch(clearAdmin());
     
    }
  );




