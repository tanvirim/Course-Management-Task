import { NavLink } from 'react-router-dom';
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
        <NavLink
          to='/'
          exact
          className='flex items-center space-x-3 rtl:space-x-reverse'
          activeClassName='text-blue-600'
        >
          <img
            src='https://flowbite.com/docs/images/logo.svg'
            className='h-8'
            alt='Flowbite Logo'
          />
          <span className='self-center text-2xl font-semibold whitespace-nowrap'>
            Rainier
          </span>
        </NavLink>

        <div id='navbar-default'>
          <ul className='font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white'>
            <li>
              <NavLink
                to='/'
                exact
                className='block py-2 px-3 rounded md:bg-transparent md:p-0'
                activeClassName='text-white bg-blue-700'
              >
                Home
              </NavLink>
            </li>
            {isLoggedIn && (
              <li>
                <NavLink
                  to='/dashboard'
                  className='block py-2 px-3 rounded md:hover:bg-transparent md:p-0'
                  activeClassName='text-gray-900 bg-gray-100'
                >
                  Dashboard
                </NavLink>
              </li>
            )}

            {isLoggedIn && (
              <li className='text-blue-600'>{userNameFromToken}</li>
            )}
            {isLoggedIn && (
              <li className='text-red-600'>
                <Logout />
              </li>
            )}

            {!isLoggedIn && (
              <li>
                <NavLink
                  to='/login'
                  className='block py-2 px-3 rounded md:hover:bg-transparent md:p-0'
                  activeClassName='text-gray-900 bg-gray-100'
                >
                  Login
                </NavLink>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <NavLink
                  to='/register'
                  className='block py-2 px-3 rounded md:hover:bg-transparent md:p-0'
                  activeClassName='text-gray-900 bg-gray-100'
                >
                  Register
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
