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
    <div className='flex flex-wrap justify-center gap-6 mt-16'>
      {courses.map((course) => (
        <div
          key={course._id}
          className='max-w-xs border rounded-lg overflow-hidden shadow-md'
        >
          <CourseCard course={course} />
        </div>
      ))}
    </div>
  );
};

export default CourseList;
