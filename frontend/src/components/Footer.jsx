const Footer = () => {
  return (
    <footer className='w-full flex justify-center align-middle p-4'>
      <div>
        <span className='text-2xl text-gray-500 sm:text-center dark:text-gray-400'>
          © 2023{' '}
          <a
            href='https://tanvir-mitul.netlify.app/'
            className='hover:underline'
          >
            Tanvir Mitul™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
