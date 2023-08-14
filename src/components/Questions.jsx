import React, { useState } from "react";
import { Question } from "./Question";

export const Questions = ({
  questions,
  answers,
  likes,
  isFollowing,
  followers,
  ownQuestion,
}) => {
  const answeredQuestions = answers.map((id) => id.question);
  const likedQuestions = likes.map((id) => id.question);
  const isFollowingIds = isFollowing.map((follow) => follow.followingProfileId);
  const followsUserIds = followers.map((follow) => follow.followerProfileId);

  const [numQuestionsToShow, setNumQuestionsToShow] = useState(5);

  const handleLoadMore = () => {
    if (questions.length > numQuestionsToShow) {
      setNumQuestionsToShow(numQuestionsToShow + 5);
    }
  };

  return (
    <div>
      {questions
        ? questions.slice(0, numQuestionsToShow).map((item) => {
            let userAnswer = false;
            let userLike = false;
            let userIsFollowing = false;
            let followsUser = false;
            for (let i = 0; i < answeredQuestions.length; i++) {
              if (answeredQuestions[i] === item._id) {
                userAnswer = true;
                break;
              }
            }
            for (let i = 0; i < likedQuestions.length; i++) {
              if (likedQuestions[i] === item._id) {
                userLike = true;
                break;
              }
            }
            for (let i = 0; i < isFollowingIds.length; i++) {
              if (isFollowingIds[i] === item.profileId._id) {
                userIsFollowing = true;
                break;
              }
            }
            for (let i = 0; i < followsUserIds.length; i++) {
              if (followsUserIds[i] === item.profileId._id) {
                followsUser = true;
                break;
              }
            }
            return (
              <Question
                key={item._id}
                question={item}
                answer={userAnswer}
                like={userLike}
                isFollowing={userIsFollowing}
                followsUser={followsUser}
                ownQuestion={ownQuestion}
              />
            );
          })
        : ""}

      {questions.length > numQuestionsToShow && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="mb-2 ml-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br animate-pulse duration- shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-4 py-2"
          >
            show more
          </button>
        </div>
      )}
    </div>
  );
};
