import React from 'react';

import logoWrapperDown from '../../../assets/logo/logo-wrapper-down.png';

import { MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown } from 'react-icons/md';

import './WrapperLogIn.scss';

const WrapperLogIn = ({ title, icon, children }) => {
  return (
    <>
      <div className='wrapper-main-log-in'>
        <section className='wrapper-header-log-in'>
            <h1 className='wrapper-title-log-in'>{title}</h1>
            <i>{icon}</i>
        </section>
        <main className='wrapper-content-log-in'>
            {children}
        </main>
        <section className='wrapper-footer-log-in'>
            <span><MdKeyboardDoubleArrowDown color='#f54c2a' /></span>
            <div>
                <img src={logoWrapperDown} alt='Wrapper logo' />
            </div>
            <span><MdKeyboardDoubleArrowUp color='#f54c2a' /></span>
        </section>
      </div>
    </>
  );
}

export default WrapperLogIn;
