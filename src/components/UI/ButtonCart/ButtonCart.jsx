import React from 'react';
import { NavLink } from 'react-router-dom';

import { GrShop } from 'react-icons/gr';

import './ButtonCart.scss';

const ButtonCart = () => {
    return (
        <>
             <div className='cart-button'>
                <NavLink to="/cart" className='cart-button-link'>
                    <i>
                        <GrShop size={27} />
                    </i>
                    <div className='cart-button-count'>

                    </div>
                </NavLink>
            </div>    
        </>
    );
}

export default ButtonCart;