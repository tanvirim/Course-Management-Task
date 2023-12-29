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
    <Box p={8} bg='gray.200' minH='100vh'>
      <Heading as='h2' mb={4} fontSize='2xl' textAlign='center'>
        Course Details
      </Heading>
      {course ? (
        <Flex direction='column' alignItems='center'>
          <Box
            bg='white'
            p={6}
            borderRadius='md'
            boxShadow='md'
            mb={4}
            w='400px'
            maxW='90%'
          >
            <Heading as='h3' mb={2} fontSize='xl'>
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
            {/* Display other course details */}
          </Box>
          {/* Add more Box components for other properties */}
        </Flex>
      ) : (
        <Text>Loading course details...</Text>
      )}
    </Box>
  );
};

export default CourseDetails;
