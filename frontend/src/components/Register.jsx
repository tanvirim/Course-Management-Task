import { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if any required field is empty before registration
    if (!formData.userName || !formData.email || !formData.password) {
      console.error('Please fill in all fields');
      return; // Exit registration process
    }

    try {
      const response = await axios.post(
        'http://localhost:8080/api/user/register',
        formData
      );
      console.log('Registration successful:', response.data);
      // Handle successful registration (redirect, display message, etc.)
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration error
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <input
        type='text'
        name='userName'
        placeholder='Username'
        onChange={handleChange}
      />
      <input
        type='email'
        name='email'
        placeholder='Email'
        onChange={handleChange}
      />
      <input
        type='password'
        name='password'
        placeholder='Password'
        onChange={handleChange}
      />
      <button type='submit'>Register</button>
    </form>
  );
};

export default Registration;
