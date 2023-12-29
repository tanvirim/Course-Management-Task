import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../api/url';
import { Box, Flex, Heading, Text } from '@chakra-ui/react';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);

  const fetchCourseDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourse(response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  return (
    <Box minH='100vh'>
      {course ? (
        <Flex direction='column' alignItems='center'>
          <Box className=' flex flex-col gap-4 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <Heading
              as='h2'
              textAlign='center'
              className='text-blue-500 text-2xl font-semibold p-2'
            >
              Course Details
            </Heading>
            <Heading as='h3' className='text-2xl '>
              {course.name}
            </Heading>
            <Text mb={2}>Description: {course.description}</Text>
            <Text>Price: ${course.price}</Text>
            <Text>Duration: {course.duration}</Text>
            <Text>Level: {course.level}</Text>
            <Text>Topics: {course.topics}</Text>
            <Text>Start Date: {course.schedule.startDate}</Text>
            <Text>End Date: {course.schedule.endDate}</Text>
            <Text>Class Days: {course.schedule.classDays}</Text>
            <Text>Class Time: {course.schedule.classTime}</Text>
          </Box>
        </Flex>
      ) : (
        <Text>Loading course details...</Text>
      )}
    </Box>
  );
};

export default CourseDetails;
