import Home from './pages/user/Home';
import SignUp from './pages/user/Signup'
import UserLogin from "./pages/user/UserLogin";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" Component={UserLogin} />
        <Route path="/signup" Component={SignUp} />
        <Route path= '/' Component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
