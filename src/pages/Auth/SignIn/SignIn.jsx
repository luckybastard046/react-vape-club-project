import React, { useState, useEffect, useRef } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";

import { useAuth } from '../../../appwrite/context/AuthContext';

import { setUser } from '../../../store/features/auth/authSlice';

import { motion } from 'framer-motion';
import { 
  account, 
  databases,
  ID, 
  Query
} from '../../../appwrite/appwriteClient';

import ErrorMessage from '../../../components/UI/ErrorMessage/ErrorMessage';
import WrapperAuth from '../../../layout/Wrappers/WrapperAuth/WrapperAuth';

import authImage from '../../../assets/images/lock.png';

import { LuEye, LuEyeOff } from 'react-icons/lu';
import { BsShieldLockFill } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';
import { TbLockPassword } from 'react-icons/tb';

import { toast } from 'react-toastify';

import '../Auth.scss';

const SignIn = () => {
  const { 
    user,
    setUser,
    loading,
    setLoading,
    loginUser, 
    setIsAuthReady, 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const [isVisible, setIsVisible] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const processedRef = useRef(false);
  const isProcessingRef = useRef(false);

  const DATABASE_ID = '69ec27a400008e34e099';
  const USERS_COLLECTION_ID = 'users';

  const textPasswordShow = () => {
    setPasswordShow(passwordShow ? false : true);
  };

  const validate = () => {
    let errorMessage = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegexUpper = /^(?=.*[A-Z])/;
    const passwordRegexLower = /^(?=.*[a-z])/;
    const passwordRegexNum = /(?=.*\d)/;
    const passwordRegexChar = /(?=.*[@$!%*?&])/;

    if (
      !email ||
      email === '' ||
      email.trim() !== '' ||
      email.length === 0 ||
      email === null
    ) {
      errorMessage.email = 'Enter email!';
    } else if (!emailRegex.test(email)) {
      errorMessage.email = 'Enter valid email!';
    }

    if (!password) {
      errorMessage.password = 'Enter password!';
    } else if (
      password === '' ||
      password.trim() !== '' ||
      password.length === 0 ||
      password === null
    ) {
      errorMessage.password = 'Enter password!';
    } else if (password.length < 8) {
      errorMessage.password = 'Password should be 8 characters long!';
    } else if (!passwordRegexUpper.test(password)) {
      errorMessage.password = 'Password must contain at least 1 uppercase letter!';
    } else if (!passwordRegexLower.test(password)) {
      errorMessage.password = 'Password must contain at least 1 lowercase letter!';
    } else if (!passwordRegexNum.test(password)) {
      errorMessage.password = 'Password must have at least 1 digit!';
    } else if (!passwordRegexChar.test(password)) {
      errorMessage.password = 'Password must have at least 1 character!';
    }

    setErrors(errorMessage);
    return Object.keys(errorMessage).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    validate();
    
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);
    
    if (email.trim() !== '' || password.trim() !== '') {
      try {
        await loginUser({email, password});
      } catch(error) {
        console.log(error);
      }
    } else {
      console.log('Something went wrong...');
    }
    
  };
   
  return (
    <WrapperAuth title='Sign In' icon={<BsShieldLockFill size={25} />}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form
          className="auth-form"
          id="login"
          autoComplete="off"
        >
          <div className='auth-form-image'>
            <img src={authImage} alt='' />
          </div>
          <div className='auth-form-group'>
            <div className="auth-group">
              <label>Email: </label>
              <div>
                <div className="group-items">
                  <div className="icon">
                    <MdAlternateEmail size={20} />
                  </div>
                  <input
                    name="email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email..."
                    autoComplete="off"
                  />
                </div>
              </div>
              {isVisible ? <ErrorMessage errorText={errors.email} errorType='warning' /> : null}                     
            </div>
          </div>
          <div className='auth-form-group'>
            <div className="auth-group">
              <label>Password: </label>
              <div>
                <div className="group-items">
                  <div className="icon">
                    <TbLockPassword size={20} />
                  </div>
                  <input
                    name="password"
                    id="password"
                    type={passwordShow ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password..."
                    autoComplete="off"
                  />
                  <i onClick={textPasswordShow}>
                    {(passwordShow ? false : true) ? (
                      <LuEyeOff size={18} />
                    ) : (
                      <LuEye size={18} />
                    )}
                  </i>
                </div>
              </div>
              {isVisible ? <ErrorMessage errorText={errors.password} errorType='warning' /> : null}        
            </div>
          </div>

          <div className="submit-group">
            <div className="submit-buttons">
              <button type="button" onClick={handleLogin} className="btn btn-submit">
                Přihlásit se
              </button>
            </div>
            <div className="submit-content">
              <p>
                Still don't have an account? <Link to="/sign-up">Registrovat se</Link>
              </p>
              <p>
                <Link to='/forgot-password'>Forgot Password</Link>
              </p>
            </div>
          </div>
        </form>
      </motion.div>
    </WrapperAuth>
  );
};

export default SignIn;
