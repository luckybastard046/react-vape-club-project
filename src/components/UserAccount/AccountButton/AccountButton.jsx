import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useAuth } from '../../../appwrite/context/AuthContext';

import { NavLink, useNavigate } from 'react-router-dom';

import AccountDropdown from '../AccountDropdown/AccountDropdown';

import userImage from '../../../assets/images/user.png'

import { FaUser } from 'react-icons/fa';

import { toast } from 'react-toastify';

import './AccountButton.scss';

const AccountButton = () => {
    const { 
        user, 
        setUser, 
    } = useAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showNavbarAccount, setShowNavbarAccount] = useState(false);

    const closeAccountMenu = () => {
        setShowNavbarAccount(false);
    }

    return (
        <div className='account-button'>
            <div className='account-button-content'>
                {user ? (
                    <div className='account-button-button'>
                        <button type='button' className='account-img' onClick={() => setShowNavbarAccount((prev) => !prev)}>
                            <img src={userImage} height='40px' alt='' />
                        </button>
                    </div>
                ) : (
                    <div className='account-button-button'>
                        <button type='button' className='account-icon' onClick={() => setShowNavbarAccount((prev) => !prev)}>
                            <FaUser size={25} />
                        </button>
                    </div>
                )}
            </div>
            <div className='account-button-show'>
                {showNavbarAccount && (
                    <AccountDropdown 
                        user={user}
                        setUser={setUser}
                        closeAccountMenu={closeAccountMenu} 
                    />
                )}
            </div>
        </div>
    );
}

export default AccountButton;