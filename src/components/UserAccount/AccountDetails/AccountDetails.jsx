import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { account, databases, Query, storage } from '../../../appwrite/appwriteClient';

import { useAuth } from '../../../appwrite/context/AuthContext';

import Loader from '../../Loading/Loader/Loader';
import AccountModal from '../AccountModal/AccountModal';

import LogoutUser from '../../UI/LogoutUser/LogoutUser';

import userImage from '../../../assets/images/user.png';

import { BsInfoCircle } from "react-icons/bs";
import { TbMessagePlus } from "react-icons/tb";

import { toast } from 'react-toastify';

import './AccountDetails.scss';

const AccountDetails = ({ closeAccountMenu }) => {
    const { 
        user,
        setUser,
        setLoading, 
        setIsAuthReady, 
        logoutUser,
    } = useAuth();

    const [doc, setDoc] = useState([]);

    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();    

    const DATABASE_ID = '69ec27a400008e34e099';
    const USERS_COLLECTION_ID = 'users';
    const BUCKET_ID = '69ec315a00269f2f4dd2';

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

    function closeAccount() {
        closeAccountMenu();
        navigate('/notepad')
    }

    function showPasswordInfo() {
        setShowPassword(!showPassword);
    }


    return (
        <div className='account-details'>
            {user ? (
                <div>
                    <div className="account-details-user">
                        <h3 className='account-details-logged-title'>Logged user: </h3>
                        <div>
                            {doc && (
                                <div>
                                    <div className="account-details-detail">
                                        {doc.genderImage ? (
                                            <>
                                                <img src={doc.genderImage} alt='User' height='40px' />
                                            </>
                                        ) : (
                                            <>
                                                <img src={userImage} alt='User' height='40px' />
                                            </>
                                        )}
                                    </div>
                                    <div className="account-details-detail">
                                        {doc.name ? (
                                            <><h6>Name: </h6> <span>{doc.name}</span></>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                     <div className="account-details-detail">
                                        {doc.username ? (
                                            <><h6>Username: </h6> <span>{doc.username}</span></>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="account-details-detail">
                                        {doc.email ? (
                                            <><h6>Email: </h6> <span>{doc.email}</span></>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="account-details-detail">
                                        {doc.gender && (
                                            <><h6>Gender: </h6> <span>{doc.gender}</span></>
                                        )}
                                    </div>
                                    <div className="account-details-detail">
                                        {doc.age && (
                                            <><h6>Age: </h6> <span>{doc.age}</span></>
                                        )}
                                    </div>
                                    <div className="detail-password">
                                        {doc.password ? (
                                            <><h6>Heslo:</h6> <i><BsInfoCircle size={18} onClick={showPasswordInfo} style={{ cursor: 'pointer' }} /></i> {showPassword ? <span>{doc.password}</span> : null}</>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ color: '#f54c2a', textAlign: 'center' }}>
                    <Loader loaderText='Loading user data...' />
                </div>
            )}
            <div>
                <button className='account-details-btn-notepad' onClick={closeAccount}>
                    <TbMessagePlus /> Leave a Message 
                </button>
            </div>
            <div className="account-details-user-logout">
                <LogoutUser />
            </div>
        </div>
    );
}

export default AccountDetails; 