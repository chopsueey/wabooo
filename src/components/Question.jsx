import React, { useState } from "react";
import { PlusIcon, MinusIcon } from "@heroicons/react/24/solid";
import {
  deleteAnswer,
  deleteLike,
  getQuestion,
  postAnswer,
  postLike,
} from "../fetchRequests/QuestionRequests";
import { useNavigate } from "react-router-dom";
import profilePic from "../assets/tg-stockach-de-dummy-profile-pic.png";
import {
  deleteFollow,
  getFollower,
  postFollow,
} from "../fetchRequests/FollowRequests";
import { searchRequest } from "../fetchRequests/SearchRequests";
import GeneralStore from "../store/GeneralContext";

export const Question = ({
  question,
  answer,
  like,
  isFollowing,
  followsUser,
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
    const responseData = await response.json();
    setIsAnswered(false);
  }

  async function handleFollowClick() {
    const followingProfileId = questionData.profileId._id;
    const data = { followingProfileId };
    await postFollow(data);
    const response = await getFollower(questionData.profileId._id);
    setNumOfFollower(response.profileFollower.length);
    setIsFollowed(true);
  }

  async function handleUnfollowClick() {
    const followingProfileId = questionData.profileId._id;
    const data = { followingProfileId };
    await deleteFollow(data);
    const response = await getFollower(questionData.profileId._id);
    setNumOfFollower(response.profileFollower.length);
    setIsFollowed(false);
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
    console.log(responseData);
    setResults(responseData);
    navigate("/dashboard");
    setActiveTab("Results");
  }

  const handleDetailsClick = () => {
    setShowDetails(!showDetails);
  };

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
              <div
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
              ></div>
              <figcaption className="blubb rounded-lg p-2 px-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div style={{ width: "40px", height: "40px" }}>
                    <div
                      className="flex-shrink-0 rounded-full cursor-pointer"
                      style={{
                        backgroundImage: `url(${
                          questionData.profileId.image
                            ? questionData.profileId.image
                            : profilePic
                        })`,
                        backgroundSize: "100% 100%",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "100%",
                        aspectRatio: "1/1",
                      }}
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
                    ></div>
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
                      className="text-white hover:underline"
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
            {!isLiked ? (
              <button
                className="absolute top-5 right-5 hover:animate-pulse"
                onClick={() => handleLikeClick("like")}
              >
                {questionData.likes + " 🤍"}
              </button>
            ) : (
              <button
                className="absolute top-5 right-5 hover:animate-pulse"
                onClick={() => handleLikeClick("unlike")}
              >
                {questionData.likes + " ❤️"}
              </button>
            )}
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

            <div>
              <span className="text-white">
                {new Date(questionData.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              {isAnswered ? (
                <>
                  <div className="italic text-white">Answers: {allAnswers}</div>
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={handleDeleteClick}
                    className="italic text-red-900 font-bold hover:underline text-end"
                  >
                    delete Answer
                  </span>
                </>
              ) : (
                ""
              )}
            </div>
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
                className="bg-gradient-to-r from-gray-900 to-gray-700  text-green-400 font-bold "
              >
                {yesWidth / 2 + "%"}
              </div>

              <div
                style={{ width: `${noWidth}%` }}
                className="bg-gradient-to-r from-gray-700  to-gray-900   text-red-500 font-bold"
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
