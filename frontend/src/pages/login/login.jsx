import React, { useState } from 'react';
 import {useNavigate} from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const loginClick = async (event) => {
    event.preventDefault();

    if(!username && !password){
      setErrorMessage('Boxes are Empty!');
      return;
    }
    if(!username){
      setErrorMessage('Username is Empty!');
      return;
    }
    if(!password){
      setErrorMessage('Password is Empty!');
      return;
    }

    const logindata = {
      username,
      password,
    }

    try{
    const response = await fetch('http://localhost:5555/api/users/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logindata),
    });

    const result = await response.json();

    if(!result.success){
      setErrorMessage("Wrong userdetails!");
      return
    }

    sessionStorage.setItem('userID', result.user._id);
    console.log(result.user._id);
    
    setUsername('');
    setPassword('');
    navigate('/home');
  }
  catch(err){
    console.log(err);
  }
  }
  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-tr from-fuchsia-500 to-cyan-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              name='username'
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              name='password'
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={loginClick}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        {errorMessage && (
          <div className="flex items-center justify-center mb-4 mt-5 text-red-600 bg-red-100 border border-red-400 rounded p-2">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
