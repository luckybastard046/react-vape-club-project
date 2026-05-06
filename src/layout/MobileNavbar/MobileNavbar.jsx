import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { useAuth } from '../../appwrite/context/AuthContext';

import Hamburger from 'hamburger-react';

import AccountButton from '../../components/UserAccount/AccountButton/AccountButton';
import Sidebar from '../Sidebar/Sidebar';
import ButtonCart from '../../components/UI/ButtonCart/ButtonCart';

import logoHeader from '../../assets/logo/logo-header-vape.png';

import { toast } from 'react-toastify';

import './MobileNavbar.scss';

const MobileNavbar = () => {
    const { user } = useAuth();
    const [isOpen, setOpen] = useState(false);

    const closeSidebar = () => {
      setOpen(false);
    }
    return (
        <>
            <header className='navbar-mobile-header'>
                <div  className='mobile-navbar-container'>
                    <div className='mobile-navbar-logo'>
                        <Link to='/' className='mobile-navbar-logo-link'>
                            <img src={logoHeader} alt='' />
                        </Link>
                    </div>
                    <nav className='navbar-mobile-nav'>
                        <ul className='mobile-navbar-list'>
                            <li>
                                {user && (
                                    <ButtonCart />
                                )}
                            </li>
                            <li className='mobile-navbar-hamburger'>
                                <Hamburger toggled={isOpen} toggle={setOpen} size={25} />  
                            </li>
                            <li className='mobile-navbar-account'>
                                <AccountButton />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
            <Sidebar isOpen={isOpen} closeSidebar={closeSidebar} />       
        </>
    );
}

export default MobileNavbar;
