import React, { useState } from "react";
import {
  deleteAnswer,
  deleteLike,
  deleteQuestion,
  getQuestion,
  postAnswer,
  postLike,
} from "../fetchRequests/QuestionRequests";
import { useNavigate } from "react-router-dom";
import {
  deleteFollow,
  getFollower,
  postFollow,
} from "../fetchRequests/FollowRequests";
import { searchRequest } from "../fetchRequests/SearchRequests";
import GeneralStore from "../store/GeneralContext";

import profilePic from "../assets/tg-stockach-de-dummy-profile-pic.png";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import { EllipsisHorizontalIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationDialog from "./ConfirmationDialog";

export const Question = ({
  question,
  answer,
  like,
  isFollowing,
  followsUser,
  ownQuestion,
}) => {
  const { setActiveTab, setResults } = GeneralStore();

  const [questionData, setQuestionData] = useState(question);
  const [isAnswered, setIsAnswered] = useState(answer);
  const [isLiked, setIsLiked] = useState(like);
  const [isFollowed, setIsFollowed] = useState(isFollowing);
  const [followsYou, setFollowsYou] = useState(followsUser);
  const [isOwnQuestion, setIsOwnQuestion] = useState(undefined);
  const [numOfFollower, setNumOfFollower] = useState(undefined);
  const [showDetails, setShowDetails] = useState(false);
  const [showMoreInfo, setShowMoreInfo] = useState(false);

  // question delete
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  // calculate percentage of yes or no
  // multiplied by two, because yes and no take half of the place of the div element
  const [yesWidth, setYes] = useState(
    Number(((100 * question.yes) / (question.yes + question.no)).toFixed()) * 2
  );
  const [noWidth, setNo] = useState(
    Number(((100 * question.no) / (question.yes + question.no)).toFixed()) * 2
  );

  const [allAnswers, setAllAnswers] = useState(question.yes + question.no);

  const navigate = useNavigate();

  async function handleAnswerClick(userClick) {
    const userAnswer = userClick;
    const questionId = question._id;
    const data = { questionId, userAnswer };

    await postAnswer(data);
    const updatedData = await getQuestion(question._id);
    setQuestionData(updatedData.found);
    setYes(
      Number(
        (
          (100 * updatedData.found.yes) /
          (updatedData.found.yes + updatedData.found.no)
        ).toFixed()
      ) * 2
    );
    setNo(
      Number(
        (
          (100 * updatedData.found.no) /
          (updatedData.found.yes + updatedData.found.no)
        ).toFixed()
      ) * 2
    );
    setAllAnswers(updatedData.found.yes + updatedData.found.no);
    setIsAnswered(true);
    toast.success("You submitted your answer.", {
      className: "custom-toast",
    });
  }

  async function handleLikeClick(likeOrUnlike) {
    const questionId = question._id;
    // request postLike() or deleteLike()
    if (likeOrUnlike === "like") {
      const response = await postLike({ questionId });
      setIsLiked(true);

      const updatedData = await getQuestion(questionId);
      setQuestionData(updatedData.found);
    } else {
      const response = await deleteLike({ questionId });
      setIsLiked(false);

      const updatedData = await getQuestion(questionId);
      setQuestionData(updatedData.found);
    }
  }

  async function handleDeleteClick() {
    const questionId = question._id;
    const response = await deleteAnswer({ questionId });
    setIsAnswered(false);
    toast.success("You deleted your answer.", {
      className: "custom-toast",
    });
  }

  async function handleFollowClick() {
    const followingProfileId = questionData.profileId._id;
    const data = { followingProfileId };
    await postFollow(data);
    const response = await getFollower(questionData.profileId._id);
    setNumOfFollower(response.profileFollower.length);
    setIsFollowed(true);
    toast.info("You are following.", {
      className: "custom-toast",
    });
  }

  async function handleUnfollowClick() {
    const followingProfileId = questionData.profileId._id;
    const data = { followingProfileId };
    await deleteFollow(data);
    const response = await getFollower(questionData.profileId._id);
    setNumOfFollower(response.profileFollower.length);
    setIsFollowed(false);
    toast.info("You stopped following.", {
      className: "custom-toast",
    });
  }

  const handleMouseEnter = async () => {
    const response = await getFollower(questionData.profileId._id);

    // check if the profile of the question creator
    // is the same as the current user, so that the user
    // can't follow himself
    response.userProfileId._id === questionData.profileId._id
      ? setIsOwnQuestion(true)
      : setIsOwnQuestion(false);
    setNumOfFollower(response.profileFollower.length);

    // if user follows the question creator
    // switch follow/unfollow button
    response.isUserFollowingTheProfile === null
      ? setIsFollowed(false)
      : setIsFollowed(true);
  };

  async function handleTopicClick(e) {
    const response = await searchRequest(e.target.innerText);
    const responseData = await response.json();
    // console.log(responseData);
    setResults(responseData);
    navigate("/dashboard");
    setActiveTab("Results");
  }

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

  function handleDeleteQuestionClick() {
    setIsConfirmationOpen(true);
  }

  const handleCloseConfirmation = () => {
    setIsConfirmationOpen(false);
  };

  async function deleteQuestionConfirmed() {
    setIsConfirmationOpen(false);
    const questionId = question._id;
    const data = { questionId };
    const response = await deleteQuestion(data);
    // const newArray = questionData.filter((question) => question)
    // setQuestionData(...newArray)
    // const responseData = await response.json();
    // console.log(responseData);
    setIsDeleted(true);
    toast.info("Question deleted.", {
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
    <>
      {questionData ? (
        <figure
          style={{ maxWidth: "600px" }}
          className="bg-gradient-to-r relative overflow-hidden from-cyan-400 via-cyan-500 to-cyan-600 text-gray-900 shadow-lg shadow-gray-900 mb-6 rounded-xl mx-auto m-2"
        >
          <div className="flex justify-between p-6 flex-wrap">
            <div
              onMouseEnter={handleMouseEnter}
              className="profile-name flex flex-wrap question-userName relative"
            >
              <figcaption className="blubb rounded-lg p-2 px-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    style={{ maxWidth: "50px", maxHeight: "50px" }}
                    className="flex justify-center overflow-hidden rounded-full cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/dashboard/${questionData.profileId.userName}/profile/${questionData.profileId._id}`,
                        {
                          state: {
                            question,
                            answer,
                            like,
                            isFollowing,
                            followsUser,
                          },
                        }
                      )
                    }
                  >
                    <img
                      style={{
                        maxWidth: "50px",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                      src={
                        questionData.profileId.image
                          ? questionData.profileId.image
                          : profilePic
                      }
                    />
                  </div>
                  <div className="italic ml-2">
                    <h5
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        navigate(
                          `/dashboard/${questionData.profileId.userName}/profile/${questionData.profileId._id}`,
                          {
                            state: {
                              question,
                              answer,
                              like,
                              isFollowing,
                              followsUser,
                            },
                          }
                        );
                      }}
                      className="text-white font-bold hover:underline"
                    >
                      {questionData.profileId.userName}
                    </h5>
                  </div>
                </div>
              </figcaption>

              <div
                style={{ width: "115px", maxHeight: "100px" }}
                className="popup-profile-info blubb absolute -bottom-[5rem] rounded-lg p-2 text-sm text-center flex flex-col"
              >
                <div className="text-white">{numOfFollower} Follower</div>
                {followsYou ? (
                  <div className="text-xs">
                    <h1 className="text-cyan-200">(Follows you)</h1>
                  </div>
                ) : (
                  ""
                )}
                {isOwnQuestion ? (
                  <div className="text-cyan-200">This is your profile.</div>
                ) : (
                  <div className="mt-4">
                    {!isFollowed ? (
                      <button
                        className="text-green-400"
                        onClick={handleFollowClick}
                      >
                        Follow
                      </button>
                    ) : (
                      <button
                        className="text-red-400"
                        onClick={handleUnfollowClick}
                      >
                        Unfollow
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div
              onMouseLeave={() => setShowMoreInfo(false)}
              className="question-info flex items-start cursor-pointer"
            >
              <EllipsisHorizontalIcon
                onClick={handleShowMoreInfo}
                className="h-10 w-10 text-white relative -top-3"
              />
              {showMoreInfo ? (
                <div className="blubb absolute right-16 rounded-lg p-2 text-sm text-center flex flex-col">
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(
                        `/dashboard/question/${questionData.profileId.userName}/${questionData._id}`,
                        {
                          state: {
                            question,
                            answer,
                            like,
                            isFollowing,
                            followsUser,
                          },
                        }
                      )
                    }
                    className="text-white font-bold hover:underline cursor-pointer"
                  >
                    details
                  </span>
                  {/* ownQuestion variable only on own profile for deleting own questions */}
                  {ownQuestion ? (
                    <>
                      <div
                        onClick={handleDeleteQuestionClick}
                        className="text-red-800 font-bold hover:underline cursor-pointer"
                      >
                        delete question
                      </div>
                      <ConfirmationDialog
                        isOpen={isConfirmationOpen}
                        onRequestClose={handleCloseConfirmation}
                        onConfirm={deleteQuestionConfirmed}
                      />
                    </>
                  ) : (
                    ""
                  )}
                  {isAnswered ? (
                    <>
                      <span
                        onClick={handleDeleteClick}
                        className="text-red-800 font-bold hover:underline cursor-pointer"
                      >
                        delete answer
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>

          <figcaption className="p-6">
            <h1
              style={{ cursor: "pointer" }}
              onClick={() =>
                navigate(
                  `/dashboard/question/${questionData.profileId.userName}/${questionData._id}`,
                  {
                    state: { question, answer, like, isFollowing, followsUser },
                  }
                )
              }
              className="text-center text-2xl"
            >
              {questionData.question}
            </h1>
          </figcaption>

          <div className="flex justify-between text-xs textc text-end px-6 pb-6">
            <div className="text-start">
              <div
                onClick={handleDetailsClick}
                className="flex items-center hover:underline text-gray-600 font-bold cursor-pointer"
              >
                {showDetails ? (
                  <>
                    <span>Topics</span>
                    <MinusIcon className="w-4 h-4 mr-1" />
                  </>
                ) : (
                  <>
                    <span>Topics</span>
                    <PlusIcon className="w-4 h-4 mr-1" />
                  </>
                )}
              </div>
              {showDetails && (
                <div className="blubb opacity-70 rounded-lg p-2 px-2 mt-3">
                  {questionData &&
                  questionData.topics &&
                  questionData.topics.length > 0 ? (
                    questionData.topics.map((item) => (
                      <div
                        key={item}
                        onClick={(e) => handleTopicClick(e)}
                        className="hover:underline mr-1 text-white font-bold cursor-pointer"
                      >
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="text-white">No topics available</div>
                  )}
                </div>
              )}
            </div>
            {isAnswered ? (
              <div className="flex flex-col">
                {!isLiked ? (
                  <button
                    className="text-end text-white  text-sm hover:animate-pulse"
                    onClick={() => handleLikeClick("like")}
                  >
                    {questionData.likes + " 🤍"}
                  </button>
                ) : (
                  <button
                    className="text-end text-white text-sm hover:animate-pulse"
                    onClick={() => handleLikeClick("unlike")}
                  >
                    {questionData.likes + " ❤️"}
                  </button>
                )}
                <div className="blubb rounded-lg p-2 px-2 mt-2">
                  <div className="italic text-white">
                    {allAnswers > 1
                      ? `${allAnswers} answers`
                      : `${allAnswers} answer`}
                  </div>
                  <span className="text-white">
                    {new Date(questionData.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      }
                    )}
                  </span>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {!isAnswered ? (
            <div className="flex text-white text-lg p-5 justify-center">
              <button
                style={{ width: "20%" }}
                className="mb-1 ml-2 text-white blubb opacity-70 hover:bg-gradient-to-br shadow-lg shadow-gray-800 font-medium rounded-lg text-sm px-2 py-1"
                onClick={() => handleAnswerClick("yes")}
              >
                Yes
              </button>
              <div className="ml-6"></div>
              <button
                style={{ width: "20%" }}
                className="mb-1 ml-2 text-white blubb opacity-70 hover:bg-gradient-to-br shadow-lg shadow-gray-800 font-medium rounded-lg text-sm px-2 py-1"
                onClick={() => handleAnswerClick("no")}
              >
                No
              </button>
            </div>
          ) : (
            <div className="flex text-black text-lg text-center">
              <div
                style={{ width: `${yesWidth}%` }}
                className="bg-gradient-to-r from-gray-900 to-gray-700 text-green-400 font-bold "
              >
                {yesWidth / 2 + "%"}
              </div>

              <div
                style={{ width: `${noWidth}%` }}
                className="bg-gradient-to-r from-gray-700  to-gray-900 text-red-500 font-bold"
              >
                {noWidth === 0 ? "" : noWidth / 2 + "%"}
              </div>
            </div>
          )}
        </figure>
      ) : (
        ""
      )}
    </>
  );
};
