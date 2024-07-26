import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login } from '../actions/userAction';

interface User {
  id: string;
  name: string;
}

interface UserState {
  userInfo: User | null;
  loading: boolean;
  error: string | null;
}

const storedData = localStorage.getItem('data');
const userInfo: User | null = storedData ? JSON.parse(storedData) : null;

const initialState: UserState = {
  userInfo: userInfo,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<{ data: User; token: string }>) => {
        const { data, token } = action.payload;
        localStorage.setItem('data', JSON.stringify(data));
        localStorage.setItem('token', token);
        state.userInfo = data;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload.message || 'Login failed';
      });
  },
});

export default userSlice.reducer;
