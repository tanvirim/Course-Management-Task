import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-time-picker/dist/TimePicker.css';

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  Textarea,
  Select,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-time-picker';
import axios from 'axios';
import useCourseNameStore from '../store/caourseNames';

const CourseForm = () => {
  const fetchCourses = useCourseNameStore((state) => state.fetchCourses);
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
    // Decode the token and extract user details
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token, 'shahriar123');

        console.log('decoded', decodedToken);
        // Assuming the token has a field 'userId' with the user ID
        const userIdFromToken = decodedToken.user.id;
        setFormData((prevData) => ({
          ...prevData,
          user_id: userIdFromToken,
        }));
      } catch (error) {
        console.error('Token decoding failed:', error);
      }
    }
  }, []); // Run this effect only once on component mount

  const [submitting, setSubmitting] = useState(false);

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
      const response = await axios.post(
        'http://localhost:8080/api/courses',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

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
      } else {
        console.error('Course upload failed:', response.statusText);
        setSubmitting(false);
        // Handle error scenario based on the response status
      }
    } catch (error) {
      console.error('Error uploading course:', error);
      setSubmitting(false);
      // Handle error scenario
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={4}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type='text'
            placeholder='Course Name'
            name='name'
            value={formData.name}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            placeholder='Course Description'
            name='description'
            value={formData.description}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Price</FormLabel>
          <Input
            type='text'
            placeholder='Course Price'
            name='price'
            value={formData.price}
            onChange={handleChange}
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
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Level</FormLabel>
          <Select
            placeholder='Select level'
            name='level'
            value={formData.level}
            onChange={handleChange}
          >
            <option value='Beginner'>Beginner</option>
            <option value='Intermediate'>Intermediate</option>
            <option value='Advanced'>Advanced</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Topics</FormLabel>
          <Input
            type='text'
            placeholder='Enter Topics (comma-separated)'
            name='topics'
            value={formData.topics}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Start Date</FormLabel>
          <DatePicker
            selected={formData.schedule.startDate}
            onChange={handleStartDateChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>End Date</FormLabel>
          <DatePicker
            selected={formData.schedule.endDate}
            onChange={handleEndDateChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Class Time</FormLabel>
          <TimePicker
            value={formData.schedule.classTime}
            onChange={handleClassTimeChange}
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Class Days</FormLabel>
          <Input
            type='text'
            placeholder='Enter Class Days (comma-separated)'
            name='classDays'
            value={formData.schedule.classDays}
            onChange={handleClassDaysChange}
          />
        </FormControl>

        <Button mt={4} colorScheme='teal' type='submit' isLoading={submitting}>
          {submitting ? 'Adding...' : 'Upload Course'}
        </Button>
      </Stack>
    </form>
  );
};

export default CourseForm;
