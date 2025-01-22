import React from 'react';
import {useNavigate} from 'react-router-dom'



const StartPage = () => {

    const navigate = useNavigate();

    const loginButtonClick = () => {
        navigate('/login');
    }

    const signupButtonClick = () => {
        navigate('/signup');
    }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-fuchsia-500 to-cyan-500">
      <h1 className="font-mono font-bold text-white mb-10 sm:mb-15 lg:mb-20 text-5xl sm:text-6xl lg:text-7xl ">Ano_Notes</h1>

      <p className="text-xl sm:text-2xl font-semibold text-white text-center max-w-xl mb-8 font-mono p-4">
      Create a link, share it with your friends, and get anonymous funny notes about you!
      </p>

      <div className="flex space-x-10 p-5">
        <button
          onClick={loginButtonClick}
          className="px-6 sm:px-20 lg:px-30 py-3 sm:py-4 text-xl sm:text-2xl font-semibold bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
        >
          Login
        </button>
        <button
          onClick={signupButtonClick}
          className="px-6 sm:px-20  py-3 sm:py-4 text-xl sm:text-2xl font-semibold bg-fuchsia-500 text-white rounded-lg shadow-md hover:bg-fuchsia-600 transition duration-300"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default StartPage;
