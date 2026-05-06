import React, { useEffect, useState } from "react";
import { motion } from 'framer-motion';

import { useAuth } from "../../appwrite/context/AuthContext";

import { account, databases, ID, client, Query } from '../../appwrite/appwriteClient';

import WrapperLogIn from "../../layout/Wrappers/WrapperLogIn/WrapperLogIn";

import Error from "../../components/UI/ErrorMessage/ErrorMessage";

import NotepadMenu from "./NotepadMenu/NotepadMenu";
import NotepadList from "./NotepadList/NotepadList";
import NotepadItem from "./NotepadItem/NotepadItem";

import Loader from "../../components/Loading/Loader/Loader";

import { LuNotepadText } from "react-icons/lu";
import { PiNotepad } from "react-icons/pi";

import { toast } from "react-toastify";

import './Notepad.scss';

function Notepad() {
    const { user, loading, setLoading } = useAuth();
    const [userCurrent, setUserCurrent] = useState(null);

    const [doc, setDoc] = useState([]);
    const [notes, setNotes] = useState([]);
    const [text, setText] = useState("");

    const [editId, setEditId] = useState(null);

    const DATABASE_ID = "69ec27a400008e34e099";
    const USERS_COLLECTION_ID = "users";
    const NOTES_COLLECTION_ID = "notes"; 

    const [isShowNotepadMenu, setIsShowNotepadMenu] = useState(false);

    const fetchUserDoc = async () => {
        if (!user) return;

        try {
            const res = await databases.listDocuments(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                [
                    // Filter by userId field
                    Query.equal("userId", user.$id)
                ]
            );

            if (res.documents.length > 0) {
                setDoc(res.documents[0]);
            } else {
                setDoc(null);
            }

        } catch (err) {
            console.error("Fetch failed:", err);
        }
    };

    useEffect(() => {
        if (user) {
            fetchUserDoc();
        }
    }, [user]);

    useEffect(() => {
      databases.listDocuments(DATABASE_ID, NOTES_COLLECTION_ID).then((res) => {
        setNotes(res.documents);
      });
    }, []);

    // Add note
    const addNote = async () => {
      if (!text.trim()) return;
      const res = await databases.createDocument(
        DATABASE_ID, 
        NOTES_COLLECTION_ID, 
        ID.unique(),
        { 
          text: text,
          noteUserName: doc.username,
          noteUserEmail: doc.email,
          noteUserImage: doc.genderImage
        }
      );
      setNotes([...notes, res]);
      setText("");
      setIsShowNotepadMenu(false);
    };

    // Edit note
    const editNote = async (id) => {
      if (!text.trim()) return;
      const res = await databases.updateDocument(
        DATABASE_ID, 
        NOTES_COLLECTION_ID, 
        id,
        { 
          text: text,
          noteUserName: doc.username,
          noteUserEmail: doc.email,
          noteUserImage: doc.genderImage
        }
      );
      setNotes(notes.map((n) => (n.$id === id ? res : n)));
      setText("");
      setEditId(null);
      setIsShowNotepadMenu(false);
    };

    // Delete note
    const deleteNote = async (id) => {
      await databases.deleteDocument(
        DATABASE_ID, 
        NOTES_COLLECTION_ID, 
        id,
      );
      setNotes(notes.filter((n) => n.$id !== id));
      setIsShowNotepadMenu(false);
    };

    function showNotepadMenu() {
      setIsShowNotepadMenu(!isShowNotepadMenu);
    }

    function closeNotepadMenu() {
      setIsShowNotepadMenu(false);
    }

    return (
      <WrapperLogIn title='Leave a Message'>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <section className="notepad">
            <div className="notepad-container">
              <div className="notepad-container-content">
                <button className="notepad-btn-show-menu" onClick={showNotepadMenu}><LuNotepadText size={30} /></button>
                <div className="notepad-show-menu">
                  {isShowNotepadMenu && (
                    <NotepadMenu 
                      user={user}
                      text={text}
                      setText={setText}
                      editId={editId}
                      addNote={addNote}
                      editNote={editNote}
                      setIsShowNotepadMenu={setIsShowNotepadMenu}
                      closeNotepadMenu={closeNotepadMenu}
                    />
                  )}
                </div>
              </div>
              <div className="notepad-list-content">
                {notes.length === 0 ? (
                  <Loader loaderText='Loading notes...' />
                ) : (
                  <NotepadList
                    notes={notes}
                    setText={setText}
                    editId={editId}
                    setEditId={setEditId}
                    addNote={addNote}
                    editNote={editNote}
                    deleteNote={deleteNote}
                    showNotepadMenu={showNotepadMenu}
                    isShowNotepadMenu={isShowNotepadMenu}
                    setIsShowNotepadMenu={setIsShowNotepadMenu}
                  />
                )}
              </div>
            </div>
          </section>
        </motion.div>
      </WrapperLogIn>
    );
}

export default Notepad;