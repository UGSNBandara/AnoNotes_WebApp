import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LockClosedIcon, UserIcon } from '@heroicons/react/24/outline';
import { AnimatedBackground, pageVariants, inputVariants, buttonVariants, glassCardStyle, glassInputStyle, glassButtonStyle, errorStyle } from '../../theme.jsx';

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
        <motion.div 
            className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 relative overflow-hidden"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
        >
            <AnimatedBackground />
            
            <motion.div 
                className={`${glassCardStyle} p-8 w-full max-w-md mx-4 relative z-10`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <motion.h2 
                    className="text-3xl font-bold text-center text-white mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    Welcome Back
                </motion.h2>

                <form className="space-y-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                            Username
                        </label>
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                            <motion.input
                                type="text"
                                id="username"
                                value={username}
                                name='username'
                                onChange={(e) => setUsername(e.target.value)}
                                className={`${glassInputStyle} pl-10`}
                                placeholder="Enter your username"
                                variants={inputVariants}
                                whileFocus="focus"
                                whileTap="tap"
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                    >
                        <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                            Password
                        </label>
                        <div className="relative">
                            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                            <motion.input
                                type="password"
                                id="password"
                                value={password}
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                                className={`${glassInputStyle} pl-10`}
                                placeholder="Enter your password"
                                variants={inputVariants}
                                whileFocus="focus"
                                whileTap="tap"
                            />
                        </div>
                    </motion.div>

                    <motion.button
                        onClick={loginClick}
                        className={`${glassButtonStyle} w-full flex items-center justify-center gap-2`}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <LockClosedIcon className="w-5 h-5" />
                        <span>Login</span>
                    </motion.button>
                </form>

                {errorMessage && (
                    <motion.div 
                        className={`${errorStyle} mt-6 flex items-center justify-center`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        {errorMessage}
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Login;
