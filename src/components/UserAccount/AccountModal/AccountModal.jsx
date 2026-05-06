import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'framer-motion';

import { useAuth } from '../../../appwrite/context/AuthContext';
import { account, databases } from '../../../appwrite/appwriteClient';

import { IoMdClose } from 'react-icons/io';

import { toast } from 'react-toastify';

import './AccountModal.scss';

const AccountModal = ({ user, deleteUser, isDropdownModalOpen, closeDropdownModal }) => {
  const handleDeleteUser = async () => {
    try {
      await deleteUser();
      closeDropdownModal();
    } catch(error) {
      console.log('User deleted was failed!')
    }
  } 

  if (!isDropdownModalOpen) return null;

  return (
    <>
      {isDropdownModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 100 }}
          transition={{ duration: 0.3 }}
        >
          <div className="account-modal-overlay" onClick={closeDropdownModal}>
            <div
              className="account-modal-container"
              onClick={(e) => e.stopPropagation()}
            >
                <div className="account-modal-btn">
                  <button className="btn-dropdown-modal-close" onClick={closeDropdownModal}>
                    <IoMdClose size={20} />
                  </button>
                </div>
                <div className='account-modal-content'>
                  <div className="account-modal-text">
                    <b>ARE YOU SURE DELETE YOUR ACCOUNT? <span>{user.email}</span></b>
                  </div>
                  <div className="account-modal-actions">
                    <button
                      className="btn-account-modal-cancel"
                      onClick={closeDropdownModal}
                    >
                      <b>OK</b>
                    </button>
                    <button
                      className="btn-account-modal-delete"
                      onClick={handleDeleteUser}
                    >
                      <b>Delete</b>
                    </button>
                  </div>
                </div>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default AccountModal;
