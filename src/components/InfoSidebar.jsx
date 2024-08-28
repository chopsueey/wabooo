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
    setResults(responseData);
    navigate("/dashboard");
    setActiveTab("Results");
  }

  useEffect(() => {
    (async function request() {
      const response = await getMostPopularTopics();
      const responseData = await response.json();
      setTopics(responseData.mostPopularTopics);
    })();
  }, []);

  return (
    <div className={infoSidebarClassName}>
      <div className=" bg-gray-500 flex-grow flex flex-col bg-opacity-25 rounded-xl px-5 py-2 shadow-lg shadow-gray-900 mr-10">
        <div className="p-2 text-center text-white font-bold text-xl">
          Popular topics
        </div>
        <div className="border-b border-sky-500 mb-2"></div>
        <div className="flex flex-col justify-center max-w-[225px]">
          {topics
            ? topics.map((topic) => (
                <div
                  key={topic[0]}
                  style={{ fontSize: `${topic[1] + 16}px` }}
                  onClick={handleTopicClick}
                  className="transition ease-in-out duration-300 bg-gray-900 text-center rounded-lg m-1 p-3 cursor-pointer font-semibold text-cyan-300  hover:bg-cyan-300 hover:text-gray-900"
                >
                  {topic[0]}
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}
