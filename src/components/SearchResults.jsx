import { Questions } from "./Questions";
import GeneralStore from "../store/GeneralContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function SearchResults() {
  const { activeTab, results, isLoading } = GeneralStore();
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      mirror: false,
    });
  });
  return (
    <div
      data-aos="zoom-in-down"
      data-aos-delay="100"
      className={`bg-gray-500 bg-opacity-25 rounded-xl grow-0 px-4 sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950 pt-5 pb-5 ${
        activeTab === "Results" ? "row search-results" : "hidden"
      }`}
    >
      <h1 className="flex justify-center blubb shadow-lg shadow-gray-950 mb-5 rounded-lg">
        Question related
      </h1>
      {isLoading ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : results.found && results.found.length > 0 ? (
        <Questions
          questions={results.found}
          answers={results.userAnswers}
          likes={results.userLikes}
          isFollowing={results.userIsFollowing}
          followers={results.userFollowers}
        />
      ) : (
        <h2 className="text-center font-bold items-center pt-5 pb-5 text-cyan-300">
          Nothing found 👀
        </h2>
      )}
      <h1 className="flex justify-center blubb shadow-lg shadow-gray-950 rounded-lg mb-5">
        Topic related
      </h1>
      {isLoading ? (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
        </div>
      ) : results.topicRelated && results.topicRelated.length > 0 ? (
        <Questions
          questions={results.topicRelated}
          answers={results.userAnswers}
          likes={results.userLikes}
          isFollowing={results.userIsFollowing}
          followers={results.userFollowers}
        />
      ) : (
        <h2 className="text-center font-bold items-center pt-5 text-cyan-300 pb-5">
          Nothing found 👀
        </h2>
      )}
    </div>
  );
}
