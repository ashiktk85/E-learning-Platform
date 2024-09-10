import Home from './pages/UserPages/HomePage';
import SignUp from './pages/UserPages/SignupPage'
import UserLogin from "./pages/UserPages/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import OtpPage from './pages/UserPages/OtpPage';
import ProfilePage from './pages/UserPages/ProfilePage';
import AdminLogin from './pages/AdminPages/AdminloginPage';

import TVScreen from './components/common/UserCommon/404';
import UserList from './pages/AdminPages/UserListPage';
import UserRoutes from './Routes/userRoutes';
import AdminRoutes from './Routes/adminRoutes';
import TutorRoutes from './Routes/tutorRoutes';
import {NextUIProvider} from "@nextui-org/react";
import { useEffect } from 'react';
import { refreshAccessToken } from './redux/actions/authAciton';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './redux/store';

function App() {

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
   
    dispatch(refreshAccessToken());
  }, [dispatch]);
  
  return (
    <NextUIProvider>
  
    <Router>
      <Routes>
        <Route path='/404' Component={TVScreen} />

        //user Routes
        <Route path = '/*' element = {<UserRoutes />} />

        // Admin Routes
        <Route path = '/admin/*' element={<AdminRoutes />} />

        //Tutor Routes 
        <Route path = '/tutor/*' element = {<TutorRoutes />} />
        
      </Routes>
    </Router>
    </NextUIProvider>
  
  );
}

export default App;
function dispatch(arg0: any) {
  throw new Error('Function not implemented.');
}

