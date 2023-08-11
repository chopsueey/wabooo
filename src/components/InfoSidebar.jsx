import { useEffect, useState } from "react";
import { getMostPopularTopics } from "../fetchRequests/TopicRequest.jsx";
import { searchRequest } from "../fetchRequests/SearchRequests.jsx";
import GeneralStore from "../store/GeneralContext.jsx";
import { useNavigate } from "react-router-dom";

export function InfoSidebar() {
  const [infoSidebarClassName, setInfoSidebarClassName] = useState(
    "hidden xl:flex xl:absolute top-0 right-[max(0px,calc(50%-48rem))] flex-col mt-5"
  );

  window.addEventListener("scroll", () => {
    if (window.scrollY >= 175) {
      setInfoSidebarClassName(
        "hidden xl:flex xl:fixed top-[1.4rem] right-[max(0px,calc(50%-48rem))] flex-col pr-[7rem] mt-5"
      );
    } else {
      setInfoSidebarClassName(
        "hidden xl:flex xl:absolute top-0 right-[max(0px,calc(50%-48rem))] flex-col mt-5"
      );
    }
  });

  const navigate = useNavigate();
  const { activeTab, setActiveTab, results, setResults } = GeneralStore();
  const [topics, setTopics] = useState(null);

  async function handleTopicClick(e) {
    const response = await searchRequest(e.target.innerText);
    const responseData = await response.json();
    // console.log(responseData);
    setResults(responseData);
    navigate("/dashboard");
    setActiveTab("Results");
  }

  useEffect(() => {
    (async function request() {
      const response = await getMostPopularTopics();
      const responseData = await response.json();
      console.log(responseData);
      setTopics(responseData.mostPopularTopics);
    })();
  }, []);

  return (
    <div className={infoSidebarClassName}>
      <div className=" bg-gray-500 flex-grow flex flex-col bg-opacity-25 rounded-xl px-5 py-2 shadow-lg shadow-gray-900 mr-10">
        <div className="p-2 text-center text-white font-bold text-xl">
          popular topics
        </div>
        <div className="border-b border-sky-500 mb-2"></div>
        <div className="flex flex-col justify-center max-w-[225px]">
          {topics
            ? topics.map((topic) => (
                <div
                  style={{ fontSize: `${topic[1] + 16}px` }}
                  onClick={handleTopicClick}
                  className="bg-gray-900 text-center rounded-lg m-1 p-3 cursor-pointer font-semibold text-cyan-300  hover:bg-cyan-300 hover:text-gray-900"
                >
                  {topic[0]}
                </div>
              ))
            : ""}
        </div>
      </div>
      {/* <div className="pr-10 mt-2">
        <div className="bg-slate-200 rounded-md flex flex-wrap max-w-[200px]">
          <div className="p-2">popular questions</div>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            question1
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            question2
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            question3
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            question4
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            question5
          </span>
        </div>
      </div>
      <div className="pr-10 mt-2">
        <div className="bg-slate-200 rounded-md flex flex-wrap max-w-[200px]">
          <div className="p-2">popular profiles</div>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            profile 1
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            profile 2
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            profile 3
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            profile 4
          </span>
          <span className="bg-slate-600 rounded-md m-2 text-white">
            profile 5
          </span>
        </div>
      </div> */}
    </div>
  );
}
