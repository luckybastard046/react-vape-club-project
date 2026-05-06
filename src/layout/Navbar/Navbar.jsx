import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useAuth } from '../../appwrite/context/AuthContext';

import AccountButton from '../../components/UserAccount/AccountButton/AccountButton';
import ButtonCart from '../../components/UI/ButtonCart/ButtonCart';

import logoHeader from '../../assets/logo/logo-header-vape.png';

import { toast } from 'react-toastify';

import './Navbar.scss';

const Navbar = () => {
    const { user } = useAuth();

    const { cartItems } = useSelector((state) => state.cart);

    return (
        <>
            <header className='navbar-header'>
                <div className='navbar-container'>
                    <div className='navbar-logo'>
                        <Link to='/' className='navbar-logo-link'>
                            <img src={logoHeader} alt='' />
                        </Link>
                    </div>
                    <nav className='navbar-nav'>
                        <ul className='navbar-nav-list'>
                            <li>
                                <NavLink to='/' className='navbar-link'>Home</NavLink>
                            </li>
                            <li>
                                <NavLink to='/pub' className='navbar-link'>Pub</NavLink>
                            </li>
                            <li>
                                <NavLink to='/contact' className='navbar-link'>Contact</NavLink>
                            </li>
                        </ul>
                        <ul className='navbar-nav-buttons'>
                            {user && (
                                <li>
                                    <ButtonCart />
                                </li>
                            )}
                            <li className='navbar-account'>
                                <AccountButton />
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Navbar;
