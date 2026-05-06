import React from "react";
import { ClipLoader } from "react-spinners";

import './Loader.scss';
import { color } from "framer-motion";

function Loader({ loaderText }) {

return (
        <div className="loader">
            <ClipLoader color="brown" size={50} />
            <p style={{ color: 'brown' }}>{loaderText}</p>
        </div>
    );
}

export default Loader;