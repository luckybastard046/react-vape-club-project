import React, { useEffect } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAuth } from '../appwrite/context/AuthContext';

import { motion } from 'framer-motion';

import Spinner from '../components/Loading/Spinner/Spinner';
import WrapperLogOut from '../layout/Wrappers/WrapperLogOut/WrapperLogOut';

import { PiNotepad } from "react-icons/pi";

import './NotepadProtectedRoute.scss';

export const NotNotepadProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/sign-in');
    }, 4500);
  
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <WrapperLogOut title="Notepad" icon={<PiNotepad size={30} />}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <section className="notepad-protected">
            <p>
              We're sorry, but if you want to <span>leave a message</span>, you must be <Link to='/sign-in' style={{ color: 'brown', textDecoration: 'underline' }}>logged in</Link>.
            </p>
        </section>
      </motion.div>
    </WrapperLogOut>
  );
};

const NotepadProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader loaderText='Loading...' />
  }

  if (user) {
    return <Outlet />
  } else {
    return <NotNotepadProtectedRoute />
  }

  return user;
};

export default NotepadProtectedRoute;
