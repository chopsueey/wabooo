import { useEffect, useState } from "react";
import { Questions } from "./Questions";
import { getFeed } from "../fetchRequests/QuestionRequests";
import GeneralStore from "../store/GeneralContext";
import AOS from "aos";
import "aos/dist/aos.css";
import SortByMenu from "./SortByMenu";

export default function Recommended() {
  const { activeTab, sortBy } = GeneralStore();
  const [sortedQuestions, setSortedQuestions] = useState(null);
  const [answersOfUser, setAnswersOfUser] = useState(null);
  const [likesOfUser, setLikesOfUser] = useState(null);
  const [userIsFollowing, setUserIsFollowing] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);
  const [numQuestionsToShow, setNumQuestionsToShow] = useState(5);
  const { isLoading, setIsLoading } = GeneralStore();

  useEffect(() => {
    (async function request() {
      setIsLoading(true);
      const feed = await getFeed(sortBy);
      setSortedQuestions(feed.found);
      setAnswersOfUser(feed.userAnswers);
      setLikesOfUser(feed.userLikes);
      setUserIsFollowing(feed.userIsFollowing);
      setUserFollowers(feed.userFollowers);
      setIsLoading(false);
    })();
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, [sortBy, activeTab]);

  const handleLoadMore = () => {
    if (sortedQuestions.length > numQuestionsToShow) {
      setNumQuestionsToShow(numQuestionsToShow + 5);
    }
  };

  return (
    <div
      data-aos="zoom-in-down"
      data-aos-delay="100"
      className={activeTab === "Recommended" ? "row recommended" : "hidden"}
    >
      <SortByMenu />

      {isLoading ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : sortedQuestions && sortedQuestions.length > 0 ? (
        <>
          <Questions
            questions={sortedQuestions.slice(0, numQuestionsToShow)}
            answers={answersOfUser}
            likes={likesOfUser}
            isFollowing={userIsFollowing}
            followers={userFollowers}
          />

          {numQuestionsToShow < sortedQuestions.length && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleLoadMore}
                className="mb-2 ml-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br animate-pulse duration- shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-4 py-2"
              >
                show more
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center mt-20">
          <h2 className="text-center font-bold items-center text-cyan-300 blubb1 shadow-lg shadow-gray-950 rounded-full w-full max-w-md p-4">
            Nothing found 👀
          </h2>
        </div>
      )}
    </div>
  );
}
