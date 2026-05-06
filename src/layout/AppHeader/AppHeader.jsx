import React, { useState, useEffect } from 'react';

import { useAuth } from '../../appwrite/context/AuthContext';



import { toast, ToastContainer } from 'react-toastify';

import './AppHeader.scss';
import Header from '../Header/Header';

const AppHeader = ({ children }) => {
    return (
      <>
        <div className='app-header'>
            <div className='app-header-header'>
                <Header />
            </div>
        </div>
      </>
    );
}

export default AppHeader;
