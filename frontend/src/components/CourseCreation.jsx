import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import { toast } from 'react-toastify';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Select,
  Box,
  Flex,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import axios from 'axios';

import { baseUrl } from '../api/url';
import useCourseStore from '../store/courseStore';

const CourseForm = () => {
  const fetchCourses = useCourseStore((state) => state.fetchCourses);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    description: '',
    price: '',
    duration: '',
    level: '',
    topics: '',
    schedule: {
      startDate: '',
      endDate: '',
      classDays: '',
      classTime: '',
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token, 'shahriar123');

        console.log('decoded', decodedToken);

        const userIdFromToken = decodedToken.user.id;
        setFormData((prevData) => ({
          ...prevData,
          user_id: userIdFromToken,
        }));
      } catch (error) {
        console.error('Token decoding failed:', error);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleStartDateChange = (date) => {
    setFormData({
      ...formData,
      schedule: { ...formData.schedule, startDate: date },
    });
  };

  const handleEndDateChange = (date) => {
    setFormData({
      ...formData,
      schedule: { ...formData.schedule, endDate: date },
    });
  };

  const handleClassTimeChange = (time) => {
    setFormData({
      ...formData,
      schedule: { ...formData.schedule, classTime: time },
    });
  };

  const handleClassDaysChange = (e) => {
    const { value } = e.target;
    const formattedClassDays = value
      .split(',')
      .map((day) => day.trim())
      .filter((day) => day);

    setFormData({
      ...formData,
      schedule: {
        ...formData.schedule,
        classDays: formattedClassDays.join(', '),
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${baseUrl}/api/courses`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Course uploaded:', response.data);
        fetchCourses();
        setSubmitting(false);
        setFormData({
          user_id: '',
          name: '',
          description: '',
          price: '',
          duration: '',
          level: '',
          topics: '',
          schedule: {
            startDate: '',
            endDate: '',
            classDays: '',
            classTime: '',
          },
        });
        toast.success('Course added successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 3000,
        });
      } else {
        console.error('Course upload failed:', response.statusText);
        setSubmitting(false);
      }
    } catch (error) {
      console.error('Error uploading course:', error);
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=' p-6 bg-gray-100 rounded-lg shadow-md mt-10'
    >
      <Flex className='flex flex-col  gap-10'>
        <p className='text-3xl mx-auto font-bold text-center text-gray-700 '>
          Add Course
        </p>
        <Flex className='flex gap-6 text-xl'>
          <Box className='flex flex-col gap-4'>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type='text'
                placeholder='Course Name'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='w-[400px] h-[40px] p-4 rounded-md mt-2'
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Description</FormLabel>
              <Textarea
                placeholder='Course Description'
                name='description'
                value={formData.description}
                onChange={handleChange}
                className='w-[400px] h-[100px] p-4 rounded-md'
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Price</FormLabel>
              <Input
                type='number'
                placeholder='Course Price'
                name='price'
                value={formData.price}
                onChange={handleChange}
                className='w-[400px] h-[40px] p-4 rounded-md mt-2'
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Duration</FormLabel>
              <Input
                type='text'
                placeholder='Course Duration'
                name='duration'
                value={formData.duration}
                onChange={handleChange}
                className='w-[400px] h-[40px] p-4 rounded-md mt-2'
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Level</FormLabel>
              <Select
                className=' p-4 rounded-md mt-2'
                name='level'
                value={formData.level}
                onChange={handleChange}
              >
                <option value='Beginner'>Beginner</option>
                <option value='Intermediate'>Intermediate</option>
                <option value='Advanced'>Advanced</option>
              </Select>
            </FormControl>
          </Box>

          <Box className='flex flex-col gap-4'>
            <FormControl isRequired>
              <FormLabel>Topics</FormLabel>
              <Input
                type='text'
                placeholder='Enter Topics (comma-separated)'
                name='topics'
                value={formData.topics}
                onChange={handleChange}
                className='w-[400px] h-[40px] p-4 rounded-md mt-2'
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Start Date</FormLabel>
              <DatePicker
                selected={formData.schedule.startDate}
                onChange={handleStartDateChange}
                className='w-[400px] h-[40px] p-4 rounded-md mt-2'
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>End Date</FormLabel>
              <DatePicker
                selected={formData.schedule.endDate}
                onChange={handleEndDateChange}
                className='w-[400px] h-[40px] p-4 rounded-md mt-2'
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Class Time</FormLabel>
              <div className='relative'>
                <TimePicker
                  value={formData.schedule.classTime}
                  onChange={handleClassTimeChange}
                  className='w-[200px] h-[48px] p-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500'
                />
              </div>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Class Days</FormLabel>
              <Input
                type='text'
                placeholder='Enter Class Days (comma-separated)'
                name='classDays'
                value={formData.schedule.classDays}
                onChange={handleClassDaysChange}
                className='w-[400px] h-[40px] p-4 rounded-md mt-4'
              />
            </FormControl>
          </Box>
        </Flex>
        <Button
          className='mt-4 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
          isLoading={submitting}
        >
          {submitting ? 'Adding...' : 'Upload Course'}
        </Button>
      </Flex>
    </form>
  );
};

export default CourseForm;
