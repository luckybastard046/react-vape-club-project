import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { jwtDecode } from 'jwt-decode';
import { 
    client, 
    account, 
    databases, 
    ID, 
    Query, 
    storage
} from "../appwriteClient";

import { toast } from "react-toastify";
import { current } from "@reduxjs/toolkit";
import { set } from "date-fns";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {  
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const DATABASE_ID = '69ec27a400008e34e099';
    const USERS_COLLECTION_ID = 'users';

    const loginAnonymousUser = async () => {
        try {
            await account.createAnonymousSession();
            const user = await account.get();
            console.log('Anonymous user:', user);
        } catch (error) {
            console.error('Anonymous login failed:', error.message);
        } finally {
            setLoading(false);
            setIsAuthReady(true);
        }
    }

    const getCurrentUser = async () => {
        try {
            // ✅ If this works, session is active
            setIsLoggedIn(true);
            const currentUser = await account.get();
            setUser(currentUser);
        } catch (error) {
            try {
                const user = await account.get();
                if (user) {
                    setUser(null);
                } else {
                    loginAnonymousUser();
                }
                console.log('Session:', error)
            } catch(error) {
                console.log(error.message || "Failed to create anonymous session");
            }
            // ❌ No active session
            setIsLoggedIn(false);
        } finally {
            setLoading(false);
            setIsAuthReady(true);
        }

        return null;
    };

    const registerUser = async (email, password, name, extraData = {}) => {
        try {  
            const newUser = await account.create(
                ID.unique(), 
                email, 
                password, 
                name
            );

            if (newUser) {
                loginUser({ email, password });
            } else {
                return newUser;
            }

            await databases.createDocument(
                DATABASE_ID,
                USERS_COLLECTION_ID,
                ID.unique(),
                {
                    userId: newUser.$id,
                    ...extraData
                }
            );

            console.log(`User created: ${newUser}`);
            console.log("✅ Email signup user document created");
            navigate("/");
        } catch (err){
            console.error("Signup error:", err.message, err.code);
        } finally {
            setLoading(false);
        }
    };

    const loginUser = async ({ email, password }) => {
        try { 
            await account.createEmailPasswordSession({ email, password });
            const currentUser = await account.get();
            setUser(currentUser);
            console.log("📧 Email login user:", currentUser);
            navigate("/");
        } catch (error){
            console.error('Login failed:', error.message);
            if (error.code === 401) {
                toast.error(
                    "User not found or invalid credentials. Please sign up first."
                );
            } else {
                toast.error(error.message);
            }
        } finally {
            setLoading(false);
        }
    };

/*     const updateUser = async (userId) => {
        try {  
            if (name) await account.updateName(name);
            if (email) await account.updateEmail(email);
        } catch (error){
            console.error(error);
        } finally {
            setLoading(false);
        }
    }; */

    const logoutUser = async () => {
        try {
            const user = await account.deleteSession("current");
            setUser(null);
            navigate("/sign-in");
            toast.success('User logged out successfully!');
            console.log('Logout user: ', user);
        } catch (error) {
            toast.error("Logout failed:", error.message);
        } finally {
            setLoading(false);
        }
    };

    const contextData = {
        getCurrentUser,
        isAuthReady,
        setIsAuthReady,
        user,
        setUser,
        registerUser,
        loginUser,
        logoutUser,
        loading,
        setLoading,
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}