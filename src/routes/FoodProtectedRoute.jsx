import React, { useEffect } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAuth } from '../appwrite/context/AuthContext';

import { motion } from 'framer-motion';

import Spinner from '../components/Loading/Spinner/Spinner';
import WrapperLogOut from '../layout/Wrappers/WrapperLogOut/WrapperLogOut';

import { TiShoppingCart } from "react-icons/ti";

import './FoodProtectedRoute.scss';
import Loader from '../components/Loading/Loader/Loader';

export const NotFoodProtectedRoute = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/sign-in');
    }, 4500);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <WrapperLogOut title="Pub">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <section className="food-protected">
            <p>
              We're sorry, but you must be <Link to='/sign-in' style={{ color: 'brown', textDecoration: 'underline' }}>logged in</Link> if you want to buy in our pub.
            </p>
        </section>
      </motion.div>
    </WrapperLogOut>
  );
};

const FoodProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Loader loaderText='Loading...' />
  }

  if (user) {
    return <Outlet />
  } else {
    return <NotFoodProtectedRoute />
  }

  return user;
};

export default FoodProtectedRoute;
