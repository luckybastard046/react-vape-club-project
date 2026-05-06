import React from 'react';

import './ErrorMessage.scss';

const ErrorMessage = ({ errorText, errorType }) => {
  const errorColors = {
    warning: "#cc0000", // orange
    alert: "#f54c2a", // red
    info: "#1E90FF", // blue
  };

  const errorColor = errorColors[errorType] || "#cc0000";

  return (
    <div className="error" style={{ 
        color: errorColors[errorType] 
      }}
    >
      {errorText}
    </div>
  );
};

export default ErrorMessage;
