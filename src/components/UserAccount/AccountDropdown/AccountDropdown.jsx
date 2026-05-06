import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../../appwrite/context/AuthContext";
import { account, databases, storage, Query } from "../../../appwrite/appwriteClient";

import { NavLink, useNavigate } from "react-router-dom";

import { useClickOutside } from '@react-hooks-library/core'

import { motion } from 'framer-motion';

import AccountDetails from "../AccountDetails/AccountDetails";

import userImage from '../../../assets/images/user.png';
import logoMenuVape from '../../../assets/logo/logo-menu-vape.png';

import { MdClose } from "react-icons/md";
import { FaZhihu } from "react-icons/fa6";

import { toast } from "react-toastify";

import './AccountDropdown.scss';

const AccountDropdown = ({ closeAccountMenu }) => {
    const { 
        user,
        setUser,
    } = useAuth();

    const [doc, setDoc] = useState([]);
    const [isOpen, setIsOpen] = useState(true);

	const navigate = useNavigate();
    
    const ref = useRef(null);
    
    useClickOutside(ref, () => {
        setIsOpen(false);
    });

    if (!isOpen) return null;

    return (
        <motion.div
          initial={{ x: 250 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.15 }}
        >
            <div className="account-dropdown">
                <div className="account-dropdown-container" ref={ref}>
                    <div className='account-dropdown-content-close'>
                        <button className='btn-dropdown-content-close' onClick={closeAccountMenu}><MdClose size={25} /></button>
                    </div>
                    <div className="account-dropdown-content-header">   
                        <div className='account-dropdown-content-current-user'>
                            {user ? (
                                <AccountDetails 
                                    closeAccountMenu={closeAccountMenu}
                                />
                            ) : (
                                <div className="account-dropdown-details"> 
                                    <div className='account-dropdown-content-image'>
                                        <img src={userImage} height='40px' alt='User image' />
                                    </div>
                                    <div className="account-dropdown-content-logo">
                                       <h3>Account: </h3>
                                    </div>
                                    <div className="account-dropdown-content-links">
                                        <NavLink className='account-dropdown-content-link' to='/sign-in' onClick={closeAccountMenu}>Sign In</NavLink>

                                        <NavLink className='account-dropdown-content-link' to='/sign-up' onClick={closeAccountMenu}>Sign Up</NavLink>
                                        <div className='account-dropdown-footer-user'>
                                            <p>No user is logged in...</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>  
            </div>
        </motion.div>
    );
}

export default AccountDropdown;