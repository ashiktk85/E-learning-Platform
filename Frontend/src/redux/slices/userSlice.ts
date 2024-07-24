import { createSlice , PayloadAction } from "@reduxjs/toolkit";


interface User {
    id : string,
    name : string,
    
}

interface UserState {
    userInfo : User | null;
    loading : boolean
    error : string | null
}

const storedData = localStorage.getItem("data");
const userInfo: User | null = storedData ? JSON.parse(storedData) : null;

const initialState: UserState = {
    userInfo: userInfo,
    loading: false,
    error: null,
  };

  const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
         
    }
  })

  export default userSlice.reducer;