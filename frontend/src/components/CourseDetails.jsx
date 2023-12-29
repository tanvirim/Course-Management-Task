import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { baseUrl } from '../api/url';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  console.log(course, courseId);

  const fetchCourseDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${baseUrl}/api/courses/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourse(response.data);
      console.log('response data', response.data);
    } catch (error) {
      console.error('Error fetching course details:', error);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [courseId]);

  return (
    <div>
      <h2>Course Details</h2>
      {course ? (
        <div>
          <h3>{course.name}</h3>
          <p>Description: {course.description}</p>
          <p>Price: ${course.price}</p>
          {/* Display other course details as needed */}
        </div>
      ) : (
        <p>Loading course details...</p>
      )}
    </div>
  );
};

export default CourseDetails;
