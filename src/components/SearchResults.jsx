import { useState, useEffect } from "react";
import { Questions } from "./Questions";
import GeneralStore from "../store/GeneralContext";
import AOS from "aos";
import "aos/dist/aos.css";

export default function SearchResults() {
  const { activeTab, results, isLoading } = GeneralStore();

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  }, []);

  const [numQuestionsToShow, setNumQuestionsToShow] = useState(5);

  const handleLoadMore = () => {
    setNumQuestionsToShow((num) => num + 5);
  };

  return (
    <div
      data-aos="zoom-in-down"
      data-aos-delay="100"
      className={`${activeTab === "Results" ? "row search-results" : "hidden"}`}
    >
      <div className="flex justify-center">
        <h1 className="blubb w-fit shadow-lg shadow-gray-950 mb-5 p-3 rounded-full">
          Question related:
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : results.found && results.found.length > 0 ? (
        <Questions
          questions={results.found.slice(0, numQuestionsToShow)}
          answers={results.userAnswers}
          likes={results.userLikes}
          isFollowing={results.userIsFollowing}
          followers={results.userFollowers}
        />
      ) : (
        <h2 className="text-center font-bold items-center pt-5 pb-8 text-cyan-300">
          Nothing found 👀
        </h2>
      )}

      {results.found?.length > numQuestionsToShow && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="mb-2 ml-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br animate-pulse duration- shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-4 py-2"
          >
            Show More
          </button>
        </div>
      )}

      <div className="flex justify-center">
        <h1 className="blubb w-fit shadow-lg shadow-gray-950 mb-5 p-3 rounded-full">
          Topic related:
        </h1>
      </div>

      {isLoading ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : results.topicRelated && results.topicRelated.length > 0 ? (
        <Questions
          questions={results.topicRelated.slice(0, numQuestionsToShow)}
          answers={results.userAnswers}
          likes={results.userLikes}
          isFollowing={results.userIsFollowing}
          followers={results.userFollowers}
        />
      ) : (
        <h2 className="text-center font-bold items-center pt-5 pb-8 text-cyan-300">
          Nothing found 👀
        </h2>
      )}

      {results.topicRelated?.length > numQuestionsToShow && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleLoadMore}
            className="mb-2 ml-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br animate-pulse duration- shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-4 py-2"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
