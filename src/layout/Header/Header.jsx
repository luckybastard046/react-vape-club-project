import React, { useState, useEffect} from 'react';

import Navbar from '../Navbar/Navbar';
import MobileNavbar from '../MobileNavbar/MobileNavbar';

import './Header.scss';

const Header = () => {
    const [isNavbar, setIsNavbar] = useState(window.innerWidth > 900);
    useEffect(() => {
        const handleResize = () => setIsNavbar(window.innerWidth > 900);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const [isMobileNavbar, setIsMobileNavbar] = useState(window.innerWidth <= 900);
    useEffect(() => {
        const handleResize = () => setIsMobileNavbar(window.innerWidth <= 900);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <header>
                {isNavbar && (
                    <Navbar />
                )}
                {isMobileNavbar && (
                    <MobileNavbar />
                )}
            </header>
        </>
    );
}

export default Header