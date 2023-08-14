import { useNavigate } from "react-router-dom";
import profilePic from "../assets/tg-stockach-de-dummy-profile-pic.png";
import { EllipsisVerticalIcon } from "@heroicons/react/24/solid";
import ConfirmationDialog from "./ConfirmationDialog";
import Modal from "react-modal";
import { useState } from "react";
import { deleteComment, patchComment } from "../fetchRequests/QuestionRequests";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GeneralStore from "../store/GeneralContext";

export function UserComment({ comment }) {
  const navigate = useNavigate();
  const { isEdited, setIsEdited } = GeneralStore();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editedComment, setEditedComment] = useState("");

  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // component returns null if true
  const [isDeleted, setIsDeleted] = useState(false);

  // edit comment
  function handleEditCommentClick() {
    setIsEditOpen(true);
  }

  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };

  async function editCommentConfirmed() {
    setIsEditOpen(false);
    const questionId = comment.questionId;
    const commentId = comment._id;
    const updatedComment = editedComment;
    const data = { questionId, commentId, updatedComment };
    const response = await patchComment(data);
    setIsEdited(!isEdited);
    toast.success("Comment edited.", {
      className: "custom-toast",
    });
  }

  // delete comment
  function handleDeleteCommentClick() {
    setIsConfirmationOpen(true);
  }

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  async function deleteCommentConfirmed() {
    setIsConfirmationOpen(false);
    const questionId = comment.questionId;
    const commentId = comment._id;
    const data = { questionId, commentId };
    const response = await deleteComment(data);
    setIsDeleted(true);
    toast.success("Comment deleted.", {
      className: "custom-toast",
    });
  }

  function handleShowMoreInfo() {
    setShowMoreInfo(!showMoreInfo);
  }

  if (isDeleted) {
    return null;
  }

  return (
    <figcaption className="w-full max-w-2xl blubb rounded-lg p-3 px-0 flex mb-3 shadow-lg shadow-black">
      <div className="flex flex-col sm:flex-row w-full">
        <div className="flex justify-center">
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
              className="text-white text-center hover:underline italic font-bold mt-2"
            >
              {comment.profileId.userName}
            </div>
          </div>
        </div>
        <div className="flex flex-col grow w-full ml-4 mt-4 sm:mt-0 p-2 sm:pl-4 relative border-t-[1px] sm:border-l-[1px] sm:border-t-0 border-gray-500 overflow-scroll sm:overflow-hidden">
          <div className="text-white mb-4">{comment.comment}</div>
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
      </div>
      {comment.isOwnComment ? (
        <div className="w-fit">
          <EllipsisVerticalIcon
            onClick={handleShowMoreInfo}
            className="h-6 w-6 text-white rounded-full hover:bg-cyan-700 hover:bg-opacity-50 relative -top-[6px] mr-2 cursor-pointer"
          />
          <div
            onMouseLeave={() => setShowMoreInfo(false)}
            className="question-info flex items-start cursor-pointer relative"
          >
            {showMoreInfo ? (
              <div className="blubb absolute bottom-8 right-0 border-[1px] border-gray-200 rounded-lg p-2 text-sm text-center flex flex-col">
                {/* edit dialog */}
                <span
                  onClick={handleEditCommentClick}
                  style={{ cursor: "pointer" }}
                  className="text-white font-bold hover:underline cursor-pointer"
                >
                  edit
                </span>
                <Modal
                  className="fixed inset-0 flex items-center justify-center"
                  overlayClassName="fixed inset-0 bg-black bg-opacity-50"
                  isOpen={isEditOpen}
                  onRequestClose={handleCloseEdit}
                  contentLabel="Delete Confirmation"
                >
                  <div className="blubb rounded-lg p-6 w-full max-w-md flex flex-col text-center">
                    <h2 className="text-lg text-cyan-300 font-semibold mb-4">
                      Type your changes here.
                    </h2>
                    <textarea
                      className="bg-gray-700 text-white p-2 rounded-lg"
                      onChange={(e) => setEditedComment(e.target.value)}
                      name="edit-comment"
                      id=""
                      cols="30"
                      rows="5"
                    >
                      {comment.comment}
                    </textarea>
                    <div>
                      <button
                        className="px-4 py-2 mt-5 bg-gray-900 border border-green-400 text-green-400 rounded hover:bg-gradient-to-br mr-2 w-fit"
                        onClick={editCommentConfirmed}
                      >
                        Yes
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-900 border border-cyan-300 text-cyan-300 rounded hover:bg-gradient-to-br w-fit"
                        onClick={handleCloseEdit}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </Modal>

                {/* delete dialog */}
                <span
                  onClick={handleDeleteCommentClick}
                  style={{ cursor: "pointer" }}
                  className="text-white font-bold hover:underline cursor-pointer"
                >
                  delete
                </span>
                <ConfirmationDialog
                  isOpen={isConfirmationOpen}
                  onRequestClose={handleCloseConfirmation}
                  onConfirm={deleteCommentConfirmed}
                />
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        <div className="w-[32px]"></div>
      )}
    </figcaption>
  );
}
