import React from 'react'

import { motion } from 'framer-motion';

import WrapperLogOut from '../../layout/Wrappers/WrapperLogOut/WrapperLogOut';

import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaAddressCard } from "react-icons/fa6";

import './Contact.scss'

const Contact = () => {
  return (
    <WrapperLogOut title='Contact'>
        <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
        >
            <section className='contact'>
                <p>Michal Homola</p>
                <p><FaPhoneAlt /> +420 777 888 999</p>
                <p><MdEmail /> luckybastard046@gmail.com</p>
                <p><FaAddressCard /> Sivice 142</p>
                <p>Sivice</p>
                <p>664 07</p>
            </section>
        </motion.div>
        
    </WrapperLogOut>
  )
}

export default Contact
