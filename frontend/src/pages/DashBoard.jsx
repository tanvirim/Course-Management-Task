import CourseForm from '../components/CourseCreation';

import CourseNames from '../components/CourseNames';

const DashBoard = () => {
  return (
    <div className='flex'>
      <CourseNames />
      <CourseForm />
    </div>
  );
};

export default DashBoard;
