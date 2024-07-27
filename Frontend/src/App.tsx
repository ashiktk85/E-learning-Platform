import Home from './pages/user/Home';
import SignUp from './pages/user/Signup'
import UserLogin from "./pages/user/UserLogin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {store} from './redux/store'
import { Provider } from 'react-redux';
import OtpPage from './pages/user/OtpPage';
import ProfilePage from './pages/user/Profile';

function App() {
  return (
    <Provider store = {store}>
    <Router>
      <Routes>
        <Route path="/login" Component={UserLogin} />
        <Route path="/signup" Component={SignUp} />
        <Route path= '/' Component={Home} />
        <Route path='/otp' Component={OtpPage} />
        <Route path='/profile' Component={ProfilePage} />
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
