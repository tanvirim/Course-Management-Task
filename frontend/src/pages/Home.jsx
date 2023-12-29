import CourseList from '../components/CourseList';

const Home = () => {
  return (
    <div className='w-full h-screen overflow-hidden bg-gray-50'>
      <CourseList className='w-full h-full' />
    </div>
  );
};

export default Home;
