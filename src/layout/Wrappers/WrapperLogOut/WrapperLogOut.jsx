import React from 'react';

import logoWrapperDown from '../../../assets/logo/logo-wrapper-down.png';

import { MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown } from 'react-icons/md';

import './WrapperLogOut.scss';

const WrapperLogOut = ({ title, icon, children }) => {
  return (
    <>
      <div className='wrapper-main-log-out'>
        <section className='wrapper-header-log-out'>
            <h1 className='wrapper-title-log-out'>{title}</h1>
            <i>{icon}</i>
        </section>
        <main className='wrapper-content-log-out'>
            {children}
        </main>
        <section className='wrapper-footer-log-out'>
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

export default WrapperLogOut;
