import { useNavigate } from "react-router-dom";
import profilePic from "../assets/tg-stockach-de-dummy-profile-pic.png";

export function UserComment({ comment }) {
  const navigate = useNavigate();
  return (
    <figcaption className="w-full max-w-2xl blubb rounded-lg p-3 flex mb-3 shadow-lg shadow-black">
      <div>
        <div className="w-[90px] ml-3 mt-2 profile-portrait flex flex-col justify-center items-center">
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
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate(
                `/dashboard/${comment.profileId.userName}/profile/${comment.profileId._id}`
              );
            }}
            className="text-white hover:underline italic font-bold mt-2"
          >
            {comment.profileId.userName}
          </div>
        </div>
      </div>
      <div className="flex flex-col grow ml-6 relative p-2 pl-4 border-l-[1px] border-gray-500 overflow-scroll sm:overflow-hidden">
        <div className="text-black mb-4 bg-slate-100 rounded-lg p-1">{comment.comment}</div>
        <div className="flex flex-col absolute bottom-0 right-[9px]">
          <span className="text-white text-sm ml-2 text-end">
            {new Date(comment.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
          {comment.updatedAt !== comment.createdAt ? (
            <div className="text-white text-sm ml-2 text-end">
              <span className="italic">
                (edited:{" "}
                {new Date(comment.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
                )
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </figcaption>
  );
}
