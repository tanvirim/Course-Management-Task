import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/login',
        {
          email,
          password,
        }
      );

      localStorage.setItem('token', response.data.accessToken);

      if (localStorage.getItem('token')) {
        navigate('/dashboard');
        toast.success('Login successful'); // Display success toast
      }

      console.log('Login successful:', response.data);
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please try again.'); // Display error toast
    }
  };

  return (
    <div>
      <ToastContainer /> {/* Toast container for displaying notifications */}
      <form onSubmit={handleLogin} className='flex flex-col items-center mt-8'>
        <input
          className='border rounded px-3 py-2 mb-4'
          type='email'
          name='email'
          placeholder='Email'
          onChange={handleEmailChange}
        />
        <input
          className='border rounded px-3 py-2 mb-4'
          type='password'
          name='password'
          placeholder='Password'
          onChange={handlePasswordChange}
        />
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          type='submit'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
