import React, { useRef } from "react";

const ImageUpload = (props) => {
  const fileInputRef = useRef();

  const handleImageUpload = (e) => {
    props.handleImageUpload(e.target.files[0]);
  };

  const hadnleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="btn bg-dark text-light h-100" onClick={hadnleUploadClick}>
      Incarca imagine
      <input
        type="file"
        id="image"
        style={{ display: "none" }}
        ref={fileInputRef}
        accept=".jpg,.png,.jpeg"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default ImageUpload;
