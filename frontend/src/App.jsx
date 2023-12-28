import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import Registration from './components/Register';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';

const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');

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
              isAuthenticated ? <DashBoard /> : <Navigate replace to='/login' />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
