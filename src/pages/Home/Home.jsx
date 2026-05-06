import React from 'react'
import { motion } from 'framer-motion';

import WrapperLogOut from '../../layout/Wrappers/WrapperLogOut/WrapperLogOut';

import logoWrapperDown from '../../assets/logo/logo-wrapper-down.png';

import { AiOutlineHome } from "react-icons/ai";

import './Home.scss';

const Home = () => {
  return (
    <>
        <WrapperLogOut title='Home' icon={<AiOutlineHome size={25} />}>
            <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
            >
                <section className='home'>
                    <p>Welcome to the pages of "Vape Pub".</p>
                    <br />
                    <p>
                        Feel free to register and immediately get access to our menu <br />
                        from our new kitchen or learn something about vaping...
                    </p>
                </section>
            </motion.div>
            
        </WrapperLogOut>
    </>
  )
}

export default Home
