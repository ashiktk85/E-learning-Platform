import Home from './pages/user/HomePage';
import SignUp from './pages/user/SignupPage'
import UserLogin from "./pages/user/LoginPage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {store} from './redux/store'
import { Provider } from 'react-redux';
import OtpPage from './pages/user/OtpPage';
import ProfilePage from './pages/user/ProfilePage';
import AdminLogin from './pages/admin/AdminloginPage';

function App() {
  return (
    <Provider store = {store}>
    <Router>
      <Routes>

        //user Routes
        <Route path="/login" Component={UserLogin} />
        <Route path="/signup" Component={SignUp} />
        <Route path= '/' Component={Home} />
        <Route path='/otp' Component={OtpPage} />
        <Route path='/profile' Component={ProfilePage} />

        // Admin Routes
        <Route path = '/adminlogin' Component={AdminLogin} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
