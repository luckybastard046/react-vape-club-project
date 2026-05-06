import React from 'react'
import { motion } from 'framer-motion';

import WrapperLogOut from '../../layout/Wrappers/WrapperLogOut/WrapperLogOut'

import { PiNoteDuotone } from "react-icons/pi";

import './NotFound.scss';

const NotFound = () => {
  return (
    <>
        <WrapperLogOut title='Page Not Found' icon={<PiNoteDuotone size={30} />}>
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <section className='not-found'>
              <p>Sorry, something went wrong. If the errors persist, contact your website provider.</p>
            </section>
          </motion.div>
        </WrapperLogOut>
    </>
  )
}

export default NotFound
