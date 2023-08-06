import { useState } from "react";
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
  return (
    <div>
      {questions
        ? questions.map((item) => {
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
    </div>
  );
};
