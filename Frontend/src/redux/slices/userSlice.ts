import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, updateUserInfo } from '../actions/userAction';
import { toast } from 'sonner';

interface User {
  userId: string;
  firstName: string;
  email: string;
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
      .addCase(login.fulfilled, (state, action: PayloadAction<{ accessToken: string; refreshToken: string; userInfo: User }>) => {
        const { accessToken, refreshToken, userInfo } = action.payload;
        state.userInfo = userInfo;
        state.accessToken = accessToken;
        state.refreshToken = refreshToken;
        state.loading = false;

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
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
        console.log('payload', action.payload);

        if (action.payload === 'no change') {
          toast.warning('No changes made.');
        } else {
          state.userInfo = action.payload;
          state.loading = false;
          toast.success('Details updated.');
        }
      })
      .addCase(updateUserInfo.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUser, setLoading, setError } = userSlice.actions;
export default userSlice.reducer;
