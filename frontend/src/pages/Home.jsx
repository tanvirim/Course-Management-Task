import CourseList from '../components/CourseList';

const Home = () => {
  return (
    <div className='w-full h-screen overflow-scroll bg-gray-50'>
      <CourseList className='w-full h-full' />
    </div>
  );
};

export default Home;
