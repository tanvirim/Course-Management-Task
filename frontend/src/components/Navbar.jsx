import { Link } from 'react-router-dom';
import Logout from './Logout';

const Navbar = () => {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <nav className='bg-red-400'>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        {isAuthenticated && (
          <li>
            <Link to='/dashboard'>Dashboard</Link>
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Logout />
          </li>
        )}
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
