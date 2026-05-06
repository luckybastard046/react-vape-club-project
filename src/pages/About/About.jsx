import React from 'react'
import { motion } from 'framer-motion';

import WrapperLogIn from '../../layout/Wrappers/WrapperLogIn/WrapperLogIn'

const About = () => {
  return (
    <>
        <WrapperLogIn title='About'>
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
            >
              <section>
                
              </section>
            </motion.div>
        </WrapperLogIn>
    </>
  )
}

export default About
