import Home from './pages/user/HomePage';
import SignUp from './pages/user/SignupPage'
import UserLogin from "./pages/user/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import OtpPage from './pages/user/OtpPage';
import ProfilePage from './pages/user/ProfilePage';
import AdminLogin from './pages/admin/AdminloginPage';

import TVScreen from './components/common/UserCommon/404';
import UserList from './components/admin/UserList';
import UserRoutes from './Routes/userRoutes';
import AdminRoutes from './Routes/adminRoutes';
import TutorRoutes from './Routes/tutorRoutes';

function App() {
  return (
  
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
  
  );
}

export default App;
