import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );

  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem('token'));
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <nav className='bg-red-400 p-4'>
      <ul className='flex justify-center space-x-4'>
        <li>
          <Link to='/' className='text-white hover:text-gray-200'>
            Home
          </Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to='/dashboard' className='text-white hover:text-gray-200'>
              Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Logout onLogout={handleLogout} />
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link to='/login' className='text-white hover:text-gray-200'>
              Login
            </Link>
          </li>
        )}
        {!isAuthenticated && (
          <li>
            <Link to='/register' className='text-white hover:text-gray-200'>
              Register
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
