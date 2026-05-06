import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import ErrorMessage from '../../../components/UI/ErrorMessage/ErrorMessage';

import { FaPlus, FaCheck, FaTrash } from "react-icons/fa";

import './NotepadForm.scss';

const NotepadForm = ({ 
    user,
    text,
    setText,
    editId,
    addNote,
    editNote,
    setIsShowNotepadMenu,
    closeNotepadMenu
}) => {
    const [errors, setErrors] = useState({});
    const [isVisible, setIsVisible] = useState(false);

    const validate = () => {
        let errorMessage = {};

        if (
            !text ||
            text === '' ||
            text.trim() === '' ||
            text.length === 0 ||
            text === null
        ) {
            errorMessage.text = 'Enter some note!';
        }

        setErrors(errorMessage);
        return Object.keys(errorMessage).length === 0;
    };

    const handleAddEdit = async (e) => {
        e.preventDefault();

        validate();

        setIsVisible(true);
        setTimeout(() => {
            setIsVisible(false);
        }, 4000);

        if (text.trim() !== '') {
            if (editId) {
                editNote(editId);
            } else {
                addNote();
            }
        } else {
            console.log('Input field is empty!');
        }
    }

    function clearFields() {
        setText('');
    }

    return (
        <>
            <form className='notepad-form-form'>
                <div className='notepad-form-group'>
                    <label htmlFor='title'>Message: </label>
                    <textarea
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write a message..."
                    />
                    {isVisible ? <ErrorMessage errorText={errors.text} errorType='warning' /> : null}
                </div>
                <div className='notepad-form-buttons'>
                    <button
                        type='submit'
                        className='btn-notepad-form-add'
                        onClick={handleAddEdit}
                    >
                        {editId ? 'UPDATE' : 'ADD'}
                    </button>
                    <button 
                        type='button' 
                        onClick={clearFields}
                        className='btn-notepad-form-clear'
                    >
                        <FaTrash size={15} /> CLEAR
                    </button>
                </div>
            </form>
        </>
    );
}

export default NotepadForm;