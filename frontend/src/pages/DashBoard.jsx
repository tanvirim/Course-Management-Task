import CourseForm from '../components/CourseCreation';
import CourseNames from '../components/CourseNames';

const DashBoard = () => {
  return (
    <div className='flex w-full h-auto overflow-scroll bg-gray-50'>
      <div className='w-1/2 flex justify-center'>
        <CourseNames />
      </div>
      <div className='w-1/2 flex justify-center'>
        <CourseForm />
      </div>
    </div>
  );
};

export default DashBoard;
