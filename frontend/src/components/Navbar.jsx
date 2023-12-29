import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

const Navbar = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  useEffect(() => {
    // This effect will trigger whenever isLoggedIn changes
    console.log('isLoggedIn changed:', isLoggedIn);
    // Perform any actions or UI updates based on isLoggedIn changes
    // For example, you can update the Navbar UI or trigger some side effects
  }, [isLoggedIn]);

  return (
    <nav className='bg-red-400 p-4'>
      <ul className='flex justify-center space-x-4'>
        <li>
          <Link to='/' className='text-white hover:text-gray-200'>
            Home
          </Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to='/dashboard' className='text-white hover:text-gray-200'>
              Dashboard
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Logout />
          </li>
        )}
        {!isLoggedIn && (
          <li>
            <Link to='/login' className='text-white hover:text-gray-200'>
              Login
            </Link>
          </li>
        )}
        {!isLoggedIn && (
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
