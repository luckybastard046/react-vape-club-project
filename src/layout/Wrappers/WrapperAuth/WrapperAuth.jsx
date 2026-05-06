import React from 'react';

import logoWrapperDown from '../../../assets/logo/logo-wrapper-down.png';

import { MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown } from 'react-icons/md';

import './WrapperAuth.scss';

const WrapperAuth = ({ title, icon, children }) => {
  return (
    <>
      <div className='wrapper-main-auth'>
        <section className='wrapper-header-auth'>
            <h1 className='wrapper-title-auth'>{title}</h1>
            <i>{icon}</i>
        </section>
        <main className='wrapper-content-auth'>
            {children}
        </main>
        <section className='wrapper-footer-auth'>
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

export default WrapperAuth;
