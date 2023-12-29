import { Link } from 'react-router-dom';
import Logout from './Logout';
import { useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { userName } from '../lib/currentUser';

const Navbar = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const userNameFromToken = userName();

  useEffect(() => {
    console.log('isLoggedIn changed:', isLoggedIn);
  }, [isLoggedIn]);

  return (
    <nav className='bg-white border-gray-200 text-2xl'>
      <div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4'>
        <Link
          to='/'
          className='flex items-center space-x-3 rtl:space-x-reverse'
        >
          <img
            src='https://flowbite.com/docs/images/logo.svg'
            className='h-8'
            alt='Flowbite Logo'
          />
          <span className='self-center text-2xl font-semibold whitespace-nowrap'>
            Rainier
          </span>
        </Link>

        <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white'>
            <li>
              <Link
                to='/'
                className='block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0'
                aria-current='page'
              >
                Home
              </Link>
            </li>
            {isLoggedIn && (
              <li>
                <Link
                  to='/dashboard'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                >
                  Dashboard
                </Link>
              </li>
            )}
            {isLoggedIn && <li>{userNameFromToken}</li>}
            {isLoggedIn && (
              <li>
                <Logout />
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link
                  to='/login'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                >
                  Login
                </Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link
                  to='/register'
                  className='block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0'
                >
                  Register
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
