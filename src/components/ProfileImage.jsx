import React, { useState } from "react";

function ProfileImage() {
  const [image, setImage] = useState(null);

  const handleUploadButtonClick = () => {
    // Open file input when the button is clicked
    document.getElementById("imageInput").click();
  };

  const handleImageChange = (e) => {
    // Handle the image upload
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    // Handle the delete action
    setImage(null);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      {image ? (
        <img
          src={image}
          alt="Profile"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
          }}
        />
      ) : (
        <div
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            backgroundColor: "#f0f0f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={handleUploadButtonClick}
        >
          <span>Upload Image</span>
        </div>
      )}

      {image && (
        <button
          onClick={handleDeleteImage}
          style={{
            position: "absolute",
            bottom: "5px",
            right: "5px",
            backgroundColor: "red",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          X
        </button>
      )}

      <input
        type="file"
        id="imageInput"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleImageChange}
      />
    </div>
  );
}

export default ProfileImage;