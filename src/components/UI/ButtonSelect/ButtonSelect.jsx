import React from 'react'

import Select from 'react-select';

import { IoImageOutline } from 'react-icons/io5';

import './ButtonSelect.scss';

const ButtonSelect = ({ value, onChange, options }) => {
    const customStyles = {
        control: (base) => ({
            ...base,
            backgroundColor: "#ddd",
            color: '#333',
            width: '180px',
            height: '40px',
            fontSize: '13px',
            display: 'flex',
            border: "none",
            boxShadow: "none",
            "&:hover": { borderColor: "#888" },
        }),
        option: (base, { isFocused, isSelected }) => ({
            ...base,
            backgroundColor: isSelected ? "brown" : isFocused ? "burlywood" : "white",
            color: isSelected ? "white" : "black",
            fontSize: '13px',
            cursor: "pointer",
        }),
        menu: (base) => ({
            ...base,
            zIndex: 100,
            backgroundColor: '#ddd'
        }),
    };

    return (
        <>
            <div className="button-select">
                <label>Gender: </label>
                <div className='button-select-group'>
                    <div className="button-select-icon">
                        <IoImageOutline size={25} />
                    </div>
                    <div className='button-select-select'>
                        <Select
                            value={value}
                            onChange={onChange}
                            options={options}
                            styles={customStyles} 
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ButtonSelect
