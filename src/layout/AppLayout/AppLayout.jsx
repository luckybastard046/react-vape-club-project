import React, { useState, useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '../../appwrite/context/AuthContext';

import { account, databases, Query, ID } from "../../appwrite/appwriteClient";

import Spinner from '../../components/Loading/Spinner/Spinner';

import AppHeader from '../AppHeader/AppHeader';
import Header from '../Header/Header';

import { toast, ToastContainer } from 'react-toastify';

import './AppLayout.scss';

const AppLayout = ({ children }) => {
    const { 
      getCurrentUser,
      loading, 
      setLoading,
    } = useAuth();

    useEffect(() => {
      getCurrentUser();
    }, []);

    return (
      <>
        {!loading ? (
          <div>
            <ToastContainer position='top-left' />
            <div className='app-layout'>
              <AppHeader />
              <main className='app-layout-content'>
                <Outlet />
                {children}
              </main>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
      </>
    );
}

export default AppLayout;
