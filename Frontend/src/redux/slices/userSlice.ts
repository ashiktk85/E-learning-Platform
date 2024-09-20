import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, updateUserInfo } from '../actions/userAction';
import { acceptApplicaitonThunk, updateUserBlockStatus } from '../actions/adminActions';
import { toast } from 'sonner';
import { SrvRecord } from 'dns';

interface User {
  userId: string;
  firstName: string;
  lastName : String;
  phone : string;
  email: string;
  isBlocked: boolean;
  tutor ?: boolean;
  tutorCredential ?: {};

}

interface UserState {
  userInfo: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  userInfo: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUser(state) {
      state.userInfo = null;
      state.accessToken = null;
      state.refreshToken = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ accessToken: string;  userInfo: User }>) => {
        const { accessToken, userInfo } = action.payload;
        state.userInfo = userInfo;
        state.accessToken = accessToken;
        // state.refreshToken = refreshToken;
        state.loading = false;

        localStorage.setItem('accessToken', accessToken);
        // localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || 'Login failed';
      })
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserInfo.fulfilled, (state, action: PayloadAction<User | 'no change'>) => {
        if (action.payload === 'no change') {
          toast.warning('No changes made.');
        } else {
          state.userInfo = action.payload;
          state.loading = false;
        }
      })
      .addCase(updateUserInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserBlockStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserBlockStatus.fulfilled, (state, action: PayloadAction<{ email: string; isBlocked: boolean }>) => {
        const { email, isBlocked } = action.payload;
        console.log(isBlocked, "llll");
        localStorage.setItem('isBlocked', JSON.stringify(isBlocked));
        
        if (state.userInfo && state.userInfo.email === email) {
          console.log("in stte");
          
          state.userInfo.isBlocked = isBlocked;
        }
        state.loading = false;
        toast.success(`User ${isBlocked ? 'blocked' : 'unblocked'} successfully.`);
      })
      .addCase(updateUserBlockStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(acceptApplicaitonThunk.fulfilled, (state, action: PayloadAction<User>) => {
        console.log(action.payload, "action payload userinfo");
        
        state.userInfo = action.payload;
        localStorage.setItem('userInfo', JSON.stringify(action.payload));
    })
    
  },
});

export const { clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;