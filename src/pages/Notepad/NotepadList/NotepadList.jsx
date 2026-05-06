import React, { useState, useEffect } from "react";

import NotepadItem from '../NotepadItem/NotepadItem';

import './NotepadList.scss';

const NotepadList = ({ 
    notes,
    setText,
    editId,
    setEditId,
    addNote,
    editNote,
    deleteNote,
    isShowNotepadMenu,
    setIsShowNotepadMenu,
    showNotepadMenu
}) => {

    return (
      <>
        <ul className="notepad-list">
          {notes.map((note) => (
            <li className="notepad-list-item" key={note.$id}>
              <NotepadItem
                note={note}
                setText={setText}
                editId={editId}
                setEditId={setEditId}
                addNote={addNote}
                editNote={editNote}
                deleteNote={deleteNote}
                isShowNotepadMenu={isShowNotepadMenu}
                setIsShowNotepadMenu={setIsShowNotepadMenu}
                showNotepadMenu={showNotepadMenu}
              />
            </li>
          ))}
        </ul>
      </>
    );
};

export default NotepadList;