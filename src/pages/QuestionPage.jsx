import { useEffect, useState } from "react";
import { Questions } from "../components/Questions";
import { updateQuestion } from "../fetchRequests/QuestionRequests";
import GeneralStore from "../store/GeneralContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
import { QuestionChart } from "../chartjs/QuestionChart.jsx";

export function QuestionPage() {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState("Statistics");

  const [sortedQuestions, setSortedQuestions] = useState(null);
  const [answersOfUser, setAnswersOfUser] = useState(null);
  const [likesOfUser, setLikesOfUser] = useState(null);
  const [userIsFollowing, setUserIsFollowing] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);

  const { isLoading, setIsLoading } = GeneralStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    (async function request() {
      setIsLoading(true);
      const feed = await updateQuestion(state.question._id);
      console.log(feed);
      setSortedQuestions([feed.found]);
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
  }, []);

  return (
    <div className="max-w-2xl sm:mx-auto lg:max-w-5xl xl:max-w-screen-2xl sm:px-6 lg:px-8">
      <div className="row min-h-screen bg-gray-500 bg-opacity-25 rounded-xl flex flex-col justify-evenly sm:px-6 lg:px-8 xl:px-20 relative shadow-lg shadow-gray-950">
        <section
          className="question m-5"
          data-aos="zoom-in-down"
          data-aos-delay="100"
        >
          {isLoading ? (
            <div className="flex justify-center mt-4">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-sky-500"></div>
            </div>
          ) : sortedQuestions && sortedQuestions.length > 0 ? (
            <Questions
              questions={sortedQuestions}
              answers={answersOfUser}
              likes={likesOfUser}
              isFollowing={userIsFollowing}
              followers={userFollowers}
            />
          ) : (
            <h2 className="text-center">Nothing found :/</h2>
          )}
        </section>
        <section className="details flex flex-col m-5 mb-10">
          <div className="tab-menu mx-5 my-10">
            <div style={{ maxWidth: "200px" }} className="flex">
              <div
                className={
                  (activeTab === "Statistics"
                    ? "active text-cyan-700 rounded-lg"
                    : "text-cyan-300 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg") +
                  " p-2  text-xl"
                }
                onClick={() => handleTabClick("Statistics")}
                style={{ cursor: "pointer" }}
              >
                statistics
              </div>
              <div
                style={{ cursor: "pointer" }}
                className={
                  (activeTab === "Comments"
                    ? "active text-cyan-700 rounded-lg"
                    : "text-cyan-300 hover:bg-gray-400 hover:bg-opacity-25 hover:rounded-lg") +
                  " p-2 text-xl"
                }
                onClick={() => handleTabClick("Comments")}
              >
                comments
              </div>
            </div>
          </div>
          {activeTab === "Statistics" ? (
            <div className="flex flex-wrap justify-around">
              <QuestionChart type="bar" />
              <QuestionChart type="doughnut" />
              <QuestionChart type="line" />
            </div>
          ) : (
            ""
          )}
          {activeTab === "Comments" ? (
            <div className="flex justify-around">
              <textarea className="rounded-xl" name="" id="" cols="50" rows="4"></textarea>
            </div>
          ) : (
            ""
          )}
        </section>
      </div>
    </div>
  );
}
