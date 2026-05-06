import React, { useState, useEffect, useRef, use } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import Select from 'react-select';

import { databases, account, ID, Query, storage } from '../../../appwrite/appwriteClient';
import { useAuth } from '../../../appwrite/context/AuthContext';

import WrapperAuth from '../../../layout/Wrappers/WrapperAuth/WrapperAuth';

import ErrorMessage from '../../../components/UI/ErrorMessage/ErrorMessage';
import ButtonSelect from '../../../components/UI/ButtonSelect/ButtonSelect';

import { LuEye, LuEyeOff, LuUser } from 'react-icons/lu';
import { BsInputCursorText, BsShieldLockFill } from 'react-icons/bs';
import { MdAlternateEmail } from 'react-icons/md';
import { TbLockPassword } from 'react-icons/tb';
import { FaPerson, FaPagelines } from "react-icons/fa6";
import { PiGenderIntersex } from "react-icons/pi";
import { IoImageOutline } from "react-icons/io5";

import lockImage from '../../../assets/images/lock.png';

import userMaleGender from '../../../assets/images/user-man.png';
import userFemaleGender from '../../../assets/images/user-woman.png';

import authImage from '../../../assets/images/lock.png';

import { toast } from 'react-toastify';

import '../Auth.scss';

const options = [
  { id: 1, value: 'Man', label: 'Man', imageUrl: userMaleGender },
  { id: 2, value: 'Woman', label: 'Woman', imageUrl: userFemaleGender },
];

const SignUp = () => {
  const { registerUser } = useAuth();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState(18);

  const [selectedOption, setSelectedOption] = useState(options[0]);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});

  const [color, setColor] = useState("black");

  /* const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); */

  const [passwordShow, setPasswordShow] = useState(false);
  const [confirmPasswordShow, setConfirmPasswordShow] = useState(false);

  const [isVisible, setIsVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const processedRef = useRef(false);
  const isProcessingRef = useRef(false);

  const DATABASE_ID = '69ec27a400008e34e099';
  const USERS_COLLECTION_ID = 'users';
  const BUCKET_ID = '69ec315a00269f2f4dd2';

  useEffect(() => {
    if (age < 18) {
      setColor("red"); // Change to red if age > 18
    } else {
      setColor("black"); // Otherwise green
    }
  }, [age]);

  /*   useState(() => {
      if (genderImageOption === userManImage) {
        setGenderImageOption(userManImage)
      } else {
        setGenderImageOption(userWomanImage)
      }
    }, [genderImageOption]); */
    
  const textPasswordShow = () => {
    setPasswordShow(passwordShow ? false : true);
  };

  const textConfirmPasswordShow = () => {
    setConfirmPasswordShow(confirmPasswordShow ? false : true);
  };

  /*   const handleDisabilityChange = (option) => {
      setSelectedDisabilityOption(option);
    }; */

  const validate = () => {
    let errorMessage = {};
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const passwordRegexUpper = /^(?=.*[A-Z])/;
    const passwordRegexLower = /^(?=.*[a-z])/;
    const passwordRegexNum = /(?=.*\d)/;
    const passwordRegexChar = /(?=.*[@$!%*?&])/;

    if (!name) {
      errorMessage.name = 'Enter name!';
    } else if (
      name === '' || 
      name.trim() !== '' || 
      name.length === 0 || 
      name === null
    ) {
      errorMessage.name = 'Enter name!';
    }

    if (!username) {
      errorMessage.username = 'Enter username!';
    } else if (
      username === '' ||
      username.trim() !== '' ||
      username.length === 0 ||
      username === null
    ) {
      errorMessage.username = 'Enter username!';
    }

    if (
      !age ||
      age === ''
    ) {
      errorMessage.age = 'Enter age!';
    }

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
    } else if (password !== confirmPassword) {
      errorMessage.password = "Password does not match!";
    }

    if (
      !confirmPassword ||
      confirmPassword.trim() !== '' ||
      confirmPassword.length === 0 ||
      confirmPassword === null
    ) {
      errorMessage.confirmPassword = 'Please enter confirm password!';
    }

    setErrors(errorMessage);
    return Object.keys(errorMessage).length === 0;
  };


  const handleRegister = async (e) => {
    e.preventDefault();

    validate();

    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 4000);

    
    if (name !== '' || username !== '' || email.trim() !== '' || password.trim() !== '' || password !== confirmPassword) {      
      try {
        await registerUser(email, password, name, { 
          name, 
          username, 
          email, 
          password, 
          age: parseInt(age, 10),
          gender: selectedOption.label,
          genderImage: selectedOption.imageUrl,
        })
      } catch(error) {
        console.log(error);
      }
    } else {
      console.log('Something went wrong...')
    }
  };

  return (
    <WrapperAuth title="Sign Up" icon={<BsShieldLockFill size={25} />}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <form
          className="auth-form"
          id="register"
          autoComplete="off"
        >
          <div className='auth-form-image'>
            <img src={authImage} alt='' />
          </div>
          <div className='auth-form-group'>
            <div className="auth-group">
              <label>Full name: </label>
              <div>
                <div className="group-items">
                  <div className="icon">
                    <LuUser size={20} />
                  </div>
                  <input
                    name="name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter name..."
                    autoComplete="off"
                  />
                </div>
              </div>
              {isVisible ? <ErrorMessage errorText={errors.name} errorType='warning' /> : null}        
            </div>
          </div>
          <div className='auth-form-group'>
            <div className="auth-group">
              <label>Username: </label>
              <div>
                <div className="group-items">
                  <div className="icon">
                    <LuUser size={20} />
                  </div>
                  <input
                    name="username"
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username..."
                    autoComplete="off"
                  />
                </div>
              </div>
              {isVisible ? <ErrorMessage errorText={errors.username} errorType='warning' /> : null}        
            </div>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px'}}>
               <div className="auth-group">
                <div>
                  <ButtonSelect
                      defaul
                      value={selectedOption}
                      options={options}
                      onChange={setSelectedOption}
                    />
                  </div>             
                </div>
                <div className="auth-group">
                  <label>Age: </label>
                    <div>
                      <div className="group-items" color={color}>
                        <div className="icon" style={{ width: '70px' }}>
                          <FaPagelines size={25} />
                        </div>
                        <input
                          name="age"
                          type='number'
                          id="age"
                          min={0}
                          max={120}
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          style={{ color }}
                          placeholder="Enter age..."
                          autoComplete="off"
                        />
                      </div>
                    </div>       
                </div>
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
          <div className='auth-form-group'>
            <div className="auth-group">
              <label>Confirm password: </label>
              <div>
                <div className="group-items">
                  <div className="icon">
                    <TbLockPassword size={20} />
                  </div>
                  <input
                    name="confirmPassword"
                    id="confirmPassword"
                    type={confirmPasswordShow ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Enter confirm password..."
                    autoComplete="off"
                  />
                  <i onClick={textConfirmPasswordShow}>
                    {(confirmPasswordShow ? false : true) ? (
                      <LuEyeOff size={18} />
                    ) : (
                      <LuEye size={18} />
                    )}
                  </i>
                </div>
              </div>
              {isVisible ? <ErrorMessage errorText={errors.confirmPassword} errorType='warning' /> : null}        
            </div>
          </div>
          <div className="submit-group">
            <div className="submit-buttons">
              <button type="button" onClick={handleRegister} className="btn btn-submit">
                Registrovat se
              </button>
            </div>
            <div className="submit-content">
              <p>
                Have an account yet? <Link to="/sign-in">Sign In</Link>
              </p>
            </div>
          </div>
        </form>
      </motion.div>
    </WrapperAuth>
  );
};

export default SignUp;
