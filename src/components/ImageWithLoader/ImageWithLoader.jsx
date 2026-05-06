import React, { useEffect, useState } from "react";
import Loader from "../Loading/Loader/Loader";

// A reusable ImageWithLoader component
function ImageWithLoader({ src, alt, width, height, loading, setLoading }) {

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <>
        <div>
            {!loading ? (
                <>
                    <Loader loaderText='Loading image...' />
                </>
            ) : (
                <img
                    src={src}
                    alt={alt}
                    width={width}
                    height={height}
                    style={{
                        display: loading ? "block" : "none",
                        objectFit: "cover",
                    }}
                    onChange={handleLoad}
                />
            )}
        </div>
    </>
  );
}

export default ImageWithLoader