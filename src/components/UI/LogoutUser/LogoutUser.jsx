import React, { useState } from "react";
import { useAuth } from "../../../appwrite/context/AuthContext";

import './LogoutUser.scss';

const LogoutUser = () => {
  const { loading, logoutUser } = useAuth();

  return (
    <>
      <button
        onClick={logoutUser}
        disabled={loading}
        className="btn-logout-user"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </>
  );
};

export default LogoutUser;