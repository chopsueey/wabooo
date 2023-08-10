import { useEffect, useState } from "react";
import { Questions } from "../components/Questions";
import {
  getComment,
  getQuestionData,
  postComment,
  updateQuestion,
} from "../fetchRequests/QuestionRequests";
import GeneralStore from "../store/GeneralContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { useLocation, useNavigate } from "react-router-dom";
import { QuestionChart } from "../chartjs/QuestionChart.jsx";
import { UserComment } from "../components/UserComment";
import { ArrowLongLeftIcon } from "@heroicons/react/24/solid"; // Import des Back-Icons

import QuestionMobileUserPanel from "../components/QuestionMobileUserPanel.jsx";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function QuestionPage() {
  const { state } = useLocation();
  const [activeTab, setActiveTab] = useState("Statistics");
  const navigate = useNavigate();

  const [sortedQuestions, setSortedQuestions] = useState(null);
  const [answersOfUser, setAnswersOfUser] = useState(null);
  const [likesOfUser, setLikesOfUser] = useState(null);
  const [userIsFollowing, setUserIsFollowing] = useState(null);
  const [userFollowers, setUserFollowers] = useState(null);

  const { isLoading, setIsLoading } = GeneralStore();

  // usercomment for post request
  const [userComment, setUserComment] = useState(null);

  // all commments of the question from the server
  const [allComments, setAllComments] = useState(null);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  async function handlePostComment() {
    const questionId = state.question._id;
    const data = { questionId, userComment };
    await postComment(data);
    setUserComment("");
    const response = await getComment(state.question._id);
    const responseData = await response.json();
    setAllComments(responseData);
    toast.info("You posted a comment.", {
      className: "custom-toast",
    });
  }

  useEffect(() => {
    (async function request() {
      setIsLoading(true);
      // questions and data of the current user
      const feed = await updateQuestion(state.question._id);
      console.log(feed);
      setSortedQuestions([feed.found]);
      setAnswersOfUser(feed.userAnswers);
      setLikesOfUser(feed.userLikes);
      setUserIsFollowing(feed.userIsFollowing);
      setUserFollowers(feed.userFollowers);
      // comments
      const comments = await getComment(state.question._id);
      setAllComments(await comments.json());
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
        <div className="mb-5 mt-5 ml-3">
          <button
            style={{ cursor: "pointer" }}
            className="blubb mb-3 flex items-center space-x-2 hover:animate-pulse text-cyan-300 font-bold py-2 px-4 rounded-lg"
            onClick={() => navigate(`/dashboard/`)}
          >
            <ArrowLongLeftIcon className="h-5 w-5 text-cyan-300" />{" "}
            <span>dashboard</span>
          </button>
        </div>

        <section
          className="question m-2"
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
            <h2 className="text-center">Nothing found 👀</h2>
          )}
        </section>
        <section className="details flex flex-col m-2 mb-10">


          <div className="tab-menu hidden sm:block mx-5 my-10">

            <div className="flex">
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
                <span className="pl-2 pr-2 mr-1 w-8 h-8 rounded-lg bg-cyan-800 text-cyan-300">
                  {allComments ? allComments.length : ""}
                </span>
                comments
              </div>
            </div>
          </div>
          {activeTab === "Statistics" ? (
            <div className="flex flex-wrap justify-around">
              <QuestionChart type="bar" questionId={state.question._id} />
              <QuestionChart type="doughnut" questionId={state.question._id} />
              {/* <QuestionChart type="line" /> */}
            </div>
          ) : (
            ""
          )}
          {activeTab === "Comments" ? (
            <div className="flex flex-col items-center">
              {allComments
                ? allComments.map((comment) => (
                    <UserComment comment={comment} />
                  ))
                : ""}

              <div className="flex flex-col h-1/2 w-full max-w-2xl mt-2">
                <textarea
                  onChange={(e) => setUserComment(e.target.value)}
                  className="rounded-xl p-2 shadow-lg shadow-gray-950 bg-slate-700 bg-transparent text-white w-full border-2 border-cyan-400 font-bold placeholder-cyan-500 focus:border-cyan-400 focus:outline-none"
                  name=""
                  id=""
                  value={userComment}
                  placeholder="Write a comment..."
                ></textarea>
                <div className="text-end">
                  <button
                    onClick={handlePostComment}
                    className="mt-2 text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br shadow-lg shadow-gray-900 font-medium rounded-lg text-sm px-5 py-1"
                  >
                    post
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </section>

        <QuestionMobileUserPanel activeTab2={activeTab} setActiveTab2={setActiveTab}/>

      </div>
    </div>
  );
}
