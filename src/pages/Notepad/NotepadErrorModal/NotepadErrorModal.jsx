import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '../../../appwrite/context/AuthContext';
import { account, databases } from '../../../appwrite/appwriteClient';

import { IoMdClose } from 'react-icons/io';

import { toast } from 'react-toastify';

import './NotepadErrorModal.scss';

const NotepadModal = ({ user, errors, errorAction, isNotepadErrorModalShow, closeNotepadErrorModal }) => {
  if (!isNotepadErrorModalShow) return null;

  return (
    <>
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <section className="notepad-error-modal-overlay" onClick={closeNotepadErrorModal}>
            <div
              className="notepad-error-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
                <div className="notepad-error-modal-btn">
                  <button className="btn-notepad-error-modal-close" onClick={closeNotepadErrorModal}>
                    <IoMdClose size={25} />
                  </button>
                </div>
                <div className='notepad-error-modal-content'>
                  <div className="notepad-error-modal-text">
                    <h3 className='notepad-error-modal-error-action'>
                      {errors.action}
                    </h3>
                    <p className='notepad-error-modal-error'>
                      {errors.text}
                    </p>
                  </div>
                  <div className='notepad-error-modal-published'>
                    <p>Published by user: <span>{errors.noteCreatedByEmail}</span></p>
                    <p>You are logged as user: <span>{errors.currentUserEmail}</span></p>
                  </div>
                  <div className="notepad-error-modal-actions">
                    <button
                      className="btn-notepad-error-modal-cancel"
                      onClick={closeNotepadErrorModal}
                    >
                      <b>OK</b>
                    </button>
                  </div>
                </div>
            </div>
          </section>
        </motion.div>
    </>
  );
};

export default NotepadModal;
