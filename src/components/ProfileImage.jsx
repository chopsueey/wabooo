import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import profilePic from "../assets/tg-stockach-de-dummy-profile-pic.png";
import {
  deleteProfileImage,
  patchProfileImage,
} from "../fetchRequests/ProfileRequests";

function ProfileImage({ profileImg }) {
  // cloudinary
  const [image, setImage] = useState(profileImg ? profileImg : null);
  const [imageUrl, setImageUrl] = useState(null);

  const handleUploadButtonClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleImageUpload = async () => {
    const data = { image, imageUrl };
    await patchProfileImage(data);
    toast.info("Image uploaded successfully.", {
      className: "custom-toast",
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0].name);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageUrl(reader.result);
    };
    toast.info("Click on save to upload your profile image.", {
      className: "custom-toast",
    });
  };

  const handleImageDeleteClick = async () => {
    await deleteProfileImage();
    setImage(null);
    setImageUrl(null);
    toast.success("Image deleted.", {
      className: "custom-toast",
    });
  };

  useEffect(() => {

  },[])

  return (
    <>
      <div style={{ position: "relative", display: "inline-block" }}>
        {image ? (
          <img
            src={image ? image : profilePic}
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
            <img
            src={image ? image : profilePic}
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
            }}
          />
          </div>
        )}

        {image && (
          <button
            onClick={handleImageDeleteClick}
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
      <div>
        <button
          style={{ maxWidth: "150px" }}
          className="blubb text-cyan-400 bg-transparent border border-cyan-300 rounded-md p-2 mt-5 shadow-lg hover:bg-cyan-300 hover:text-white transition duration-300 ease-in-out"
          onClick={handleImageUpload}
        >
          save
        </button>
      </div>
    </>
  );
}

export default ProfileImage;
