import React from "react";

const Spinner = () => {
  return (
    <div className="w-100 text-center mt-4">
      <div className="spinner-border text-dark " role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
