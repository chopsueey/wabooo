import { useEffect, useState } from "react";
import { Questions } from "./Questions";
import { getFeed } from "../fetchRequests/QuestionRequests";
import GeneralStore from "../store/GeneralContext";
import AOS from "aos";
import "aos/dist/aos.css";
import SortByMenu from "./SortByMenu";

export default function Feed() {
  const { activeTab, sortBy, setSortBy } = GeneralStore();
  const [sortedQuestions, setSortedQuestions] = useState([]);
  const [answersOfUser, setAnswersOfUser] = useState(null);
  const [likesOfUser, setLikesOfUser] = useState(null);
  const [userIsFollowing, setUserIsFollowing] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showMore, setShowMore] = useState(false); // State to track whether to show more questions

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const feed = await getFeed(sortBy);
      setSortedQuestions(feed.found);
      setAnswersOfUser(feed.userAnswers);
      setLikesOfUser(feed.userLikes);
      setUserIsFollowing(feed.userIsFollowing);
      setUserFollowers(feed.userFollowers);
      setIsLoading(false);
    }

    fetchData();
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, [sortBy, activeTab]);

  // Function to toggle showMore state
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Determine the number of questions to display based on showMore state
  const numQuestionsToShow = showMore ? sortedQuestions.length : 5;

  return (
    <div
      data-aos="zoom-in-down"
      data-aos-delay="100"
      className={activeTab === "Feed" ? "row feed" : "hidden"}
    >
      <SortByMenu />

      {isLoading ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : numQuestionsToShow > 0 ? (
        <Questions
          questions={sortedQuestions.slice(0, numQuestionsToShow)}
          answers={answersOfUser}
          likes={likesOfUser}
          isFollowing={userIsFollowing}
          followers={userFollowers}
        />
      ) : (
        <h2 className="text-center font-bold text-white">Nothing found :/</h2>
      )}

      {/* Conditionally render the "Show More/Show Less" button */}
      {sortedQuestions.length > 5 && (
        <div className="flex justify-center mt-4">
          <button
            className="mb-2 ml-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br animate-pulse duration- shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-4 py-2"
            onClick={toggleShowMore}
          >
            {showMore ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
}

// button ideen
// className="bg-transparent hover:border-blue-500 border-2 text-blue-500 font-medium py-3 px-6 rounded-lg transition duration-300"
// className="bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br shadow-lg shadow-gray-900 text-white py-2 px-4 animate-pulse rounded-tr-full rounded-bl-full transform transition-transform hover:-rotate-3";
// className="bg-opacity-25 backdrop-blur-md backdrop-filter hover:backdrop-opacity-50 bg-white text-cyan-500 font-medium py-3 px-6 rounded-lg shadow-lg transition duration-300 animate-pulse";
