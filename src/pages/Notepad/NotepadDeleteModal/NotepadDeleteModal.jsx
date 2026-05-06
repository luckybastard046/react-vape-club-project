import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '../../../appwrite/context/AuthContext';
import { account, databases } from '../../../appwrite/appwriteClient';

import { IoMdClose } from 'react-icons/io';
import { CiWarning } from "react-icons/ci";

import { toast } from 'react-toastify';

import './NotepadDeleteModal.scss';

const NotepadDeleteModal = ({ user, note, deleteNote, updateNote, isNotepadDeleteModalShow, closeNotepadDeleteModal }) => {
  if (!isNotepadDeleteModalShow) return null;

  const deleteNoteFromModal = () => {
    deleteNote(note.$id);
  }

  return (
    <>
      <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <section className="notepad-delete-modal-overlay" onClick={closeNotepadDeleteModal}>
            <div
              className="notepad-delete-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
                <div className="notepad-delete-modal-btn">
                  <button className="btn-notepad-delete-modal-close" onClick={closeNotepadDeleteModal}>
                    <IoMdClose size={25} />
                  </button>
                </div>
                <div className='notepad-delete-modal-content'>
                  <div className="notepad-delete-modal-text">
                    <h3 className='notepad-delete-modal-error-action'>
                      <CiWarning size={50} />
                    </h3>
                    <p className='notepad-delete-modal-error'>
                      Are you sure you want to DELETE this note?
                    </p>
                  </div>
                  <div className="notepad-delete-modal-actions">
                    <button
                      className="btn-notepad-delete-modal-delete"
                      onClick={deleteNoteFromModal}
                    >
                      <b>YES</b>
                    </button>
                    <button
                      className="btn-notepad-delete-modal-cancel"
                      onClick={closeNotepadDeleteModal}
                    >
                      <b>NO</b>
                    </button>
                  </div>
                </div>
            </div>
          </section>
        </motion.div>
    </>
  );
};

export default NotepadDeleteModal;