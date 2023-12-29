import { useEffect } from 'react';
import CourseCard from './CourseCard';
import useCourseStore from '../store/courseStore';

const CourseList = () => {
  const courses = useCourseStore((state) => state.courses);
  const fetchCourses = useCourseStore((state) => state.fetchCourses);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <div className='flex flex-col  items-center'>
      <h1 className='text-3xl mt-8'>Available Courses</h1>
      <div className='flex flex-wrap justify-center gap-6 mt-8'>
        {courses.map((course) => (
          <div
            key={course._id}
            className='max-w-xs border rounded-lg overflow-hidden shadow-md'
          >
            <CourseCard course={course} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
