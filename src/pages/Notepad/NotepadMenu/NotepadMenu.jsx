import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

import NotepadForm from '../NotepadForm/NotepadForm';

import { useClickOutside } from '@react-hooks-library/core'

import { IoMdClose } from "react-icons/io";
import { RiStickyNoteAddLine } from "react-icons/ri";

import { toast } from 'react-toastify';

import './NotepadMenu.scss';

const NotepadMenu = ({ 
    user,
    text,
    setText,
    editId,
    addNote,
    editNote,
    setIsShowNotepadMenu,
    closeNotepadMenu
}) => {
    const [isOpen, setIsOpen] = useState(true);

    const ref = useRef(null);
    
    useClickOutside(ref, () => {
        setIsOpen(false);
    });

    if (!isOpen) return null;

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25  }}
            >
                <section className="notepad-menu" ref={ref}>
                    <div className='notepad-menu-close'>
                        <button 
                            className="btn-modal-close" 
                            onClick={() => closeNotepadMenu()}
                        ><IoMdClose size={30} /></button>
                    </div>
                    <div className='notepad-menu-content'>
                        <div className='notepad-menu-title'>
                            <h3>Menu</h3>
                        </div>
                        <div className='notepad-menu-container'>
                            <NotepadForm 
                                user={user}
                                text={text}
                                setText={setText}
                                editId={editId}
                                addNote={addNote}
                                editNote={editNote}
                                setIsShowNotepadMenu={setIsShowNotepadMenu}
                                closeNotepadMenu={closeNotepadMenu}
                            />
                        </div>
                        <div className='notepad-menu-footer'>
                            <p>Logged in as a user: <span>{user.email}</span></p>
                        </div>
                    </div>
                </section>
            </motion.div>
        </>
    );
};

export default NotepadMenu;
