import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message] = useState('');
    const navigate = useNavigate();
  
    const signUpClick = async (event) => {
      event.preventDefault();

      if(!username || !email || !password){
        setErrorMessage('All Details must be Filled !')
        return
      }

      const newuser = {
        username,
        email,
        password,
      }

      try{

        const response = await fetch('http://localhost:5555/api/users/adduser',{
          method: 'POST',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newuser),
        })

        const result = await response.json();
        
        if(!result.success){
          setErrorMessage("Signup Failed !")
          return
        }

        sessionStorage.setItem('userID', result.user._id);
        console.log(result.user._id);

        setEmail('');
        setPassword('');
        setUsername('');
               
        navigate('/home');
      }
      catch (err){
        console.log(err);
      }
    }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center bg-gradient-to-tr from-fuchsia-500 to-cyan-500">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
        <form className="space-y-4">

          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-600">
              Username
            </label>
            <input
              type="text"
              id="username"
              name='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            onClick={signUpClick}
            className="w-full bg-fuchsia-400 text-white py-2 rounded-lg hover:bg-fuchsia-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
