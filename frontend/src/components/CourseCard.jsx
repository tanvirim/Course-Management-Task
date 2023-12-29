/* eslint-disable react/prop-types */

const CourseCard = ({ course }) => {
  return (
    <div className='bg-gradient-to-br from-purple-400 to-indigo-600 rounded-lg overflow-hidden shadow-lg p-6 text-white'>
      <h3 className='text-2xl font-semibold mb-2'>{course.name}</h3>
      <p className='text-gray-100 mb-4'>{course.description}</p>
      <div className='flex items-center mb-4'>
        <span className='mr-2 font-semibold'>Price:</span>
        <span>{course.price}</span>
      </div>
      <div className='flex items-center mb-4'>
        <span className='mr-2 font-semibold'>Duration:</span>
        <span>{course.duration}</span>
      </div>
      <div className='flex items-center mb-4'>
        <span className='mr-2 font-semibold'>Level:</span>
        <span>{course.level}</span>
      </div>
      <div className='flex items-center mb-4'>
        <span className='mr-2 font-semibold'>Topics:</span>
        <ul className='list-disc pl-4'>
          {course.topics.map((topic, index) => (
            <li key={index}>{topic}</li>
          ))}
        </ul>
      </div>
      <div className='flex items-center mb-4'>
        <span className='mr-2 font-semibold'>Schedule:</span>
        <div>
          <p>
            Start Date: {course.schedule.startDate} - End Date:{' '}
            {course.schedule.endDate}
          </p>
          <p>
            Class Days: {course.schedule.classDays} - Class Time:{' '}
            {course.schedule.classTime}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
