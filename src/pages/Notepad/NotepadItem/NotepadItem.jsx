import React, { useState, useEffect, useRef } from "react";

import { format, parseISO } from "date-fns";

import { account, Query, databases } from "../../../appwrite/appwriteClient";

import { useAuth } from "../../../appwrite/context/AuthContext";

import NotepadErrorModal from "../NotepadErrorModal/NotepadErrorModal";
import NotepadDeleteModal from "../NotepadDeleteModal/NotepadDeleteModal";

import { FaPencil } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { CiWarning } from "react-icons/ci";

import { toast } from "react-toastify";

import './NotepadItem.scss';

const NotepadItem = ({ 
  note, 
  setText,
  editId,
  setEditId,
  addNote,
  editNote,
  deleteNote,
  isShowNotepadMenu,
  setIsShowNotepadMenu,
}) => {
    const { user } = useAuth();
    const [userId, setUserId] = useState(null);

    const [errors, setErrors] = useState({
      action: '',
      text: '',
      userNoteCreateName: '',
      userCurrentName: ''
    });
    const [errorAction, setErrorAction] = useState('');

    const [isNotepadErrorModalShow, setIsNotepadErrorModalShow] = useState(false);
    const [isNotepadDeleteModalShow, setIsNotepadDeleteModalShow] = useState(false);

    const DATABASE_ID = "69ec27a400008e34e099";
    const USERS_COLLECTION_ID = 'users';

    const updateNote = () => {
      setIsShowNotepadMenu(true);
      setEditId(note.$id); 
      setText(note.text); 
    }

    const removeNoteFromUser = () => {
      if (note.noteUserEmail !== user.email) {
        setIsNotepadErrorModalShow(true);
        setErrorAction('Delete Message');
        setErrors({
          action: <CiWarning size={50} />,
          text: `You don't have permission to DELETE this message!`,
          noteCreatedByEmail: note.noteUserEmail,
          currentUserEmail: user.email
        });
      } else {
        setIsNotepadDeleteModalShow(true);
      }
    }

    const editNoteFromUser = () => {
      if (note.noteUserEmail !== user.email) {
        setIsNotepadErrorModalShow(true);
        setErrors({
          action: <CiWarning size={50} />,
          text: `You don't have permission to EDIT this message!`,
          noteCreatedByEmail: note.noteUserEmail,
          currentUserEmail: user.email
        });
      } else {
        updateNote();
      }
    }

    const closeNotepadDeleteModal = () => {
      setIsNotepadDeleteModalShow(false);
    }

    const closeNotepadErrorModal = () => {
      setIsNotepadErrorModalShow(false);
    }

    return (
      <>
        <section className="notepad-item" key={note.$id}>
          <div className="notepad-item-container">
            <div className="notepad-item-header">
              <div className="notepad-item-details">
                <p style={{ 
                    textAlign: 'left', 
                    fontSize: '13px',
                    paddingBottom: '5px',
                    borderBottom: '1px dashed #333',
                    fontWeight: '700'
                  }}
                >Published by user: </p>
                <div className="notepad-item-detail">
                  <div className="notepad-item-detail-gender">
                    <span>{note.noteUserName}</span>
                    <img src={note.noteUserImage} alt='' height='25px' />
                  </div>
                </div>
                <div className="notepad-item-detail">
                  <span>{note.noteUserEmail}</span>
                </div>
              </div>
              <div className="notepad-item-buttons">
                <button
                  type="button" 
                  onClick={editNoteFromUser} 
                >
                  <FaPencil />
                </button>

                <button
                  onClick={removeNoteFromUser}
                  type="button"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
            <div className="notepad-item-content">
              <p>Message description: </p>
              <p style={{ fontStyle: 'italic', fontWeight: '500' }}>{note.text}</p>
            </div>
          </div>
          <div className="notepad-item-footer">
              Added at: <b style={{ color: 'brown' }}>{format(parseISO(note.$createdAt), "dd MMM yyyy, HH:mm")}</b>
          </div>
        </section>
        {isNotepadErrorModalShow && (
          <NotepadErrorModal 
            user={user} 
            errors={errors}
            isNotepadErrorModalShow={isNotepadErrorModalShow}
            closeNotepadErrorModal={closeNotepadErrorModal}
          />
        )}
        {isNotepadDeleteModalShow && (
          <NotepadDeleteModal 
            user={user} 
            note={note}
            deleteNote={deleteNote}
            isNotepadDeleteModalShow={isNotepadDeleteModalShow}
            closeNotepadDeleteModal={closeNotepadDeleteModal}
          />
        )}
      </>
    );
};

export default NotepadItem;