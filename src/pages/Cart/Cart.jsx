import React from 'react'
import { motion } from 'framer-motion';

import WrapperLogOut from '../../layout/Wrappers/WrapperLogOut/WrapperLogOut'

import { FaHome } from 'react-icons/fa'

import './Cart.scss';

const Cart = () => {
  return (
    <>
        <WrapperLogOut title='Cart' icon={<FaHome size={25} />}>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
            >
                <section className='cart'>
                    <p>
                        No items in CART!
                    </p>
                </section>
            </motion.div>
            
        </WrapperLogOut>
    </>
  )
}

export default Cart
