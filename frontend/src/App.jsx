import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';

import Login from './components/Login';
import Registration from './components/Register';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import CourseDetails from './components/CourseDetails';
import Footer from './components/Footer';
import { useAuthStore } from './store/authStore';

const App = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='register' element={<Registration />} />
          <Route path='login' element={<Login />} />
          <Route
            path='/dashboard'
            element={
              isLoggedIn ? <DashBoard /> : <Navigate replace to='/login' />
            }
          />
          <Route path='/course-details/:courseId' element={<CourseDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
