import { useNavigate } from "react-router-dom";
import profilePic from "../assets/tg-stockach-de-dummy-profile-pic.png";

export function UserComment({ comment }) {
  const navigate = useNavigate();
  return (
    <figcaption className="w-full max-w-2xl blubb rounded-lg p-3 flex overflow-scroll mb-3 shadow-lg shadow-black">
      <div>
        <div className="ml-3 profile-portrait flex flex-col justify-center items-center">
          {/* <div
            className="flex-shrink-0 rounded-full cursor-pointer"
            style={{
              backgroundImage: `url(${
                comment.profileId.image ? comment.profileId.image : profilePic
              })`,
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              width: "100%",
              height: "100%",
              aspectRatio: "1/1",
            }}
            onClick={() => {
              navigate(
                `/dashboard/${comment.profileId.userName}/profile/${comment.profileId._id}`
              );
            }}
          ></div> */}
          <div
            style={{ maxWidth: "50px", maxHeight: "50px" }}
            className="flex justify-center overflow-hidden rounded-full cursor-pointer"
            onClick={() => {
              navigate(
                `/dashboard/${comment.profileId.userName}/profile/${comment.profileId._id}`
              );
            }}
          >
            <img
              style={{
                maxWidth: "50px",
                aspectRatio: "1/1",
                objectFit: "cover",
              }}
              src={
                comment.profileId.image ? comment.profileId.image : profilePic
              }
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col grow ml-6">
        <div className="flex mb-2 justify-between items-center">
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(
                `/dashboard/${comment.profileId.userName}/profile/${comment.profileId._id}`
              );
            }}
            className="text-white hover:underline italic font-bold"
          >
            {comment.profileId.userName + ":"}
          </div>
          <span className="text-white text-sm ml-2">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <div className="text-white">{comment.comment}</div>
      </div>
    </figcaption>
  );
}
